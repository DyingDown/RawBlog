---
title: GitHub Actions Workflow
date: 2025-07-14 22:16:26
tags: [GitHub Action, Workflow, Triggers, Job, Artifacts]
categories: [GitHub, CI/CD]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202507151546046.png
warning: True
isCarousel: false
---

GitHub Actions is a CI/CD and automation tool built into GitHub. Workflows allow you to automate tasks like testing, building, deploying, or managing your code lifecycle.

<!--more-->

## Workflow Structure Overview

```yaml
name: <Workflow Name>         # Name shown in GitHub Actions UI

on:                           # Event trigger
  <event>: <conditions>

jobs:                         # One or more jobs to run
  <job-id>:
    name: <Job name>
    runs-on: ubuntu-latest    # GitHub-hosted runner environment
    steps:
      - name: <Step name>
        uses: <action>@<version>    # For reusable actions
        run: <shell command>        # For custom bash scripts
        env:
          MY_ENV_VAR: "value"
```

## Trigger Types (`on:`)

### 1. `push`

Run workflow when code is pushed:

```yaml
on:
  push:
    branches: [main, dev]
```

### 2. `pull_request`

Trigger on PR events like opened, closed, or synchronized:

```yaml
on:
  pull_request:
    types: [opened, synchronize, closed]
```

### 3. `workflow_dispatch`

Enable manual runs from GitHub UI (with optional input parameters):

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Release version'
        required: true
```

- `inputs.version`: Define a custom input for the workflow. You can access it via `${{ github.event.inputs.version }}`

- You can trigger this from API using a POST request to:

  ```API
  POST https://api.github.com/repos/OWNER/REPO/actions/workflows/WORKFLOW_ID/dispatches
  ```

  With body:

  ```json
  {
    "ref": "main",
    "inputs": {
      "version": "v1.0.0"
    }
  }
  ```

### 4. `schedule`

Run on a fixed schedule (UTC cron syntax):

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
```

### 5. `check-run`

you can configure a workflow to run when specific webhook events occur on GitHub. You can trigger most webhook events from more than one activity for a webhook. If multiple activities exist for a webhook, you can specify an activity type to trigger the workflow.

```yaml
on:
  check_run:
    types: [rerequested, requested_action]
```

## Jobs and Steps

### Jobs:

- Each `job` runs independently unless defined in `needs:`
- Run on a VM or Docker container

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run tests
        run: npm test
```

### Dependencies between jobs:

```yaml
jobs:
  build:
    ...

  deploy:
    needs: build
    ...
```

### Use

Every action you reference must be either a **local** action (`./.github/actions/`) or **from GitHub Marketplace**.

Syntax: `uses: owner/repo@version`

> Tip: Always pin to a specific `@version` instead of `@latest` to avoid future breaking changes.

#### Common `uses:` Actions

| Action                         | Description                                  |
| ------------------------------ | -------------------------------------------- |
| `actions/checkout@v4`          | Checks out your code                         |
| `actions/setup-node@v4`        | Setup Node.js runtime                        |
| `docker/build-push-action@v5`  | Build and push Docker images                 |
| `actions/upload-artifact@v4`   | Upload files (artifacts) between jobs        |
| `actions/download-artifact@v4` | Download artifacts uploaded from another job |

### `with:` Supplies Inputs to Actions

Many actions take arguments via `with:`:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'
```

You can do the same with your **custom composite actions** or when using marketplace actions.

## Secrets and Variables

### Secrets (for sensitive info):

- Stored in GitHub repo → Settings → Secrets → Actions
- Access via `${{ secrets.MY_SECRET }}`

### Variables (non-sensitive config):

- Defined in Settings → Variables
- Access via `${{ vars.MY_VARIABLE }}`

```yaml
env:
  SSH_KEY: ${{ secrets.DEPLOY_KEY }}
  DEPLOY_PATH: ${{ vars.PATH }}
```

##  Common Bash `run:` Usage

```yaml
- name: Install dependencies
  run: |
    npm install
    npm run build

- name: Upload files
  run: scp -i key.pem file.tar.gz $USER@$HOST:$DEPLOY_PATH/
```

Multi-line commands use the pipe `|` symbol.

## Workflow Dispatch Inputs (manual triggers)

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
```

Access it in `run:`:

```yaml
${{ github.event.inputs.environment }}
```

Use `workflow_dispatch` with the GitHub REST API:

```bash
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/actions/workflows/WORKFLOW_FILE.yaml/dispatches \
  -d '{"ref":"main","inputs":{"environment":"prod"}}'
```



## Matrix Builds (Test multiple envs)

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [14, 16, 18]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install && npm test
```

## Artifacts (Share files between jobs)

In GitHub Actions workflows, each job runs in its own isolated environment (runner). This means **files created or modified in one job are not automatically available in another job**. 

Artifacts are files or directories that you explicitly upload from one job and then download in another job within the **same workflow run**. GitHub stores these files temporarily in a central storage location called **artifact storage**.

`name`: Logical identifier for this artifact

`path`: File or folder path on the runner to upload

### Upload:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-zip
    path: ./dist/
```

### Download:

```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-zip    # Must match the upload artifact name
    path: ./restore/   # Directory to restore files to
```

> Files uploaded are stored in GitHub’s artifact storage and can be downloaded in **later jobs**, or even after the workflow finishes.

## Tips

- Each `step:` can use either `uses:` (for reusable actions) or `run:` (for custom shell commands), not both.
- Use `env:` at job or step level to avoid repeating variables.
- Use matrix builds for multiple versions or environments.

- Use artifacts to share outputs
- Avoid exposing secrets via `echo`
- Prefer `workflow_dispatch` for production deploys
- Use `matrix:` for multi-version testing