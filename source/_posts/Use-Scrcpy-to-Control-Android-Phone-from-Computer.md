---
title: Use Scrcpy to Control Android Phone from Computer
date: 2025-08-30 15:10:02
tags: [Scrcpy, Adb, Adnroid control, mirror phone, phone to pc]
categories: Android Tools
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202508301611259.png
description:
warning: false
isCarousel: false
---

Sometimes when I’m playing games on my phone, ads pop up and I get too lazy to reach for it just to click close. I thought it’d be easier if I could control my phone directly with my mouse while sitting at the computer—and that’s how I ended up using scrcpy.

<!--more-->

## PC Setup

Install **ADB + Scrcpy**

- **Windows**

  1. Download the official Scrcpy release:
      👉 [Scrcpy GitHub Releases](https://github.com/Genymobile/scrcpy/releases?utm_source=chatgpt.com)
  2. Extract the ZIP to a folder, e.g. `C:\scrcpy`.
  3. Make sure the folder contains both `scrcpy.exe` and `adb.exe`.

- **Mac (Homebrew)**

  ```bash
  brew install scrcpy
  ```

- **Linux (Debian/Ubuntu)**

  ```bash
  sudo apt install scrcpy adb
  ```

## Phone Setup 

My phone Sumsung, so the following steps are based on Sumsung S24.

### Enable Developer Options

1. Go to **Settings → About phone → Software information**.
2. Tap **Build number** seven times, then enter your unlock PIN.
3. This will enable **Developer options**.

### Enable USB Debugging

1. Open **Settings → Developer options**.
2. Toggle on **USB debugging**.
3. (Optional: if you plan to connect wirelessly, also enable **Wireless debugging**.)

## Connection Methods

### Option A: Wired Connection (easiest, recommended for first time)

#### Step 1: Extract Scrcpy

- Right-click the downloaded ZIP → **Extract All** to a folder, e.g.:

  ```bash
  C:\scrcpy
  ```

- The folder should now contain files like `scrcpy.exe` and `adb.exe`.

#### Step 2: Connect Your Phone

1. Make sure your phone:

   - Has **USB debugging** enabled
   - Is connected with a **USB-C data cable**
   - Shows the **“Allow USB debugging?”** prompt → tap **Allow**

2. In the Command Prompt, check the device:

   ```bash
   adb devices
   ```

   If you see something like:

   ```bash
   List of devices attached
   R58M12345    device
   ```

   your phone is connected successfully.

#### Step 3: Open Command Prompt

1. Navigate to the Scrcpy folder:

   ```bash
   cd C:\scrcpy
   ```

   (Replace with the path where you extracted Scrcpy.)

### Step 4: Start Scrcpy

Run:

```bash
scrcpy.exe
```

If everything is set up, you’ll see your phone screen mirrored on your PC, and you can control it with mouse and keyboard. 

### Option B: Wireless Connection (no cable needed after first setup)

Note: the first connection must be done via USB to authorize debugging.

1. Ensure your **PC and phone are on the same Wi-Fi network**.

2. With the phone connected via USB, run:

   ```bash
   adb tcpip 5555
   ```

   (This makes the phone listen for ADB connections on port 5555.)

3. Find your phone’s IP address:
    **Settings → About phone → Status information → IP address**.

4. On your PC, connect to the phone:

   ```bash
   adb connect PHONE_IP:5555
   ```

   Example:

   ```bash
   adb connect 192.168.1.25:5555
   ```

5. Disconnect the USB cable, then run:

   ```bash
   scrcpy
   ```

6. Now your phone is fully **wirelessly mirrored and controllable** on your PC! 