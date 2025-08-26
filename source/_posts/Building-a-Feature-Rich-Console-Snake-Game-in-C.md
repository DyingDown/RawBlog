---
title: Building a Feature-Rich Console Snake Game in C#
date: 2025-08-23 12:24:03
tags: [Snake Game, Console Application]
categories: C#
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202508231454640.png
description:
warning: false
isCarousel: false
---

What started as a small classroom exercise—just moving a single player around the console to eat food—quickly grew into something bigger. The more I coded, the more fun it became, and before I knew it, I had expanded the idea into a full Snake game.

<!--more-->

This blog documents the actual development process, focusing on concrete implementation details, entity structures, and how different components interact with each other. 

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202508231508513.gif)

### Key Features
- **Dual-Player Support**: Two players can play simultaneously with different control schemes
- **Dynamic Difficulty System**: Four difficulty levels (Easy, Medium, Hard, Hell) with different speeds
- **Food Expiration Mechanics**: Foods have limited lifetimes and disappear if not consumed
- **Obstacle Generation**: Configurable random obstacles to increase challenge

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PythonGame    │───▶│   SnakeGame     │───▶│ SnakeGameBoard  │
│   (Entry Point) │    │   (Menu Logic)  │    │ (Game Logic)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   GameRule      │    │     Snake       │
                       │ (Configuration) │    │   (Entity)      │
                       └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │     Food        │
                                              │   (Entity)      │
                                              └─────────────────┘
```

## Project Structure

### Core Files and Their Responsibilities

```
ConsoleApp2/
├── PythonGame.cs              # Application entry point
└── PythonGame/
    ├── SnakeGame.cs           # Menu system and game state management
    ├── SnakeGameBoard.cs      # Main game loop and board logic
    ├── Snake.cs               # Snake entity with movement and collision
    ├── Food.cs                # Food entity with expiration mechanics
    ├── Direction.cs           # Direction enumeration
    ├── DirctionExtension.cs   # Direction utility methods
    ├── Level.cs               # Difficulty level enumeration
    ├── GameRule.cs            # Game configuration structure
    ├── GameRules.cs           # Predefined rule configurations
    ├── CellType.cs            # Board cell type enumeration
    └── Ultils.cs              # Utility functions
```

This architecture keeps the board as the central coordinator while entities handle their own internal logic and rendering.

## Core Entity Design and Implementation

### 1. Snake Entity - The Heart of the Game

Let me start with the most complex entity - the Snake class. Here's how I structured it:

```csharp
class Snake
{
    public string Name { set; get; }
    private LinkedList<(int x, int y)> body;
    public IEnumerable<(int x, int y)> Body => body;
    
    private ConsoleColor colorHead;
    private ConsoleColor colorBody;
    public bool IsDead { get; set; }
    
    private int width, height;
    private Direction dir;
    
    public Direction Dir
    {
        set
        {
            if (value != dir.Opposite())
                dir = value;
        }
    }
}
```

**Key Design Decisions:**

1. **LinkedList for Body**: I chose `LinkedList<(int x, int y)>` because:
   - O(1) insertion at head (AddFirst)
   - O(1) removal at tail (RemoveLast)
   - Perfect for snake movement where you add head and remove tail

2. **Immutable Body Access**: The `Body` property exposes `IEnumerable` to prevent external modification while allowing collision detection.

3. **Direction Validation**: The `Dir` setter prevents 180-degree turns that would cause instant death.

**Core Methods Implementation:**

```csharp
public void MoveAndDraw(bool eat)
{
    (int nx, int ny) = GetNextHead();
    if (!eat)
    {
        // Remove tail visually and from data structure
        (int tx, int ty) = body.Last.Value;
        Console.SetCursorPosition(tx, ty);
        Console.Write("  ");
        body.RemoveLast();
        
        // Redraw new tail
        (int ntx, int nty) = body.Last.Value;
        Console.SetCursorPosition(ntx, nty);
        PrintTail();
    }
    
    // Convert old head to body segment
    (int hx, int hy) = body.First.Value;
    Console.SetCursorPosition(hx, hy);
    PrintBody();
    
    // Draw new head
    Console.SetCursorPosition(nx, ny);
    PrintHead();
    body.AddFirst((nx, ny));
}
```

This method handles both movement logic and rendering in one atomic operation, ensuring the visual state always matches the data state.

### 2. Food Entity - Time-Based Mechanics

The Food class implements expiration mechanics:

```csharp
public class Food
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Score { get; set; }
    public DateTime ExpiredTime { get; set; }
    public int totalLifeSeconds;
    
    public bool isExpired
    {
        get => DateTime.Now > ExpiredTime;
    }
    
    public void DisplayUpdateFood()
    {
        Console.SetCursorPosition(X, Y);
        if (!isExpired)
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.Write("██");
        }
        else
        {
            Console.WriteLine("  ");
        }
    }
}
```

**Implementation Logic:**
- Each food has a `DateTime` expiration
- The `isExpired` property checks real-time status
- `DisplayUpdateFood()` handles both drawing and cleanup

### 3. Direction System - Type-Safe Movement

I implemented direction handling using enums with extension methods:

```csharp
public enum Direction
{
    Up = 0, Right = 1, Down = 2, Left = 3
}

static public class DirectionExtensions
{
    public static Direction Opposite(this Direction dir)
    {
        return dir switch
        {
            Direction.Up => Direction.Down,
            Direction.Down => Direction.Up,
            Direction.Right => Direction.Left,
            Direction.Left => Direction.Right,
        };
    }
    
    private static readonly (int dx, int dy)[] dirs = {
        (0, -1),   // Up
        (2, 0),    // Right (2 units for double-width characters)
        (0, 1),    // Down
        (-2, 0)    // Left
    };
    
    public static (int dx, int dy) ToOffset(this Direction dir)
    {
        return dirs[(int)dir];
    }
}
```

**Why This Design:**
- Extension methods keep direction logic with direction types
- Pre-computed offsets avoid runtime calculations
- Double-width (2 units) for horizontal movement because console characters are "██" on my console screen

## SnakeGameBoard - The Game Engine

This is where everything comes together. Let me break down how the board coordinates all entities:

### Board Structure and State Management

```csharp
class SnakeGameBoard
{
    private int winWidth, winHeight;
    private CellType[,] vis;  // Visibility/occupancy grid
    
    private Snake snake1;
    private Snake? snake2;    // Nullable for single-player mode
    private List<Food> foods;
    private GameRule rule;    // Configuration object
    
    private Random r;
    
    // Color schemes for different elements
    ConsoleColor snake1Color = ConsoleColor.Green;
    ConsoleColor snake2Color = ConsoleColor.Cyan;
}
```

**The `vis` Array - Core State Tracking:**

```csharp
public enum CellType
{
    Empty = 0,
    Snake1 = 1,
    Snake2 = 2,
    Food = 3, 
    Obstacle = 5,
}
```

This 2D array tracks what occupies each console position. It's the single source of truth for collision detection.

### Board Initialization Logic

```csharp
public SnakeGameBoard(GameRule rule, string player1, string player2)
{
    // Ensure even width for character alignment
    winWidth = (Console.WindowWidth & 1) == 1 ? Console.WindowWidth - 1 : Console.WindowWidth;
    winHeight = Console.WindowHeight;
    
    vis = new CellType[winWidth, winHeight];
    snake1 = new Snake(winWidth, winHeight, player1, snake1Color, snake1BodyColor, initialLength);
    
    if (rule.Player == 2)
    {
        // Keep generating snake2 until no overlap with snake1
        while (true)
        {
            snake2 = new Snake(winWidth, winHeight, player2, snake2Color, snake2BodyColor, initialLength);
            bool overlap = snake2.Body.Any(seg => snake1.Body.Contains(seg));
            if (!overlap) break;
        }
    }
    
    foods = new List<Food>(rule.FoodCount);
    this.rule = rule;
    initVis();  // Populate vis array with initial state
}
```

**Key Implementation Details:**
1. **Even Width**: `(Console.WindowWidth & 1) == 1` checks if width is odd, then subtracts 1
2. **Collision Avoidance**: Uses LINQ to check if any snake2 segment overlaps with snake1
3. **Configuration-Driven**: Everything comes from the `GameRule` object

### The Game Loop - Heart of the Engine

Here's how the main game loop coordinates everything:

```csharp
public void startGame()
{
    // Initial rendering
    snake1.Draw();
    if (snake2 != null) snake2.Draw();
    
    // Generate initial food
    for (int i = 0; i < rule.FoodCount; i++)
    {
        GenerateFood();
    }
    
    while (running)
    {
        // 1. Input Collection Phase
        Direction? dir1 = null, dir2 = null;
        while (Console.KeyAvailable)
        {
            var key = Console.ReadKey(true).Key;
            switch (key)
            {
                case ConsoleKey.UpArrow: snake1.Dir = Direction.Up; break;
                case ConsoleKey.DownArrow: snake1.Dir = Direction.Down; break;
                case ConsoleKey.LeftArrow: snake1.Dir = Direction.Left; break;
                case ConsoleKey.RightArrow: snake1.Dir = Direction.Right; break;
                
                case ConsoleKey.W: dir2 = Direction.Up; break;
                case ConsoleKey.S: dir2 = Direction.Down; break;
                case ConsoleKey.A: dir2 = Direction.Left; break;
                case ConsoleKey.D: dir2 = Direction.Right; break;
                
                case ConsoleKey.Escape: running = false; break;
                case ConsoleKey.Spacebar: running = Pause(); break;
            }
        }
        
        // 2. Collision Detection Phase
        (int nx, int ny) = snake1.GetNextHead();
        bool eat1 = vis[nx, ny] == CellType.Food || vis[nx + 1, ny] == CellType.Food;
        snake1.IsDead = checkDeath(vis[nx, ny]);
        
        if (snake2 != null)
        {
            (int nx2, int ny2) = snake2.GetNextHead();
            bool eat2 = vis[nx2, ny2] == CellType.Food || vis[nx2 + 1, ny2] == CellType.Food;
            snake2.IsDead = checkDeath(vis[nx2, ny2]);
            
            // Head-on collision check
            if (nx2 == nx && ny2 == ny)
            {
                snake1.IsDead = true;
                snake2.IsDead = true;
            }
        }
        
        // 3. Movement Phase
        move(snake1, eat1, CellType.Snake1);
        if (snake2 != null)
            move(snake2, eat2, CellType.Snake2);
            
        // 4. Update Phase
        updateFoodStatus();
        
        // 5. Timing Control
        Thread.Sleep(rule.Speed);
    }
}
```

### Board-Entity Interaction Methods

**The `move()` Method - Core Game Logic:**

```csharp
private void move(Snake snake, bool eat, CellType cellType)
{
    if (snake.IsDead) return;
    
    (int nx, int ny) = snake.GetNextHead();
    
    // Update visibility grid
    vis[nx, ny] = cellType;
    vis[nx + 1, ny] = cellType;  // Double-width character
    
    if (!eat)
    {
        // Clear tail from visibility grid
        (int tx, int ty) = snake.GetTail();
        vis[tx, ty] = CellType.Empty;
        vis[tx + 1, ty] = CellType.Empty;
    }
    
    // Handle visual update and data structure update
    snake.MoveAndDraw(eat);
    
    if (eat)
    {
        // Remove consumed food and generate new one
        RemoveFoodAt(nx, ny);
        GenerateFood();
    }
}
```

**Collision Detection Logic:**

```csharp
private bool checkDeath(CellType current)
{
    return current == CellType.Snake1 || 
           current == CellType.Snake2 || 
           current == CellType.Obstacle;
}
```

This method shows how the board uses the `vis` array to determine collisions.

## Configuration System - GameRule and GameRules

I implemented a configuration-driven system for game rules:

```csharp
public class GameRule
{
    public Level Mode { get; set; }
    public int Player { get; set; }
    public int Speed { get; set; }
    public int FoodCount { get; set; }
    public bool FoodExpiration { get; set; }
    public (int Min, int Max) FoodLifetimeRange { get; set; }
    public bool HasObstacle { get; set; }
    public (int Min, int Max) ObstacleRange { get; set; }
}
```

**Predefined Configurations:**

```csharp
public static class GameRules
{
    public static readonly Dictionary<(int Player, Level Mode), GameRule> Rules = new()
    {
        [(1, Level.Easy)] = new GameRule { 
            Mode = Level.Easy, Speed = 150, 
            FoodLifetimeRange = (8, 9), ObstacleRange = (1, 3) 
        },
        [(1, Level.Hard)] = new GameRule { 
            Mode = Level.Hard, Speed = 75, 
            FoodLifetimeRange = (5, 6), ObstacleRange = (4, 7) 
        },
        // ... more configurations
    };
}
```

**How Board Uses Configuration:**

```csharp
private void NewGame()
{
    GameRule rule = GameRules.Rules[(player, level)];
    
    // Apply user customizations
    if (obstacle == false)
        rule.ObstacleRange = (0, 0);
    rule.FoodCount = foodOnField;
    rule.Player = player;
    
    if (!foodTimer)
        rule.FoodLifetimeRange = ((int)1e8, (int)1e8 + 1);
        
    game = new SnakeGameBoard(rule, "Player1", "Player2");
    game.Run();
}
```

## Key Technical Implementation Details

### Console Rendering Optimization

**Problem**: Console rendering is slow and causes flickering.

**My Solution**: Strategic cursor positioning and selective updates:

```csharp
// Only clear specific positions, never full screen during gameplay
Console.SetCursorPosition(tx, ty);
Console.Write("  ");  // Clear only the tail position

Console.SetCursorPosition(nx, ny);
PrintHead();  // Draw only the new head
```

### Dual-Player Input Handling

**Problem**: Need to handle simultaneous inputs from both players.

**My Solution**: Frame-based input collection:

```csharp
// Collect ALL available inputs in current frame
while (Console.KeyAvailable)
{
    var key = Console.ReadKey(true).Key;
    // Process immediately to avoid input lag
}
```

### Boundary Wrapping Implementation

**Problem**: Handle snake movement across screen edges seamlessly.

**My Solution**: Modulo arithmetic with proper negative handling:

```csharp
public (int x, int y) GetNextHead()
{
    (int nx, int ny) = dir.ToOffset();
    return ((body.First.Value.x + nx + width) % width, 
            (body.First.Value.y + ny + height) % height);
}
```

The key is adding `width` and `height` before modulo to handle negative results correctly.

### Food System Implementation

The food system manages lifecycle, expiration, and regeneration:

```csharp
private void GenerateFood()
{
    int foodX, foodY;
    
    // Find empty position
    do
    {
        foodX = Ultils.NextEven(0, winWidth - 1);  // Even positions for alignment
        foodY = r.Next(0, winHeight - 1);
    } while (vis[foodX, foodY] != CellType.Empty);
    
    // Create food with random lifetime
    Food food = new Food(foodX, foodY, 
        r.Next(rule.FoodLifetimeRange.Min, rule.FoodLifetimeRange.Max + 1), 1);
    foods.Add(food);
    
    // Update visibility grid and render
    vis[foodX, foodY] = CellType.Food;
    vis[foodX + 1, foodY] = CellType.Food;  // Double-width
    food.DisplayUpdateFood();
}
```

**Food Expiration Management:**
```csharp
public void updateFoodStatus()
{
    int removedCount = foods.RemoveAll(f =>
    {
        if (f.isExpired)
        {
            // Clear from visibility grid
            vis[f.X, f.Y] = CellType.Empty;
            vis[f.X + 1, f.Y] = CellType.Empty;
            f.DisplayUpdateFood();  // Visual cleanup
            return true;
        }
        return false;
    });
    
    // Maintain food count
    while (foods.Count < rule.FoodCount)
    {
        GenerateFood();
    }
}
```

**Real-Time Expiration Check:**
```csharp
public bool isExpired
{
    get => DateTime.Now > ExpiredTime;  // Real-time check each frame
}
```

### Obstacle Generation System

Obstacles are generated once at game start and remain static:

```csharp
private void initObstacles()
{        
    Console.ForegroundColor = ConsoleColor.Black;
    int obstacleCnt = r.Next(rule.ObstacleRange.Min, rule.ObstacleRange.Max);
    
    for (int i = 0; i < obstacleCnt; i++)
    {
        GenerateObstacle();
    }
}

public void GenerateObstacle()
{
    int x, y;
    do
    {
        x = Ultils.NextEven(0, winWidth - 1);
        y = r.Next(0, winHeight - 1);
    } while (vis[x, y] != CellType.Empty);
    
    // Update visibility grid and render
    vis[x, y] = CellType.Obstacle;
    vis[x + 1, y] = CellType.Obstacle;
    
    Console.SetCursorPosition(x, y);
    Console.Write("██");
}
```

### Collision Detection System

The collision system uses the `vis` array as the single source of truth:

```csharp
// 1. Pre-movement collision check
(int nx, int ny) = snake1.GetNextHead();
bool eat1 = vis[nx, ny] == CellType.Food || vis[nx + 1, ny] == CellType.Food;
snake1.IsDead = checkDeath(vis[nx, ny]);

private bool checkDeath(CellType current)
{
    return current == CellType.Snake1 || 
           current == CellType.Snake2 || 
           current == CellType.Obstacle;
}
```

**Head-on Collision Detection:**
```csharp
if (snake2 != null)
{
    (int nx2, int ny2) = snake2.GetNextHead();
    
    // Check if both snakes move to same position
    if (nx2 == nx && ny2 == ny)
    {
        snake1.IsDead = true;
        snake2.IsDead = true;
    }
}
```

**Collision Types:**
1. **Self-Collision**: Snake hits its own body (CellType.Snake1/Snake2)
2. **Cross-Collision**: Snake hits other snake's body
3. **Obstacle Collision**: Snake hits static obstacle
4. **Head-on Collision**: Both snakes move to same position simultaneously

### Win/Loss Determination Logic

The game determines winners through multiple scenarios:

```csharp
private void judgeWinner()
{
    if (snake2 == null)
    {
        // Single player - show final score
        string score = "Score: " + snake1.Len.ToString();
        Console.SetCursorPosition((Console.WindowWidth - score.Length) / 2, Console.WindowHeight / 2 - 1);
        Console.Write(score);
        return;
    }
    
    Snake? winner = null;
    string result = "";
    
    if (snake1.IsDead && snake2.IsDead)
    {
        // Both died - compare lengths
        if (snake1.Len == snake2.Len)
        {
            result = "Tie Game";
        }
        else
        {
            winner = snake1.Len > snake2.Len ? snake1 : snake2;
        }
    }
    else if (snake1.IsDead)
        winner = snake2;
    else
        winner = snake1;
    
    if (winner != null)
    {
        result = winner.Name + " Wins!!!";
    }
    
    // Display results with scores
    Console.SetCursorPosition((Console.WindowWidth - result.Length) / 2, Console.WindowHeight / 2 - 2);
    Console.Write(result);
    Console.Write($"{snake1.Name}:\t{snake1.Len}");
    Console.Write($"{snake2.Name}:\t{snake2.Len}");
}
```

**Victory Conditions:**
1. **Opponent Dies First**: Surviving player wins
2. **Mutual Death**: Player with longer snake wins
3. **Equal Length**: Tie game declared

### Dual-Player Combat System

The dual-player system handles simultaneous movement and interaction:

```csharp
// Separate input handling for each player
Direction? dir1 = null, dir2 = null;
while (Console.KeyAvailable)
{
    var key = Console.ReadKey(true).Key;
    switch (key)
    {
        // Player 1 controls (Arrow keys)
        case ConsoleKey.UpArrow: snake1.Dir = Direction.Up; break;
        case ConsoleKey.DownArrow: snake1.Dir = Direction.Down; break;
        case ConsoleKey.LeftArrow: snake1.Dir = Direction.Left; break;
        case ConsoleKey.RightArrow: snake1.Dir = Direction.Right; break;
        
        // Player 2 controls (WASD)
        case ConsoleKey.W: dir2 = Direction.Up; break;
        case ConsoleKey.S: dir2 = Direction.Down; break;
        case ConsoleKey.A: dir2 = Direction.Left; break;
        case ConsoleKey.D: dir2 = Direction.Right; break;
        
        // Shared controls
        case ConsoleKey.Escape: running = false; break;
        case ConsoleKey.Spacebar: running = Pause(); break;
    }
}
```

**Dual-Player Collision Matrix:**

| Snake1 vs | Empty | Food | Snake1 | Snake2 | Obstacle |
| --------- | ----- | ---- | ------ | ------ | -------- |
| **Move**  | ✓     | Eat  | Die    | Die    | Die      |

| Snake2 vs | Empty | Food | Snake1 | Snake2 | Obstacle |
| --------- | ----- | ---- | ------ | ------ | -------- |
| **Move**  | ✓     | Eat  | Die    | Die    | Die      |

**Simultaneous Movement Resolution:**
1. **Input Collection**: Both players' inputs processed in same frame
2. **Position Calculation**: Next positions calculated for both snakes
3. **Collision Detection**: Check each snake against current game state
4. **Head-on Detection**: Special check if both move to same position
5. **Atomic Movement**: Both snakes move simultaneously
6. **State Update**: Visibility grid and visuals updated together

### State Synchronization

The game maintains consistency between three layers:

1. **Data Layer**: `LinkedList<(int x, int y)>` for snake bodies
2. **State Layer**: `CellType[,] vis` for collision detection
3. **Visual Layer**: Console output for rendering

**Synchronization in Movement:**
```csharp
private void move(Snake snake, bool eat, CellType type)
{
    (int nx, int ny) = snake.GetNextHead();
    
    // Update state layer (vis array)
    vis[nx, ny] = type;
    vis[nx + 1, ny] = type;
    
    if (!eat)
    {
        (int tx, int ty) = snake.GetTail();
        vis[tx, ty] = CellType.Empty;
        vis[tx + 1, ty] = CellType.Empty;
    }
    
    // Update data and visual layers
    snake.MoveAndDraw(eat);  // Handles LinkedList + Console output
    
    if (eat)
    {
        foods.RemoveAll(f => f.X == nx && f.Y == ny);
        GenerateFood();
        drawBottomMenu();  // Update score display
    }
}
```

This ensures all three layers stay synchronized throughout the game.

## Conclusion

Building this Snake game taught me valuable lessons about:

- **Entity-Component interaction**: How to keep entities focused while enabling coordination
- **Console game optimization**: Minimizing rendering calls for smooth gameplay
- **Configuration-driven design**: Making systems flexible through external configuration
- **Data structure selection**: Choosing the right structure (LinkedList) for the job
- **State synchronization**: Keeping visual state and data state consistent
- **Real-time systems**: Frame-based processing for responsive multiplayer gameplay
- **Collision detection**: Using unified state arrays for efficient collision checking

The key insight was treating the console as a graphics buffer and the `vis` array as the authoritative game state, with entities responsible for their own behavior but coordinated through the central board.

## Core Components Deep Dive

### 1. Menu System (`SnakeGame.cs`)

The menu system demonstrates sophisticated state management and user interface design:

```csharp
public class SnakeGame
{
    int player;
    int currentMenu;
    Level level;
    bool obstacle;
    bool foodTimer;
    int foodOnField;
    
    private static readonly string[] menu = new string[]{
        "Start New Game",
        "  Players: ",
        "  Difficulty: ",
        "  Obstacles: ",
        "  Food Timer: ",
        "  Food on Field: ",
        "View History / Rankings"
    };
}
```

**Key Implementation Details:**

1. **State Management**: The menu maintains current selection (`currentMenu`) and game configuration state
2. **Circular Navigation**: Uses modulo arithmetic for wrap-around menu navigation
3. **Dynamic Options**: Settings change in real-time with visual feedback
4. **Input Handling**: Comprehensive keyboard input processing with arrow keys and confirmation

**Navigation Logic:**
```csharp
if (key == ConsoleKey.UpArrow)
{
    currentMenu = (currentMenu - 1 + menu.Length) % menu.Length;
    displayMenu();
}
else if (key == ConsoleKey.DownArrow)
{
    currentMenu = (currentMenu + 1) % menu.Length;
    displayMenu();
}
```

This demonstrates elegant circular navigation that prevents index out-of-bounds errors.

### 2. Game Board Engine (`SnakeGameBoard.cs`)

The game board serves as the main game engine, coordinating all game entities and managing the core game loop:

**Initialization Strategy:**
```csharp
public SnakeGameBoard(GameRule rule, string player1, string player2)
{
    winWidth = (Console.WindowWidth & 1) == 1 ? Console.WindowWidth - 1 : Console.WindowWidth;
    winHeight = Console.WindowHeight;
    
    vis = new CellType[winWidth, winHeight];
    snake1 = new Snake(winWidth, winHeight, player1, snake1Color, snake1BodyColor, initialLength);
    
    if (rule.Player == 2)
    {
        while (true)
        {
            snake2 = new Snake(winWidth, winHeight, player2, snake2Color, snake2BodyColor, initialLength);
            bool overlap = snake2.Body.Any(seg => snake1.Body.Contains(seg));
            if (!overlap) break;
        }
    }
}
```

**Critical Design Decisions:**

1. **Even Width Enforcement**: Ensures proper character alignment for console rendering
2. **Collision Avoidance**: Regenerates second player position until no overlap occurs
3. **Flexible Player Count**: Conditionally creates second snake based on game rules
4. **Resource Management**: Proper initialization of all game entities

### 3. Snake Entity (`Snake.cs`)

The Snake class demonstrates advanced data structure usage and efficient rendering:

**Data Structure Choice:**
```csharp
private LinkedList<(int x, int y)> body;
```

**Why LinkedList?**
- **O(1) Head Addition**: Adding new head segment is constant time
- **O(1) Tail Removal**: Removing tail segment is constant time
- **Memory Efficiency**: No need to shift array elements during movement
- **Natural Snake Representation**: Linked structure mirrors snake's segmented nature

**Movement Algorithm:**
```csharp
public (int x, int y) GetNextHead()
{
    (int x, int y) head = GetCurrentHead;
    (int dx, int dy) = dir.ToOffset();
    int newX = (head.x + dx + width) % width;
    int newY = (head.y + dy + height) % height;
    
    return (newX, newY);
}
```

**Boundary Wrapping Logic:**
- Uses modulo arithmetic for seamless world wrapping
- Handles negative coordinates correctly with addition before modulo
- Maintains continuous movement without boundary checks

### 4. Food System (`Food.cs`)

The food system implements time-based mechanics with visual feedback:

```csharp
public class Food
{
    public DateTime ExpiredTime { get; set; }
    public int totalLifeSeconds;
    
    public bool isExpired
    {
        get => DateTime.Now > ExpiredTime;
    }
    
    public void DisplayUpdateFood()
    {
        Console.SetCursorPosition(X, Y);
        if (!isExpired)
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.Write("██");
        }
        else
        {
            Console.WriteLine("  ");
        }
    }
}
```

**Time Management Strategy:**
- Uses `DateTime` for precise expiration tracking
- Implements property-based expiration checking
- Provides visual feedback for food state changes

## Game Mechanics Implementation

### Direction System

The direction system uses enums with extension methods for clean, type-safe direction handling:

```csharp
public enum Direction
{
    Up = 0, Right = 1, Down = 2, Left = 3
}

static public class DirectionExtensions
{
    public static Direction Opposite(this Direction dir)
    {
        return dir switch
        {
            Direction.Up => Direction.Down,
            Direction.Down => Direction.Up,
            Direction.Right => Direction.Left,
            Direction.Left => Direction.Right,
        };
    }
    
    private static readonly (int dx, int dy)[] dirs = {
        (0, -1),   // Up
        (2, 0),    // Right (2 units for double-width characters)
        (0, 1),    // Down
        (-2, 0)    // Left
    };
}
```

**Design Benefits:**
- **Type Safety**: Enum prevents invalid direction values
- **Extensibility**: Easy to add new directions
- **Performance**: Pre-computed offset arrays avoid runtime calculations
- **Readability**: Extension methods provide intuitive API

### Collision Detection

The collision system uses a multi-layered approach:

1. **Visibility Grid**: 2D array tracks cell occupancy
2. **Entity Checking**: Direct coordinate comparison for precision
3. **Boundary Wrapping**: Modulo arithmetic for seamless world edges

### Input Collection Strategy

The game uses frame-based input collection to handle multiple simultaneous inputs:

```csharp
List<ConsoleKey> inputs = new List<ConsoleKey>();
while (Console.KeyAvailable)
{
    inputs.Add(Console.ReadKey(true).Key);
}

foreach (var input in inputs)
{
    // Process each input for respective players
}
```

This approach ensures no input is lost during rapid key presses, crucial for dual-player gameplay.

## Advanced Features

### 1. Dual-Player System

The dual-player implementation demonstrates complex state management:

**Control Scheme Separation:**
- Player 1: Arrow keys (↑↓←→)
- Player 2: WASD keys
- Shared controls: Space (pause), Escape (exit)

**Simultaneous Processing:**
Both snakes update in the same frame, ensuring fair gameplay and consistent timing.

### 2. Dynamic Difficulty System

Difficulty affects multiple game parameters:

```csharp
public enum Level
{
    Easy, Medium, Hard, Hell
}
```

Each level modifies:
- Snake movement speed
- Food expiration time
- Obstacle density
- Score multipliers

### 3. Food Expiration Mechanics

The expiration system adds strategic depth:

**Implementation Details:**
- Foods spawn with random lifetimes
- Visual countdown through color changes
- Automatic cleanup of expired foods
- Score bonuses for quick consumption

### 4. Configurable Game Rules

The `GameRule` class enables flexible game configuration:

```csharp
public class GameRule
{
    public Level Mode { get; set; }
    public int Player { get; set; }
    public int Speed { get; set; }
    public int FoodCount { get; set; }
    public bool FoodExpiration { get; set; }
    public (int Min, int Max) FoodLifetimeRange { get; set; }
    public bool HasObstacle { get; set; }
    public (int Min, int Max) ObstacleRange { get; set; }
}
```

This allows for easy customization and future feature additions.

## Technical Challenges and Solutions

### 1. Console Rendering Optimization

**Challenge**: Console rendering is inherently slow and can cause flickering.

**Solution**: 
- Minimal screen updates using `Console.SetCursorPosition()`
- Only redraw changed elements
- Double-buffering simulation through strategic clearing

### 2. Timing and Synchronization

**Challenge**: Maintaining consistent frame rates across different difficulty levels.

**Solution**:
- Thread.Sleep() with difficulty-based intervals
- Input collection before each frame
- Separate rendering and logic phases

### 3. Memory Management

**Challenge**: Frequent allocation/deallocation during gameplay.

**Solution**:
- Object pooling for food entities
- LinkedList for efficient snake body management
- Reused data structures where possible

### 4. Boundary Handling

**Challenge**: Managing snake movement across screen boundaries.

**Solution**:
```csharp
int newX = (head.x + dx + width) % width;
int newY = (head.y + dy + height) % height;
```

Modulo arithmetic with positive offset ensures correct wrapping behavior.

## Performance Optimizations

### 1. Rendering Optimizations

- **Selective Updates**: Only redraw changed screen regions
- **Color Management**: Minimize color changes to reduce console overhead
- **Cursor Positioning**: Strategic cursor placement to minimize jumps

### 2. Data Structure Efficiency

- **LinkedList for Snake**: O(1) head/tail operations
- **HashSet for Collision**: O(1) position lookup
- **Array for Grid**: Direct memory access for position checking

### 3. Input Handling

- **Key Buffering**: Collect all available inputs per frame
- **Input Validation**: Filter invalid inputs early
- **State Caching**: Avoid repeated property access
