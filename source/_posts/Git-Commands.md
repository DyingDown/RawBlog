---
title: Git Commands
date: 2020-01-30 10:25:39
tags: Knowledge points
categories: Git
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202301260020633.jpg
isCarousel: true
---

Just because I want to solve a problem while setting  my gitee(It needs to input user name and password every time I deploy my Blog), a friend let me study git first so that I can understand what the bug is telling about!!!! (not for solving the problem, I learn it just for understanding the alert ㅍ_ㅍ......) Life is so hard......

I'll just record some commonly used commands.

<!--more-->

## Introduction

> **Git** ([/ɡɪt/](https://en.wikipedia.org/wiki/Help:IPA/English))[[7\]](https://en.wikipedia.org/wiki/Git#cite_note-:0-7) is a [distributed version-control](https://en.wikipedia.org/wiki/Distributed_version_control) system for tracking changes in [source code](https://en.wikipedia.org/wiki/Source_code) during [software development](https://en.wikipedia.org/wiki/Software_development).[[8\]](https://en.wikipedia.org/wiki/Git#cite_note-effcomp-8) It is designed for coordinating work among [programmers](https://en.wikipedia.org/wiki/Programmer), but it can be used to track changes in any set of [files](https://en.wikipedia.org/wiki/Computer_file). Its goals include speed,[[9\]](https://en.wikipedia.org/wiki/Git#cite_note-kernel_SCM_saga-9) [data integrity](https://en.wikipedia.org/wiki/Data_integrity),[[10\]](https://en.wikipedia.org/wiki/Git#cite_note-integrity_goals-10) and support for distributed, non-linear workflows.[[11\]](https://en.wikipedia.org/wiki/Git#cite_note-linusGoogleTalk-11)
>
> Git was created by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) in 2005 for development of the [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel), with other kernel developers contributing to its initial development.[[12\]](https://en.wikipedia.org/wiki/Git#cite_note-pro-git-1.2-12) Its current maintainer since 2005 is Junio Hamano. As with most other distributed version-control systems, and unlike most [client–server](https://en.wikipedia.org/wiki/Client–server) systems, every Git [directory](https://en.wikipedia.org/wiki/Directory_(computing)) on every [computer](https://en.wikipedia.org/wiki/Node_(networking)) is a full-fledged [repository](https://en.wikipedia.org/wiki/Repository_(version_control)) with complete history and full version-tracking abilities, independent of network access or a central server.[[13\]](https://en.wikipedia.org/wiki/Git#cite_note-13) Git is [free and open-source software](https://en.wikipedia.org/wiki/Free_and_open-source_software) distributed under the terms of the [GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) version 2.  ——Wikipedia

### Install Git

Type `git` to test whether you have installed git or not.

If not, type 

```bash
sudo pacman -S git
```

### Create a repository

```bash
mkdir -p Yao/Study/Git/Learn_git
cd Yao/Study/Git/Learn_git
pwd
/home/o_oyao/Yao/Study/Git/Learn_git
```

Initial the directory into Git

```bash
git init
```

Check hidden directory

```bash
ls -ah
```

Add a file to to the Git repository

```bash
git add filename
git add filename1 filename2
```

Submit the file to repository

```bash
git commit -m "I submitted a new file"
```

(`-m` parameter tell the git your description)

### Git config

```bash
git config --global user.email "your git email"
git config --global user.user "your git username"
```

[Save Git Credentials](https://dyingdown.github.io/2020/08/07/Git-Save-Username-and-Keys/)

#### Private Config for GitHub

Go to Settings > Emails > Keep my email address private

```bash
git config -- global user.email xxxxxxx+youruser@users.noreply.github.com
```

### Status and Version

#### Status

Check the current status of the repository

```bash
git status
```

Check what has been changed and added but not been submitted

```bash
git diff
```

Check what has been added but not submitted

```bash
git diff --cached
```

Check the difference between working section and the newest edition in repository

```bash
git diff HEAD -- filename
```

### Version

Check the submit history

```bash
git log
```

Display the brief information of each version

```bash
git log --pretty=oneline
```

Check the graph of union of branch 

```bash
git log --graph
```

Back to previous version

```bash
git reset --hard HEAD^ 
git reset --hard HEAD~100
```

Back to a certain abandoned version(After you reset, you can't see the version in git log)

```bash
git reset --hard commit_id
```

(Don't need to type in the full long commit id, you just need to type the first few word)

See all your commands (Help you to find a abandoned version)

```bash
git reflog
```

### Revoke changes

Abandon changes in working section

```bash
git checkout -- filename
```

(There are two status: 1. the file has not been added yet, revoke it to the same as the repository. 2. the file has been added but changed  after added, revoke it to the storage cache.)

Revoke changes in storage cache to working section

```bash
git reset HEAD filename
```

### Delete file

Delete a file in working section

```bash
rm filename
```

Delete a file in repository

```bash
git rm filename
```

Revoke the delete

```bash
git checkout -- deleted_filename
```

(If changes has not been submitted to repository, it can't be revoked)

### Remote repository

Create SSH Key with GitHub

```bash
ssh-keygen -t rsa -C "GitHub_email@xx.xx"
```

Link your local repository to GitHub repository

```bash
git remote add origin git@github.com:GitHub_name/GitHub_repository_name.git
```

Upload local repository to GitHub repository(For an empty repository on GitHub)

```bash
git push -u origin master
```

Clone a local repository to Github repository

```bash
git clone git@github.com:GitHub_name/GitHub_repository_name.git
```

## Branches

### Create and Merge

Create and switched to the branch

```bash
git checkout -b branch_name
```

Or using two commands

```bash
git branch branch_name
git checkout branch_name
```

New way of creating and switching branches

```bash
git switch -c branch_name
git switch master
```

Check the current branch

```bash
git branch
```

Delete the branch

```bash
git branch -d branch_name
```

Forcibly delete a branch

```bash
git branch -D branch_name
```

Merge branch a to b

```bash
git checkout b
git merge a
```

Check the merged branch that can be safely deleted

```bash
git bransh --merged
```

Check common ancestor of two commits

```bash
git merge-base xxx xxx
```

### Branch management

Not using `Fast forward`

```bash
git merge --no-ff -m "description" branch_name
```

Hide recent work section

```bash
git stash
```

Check hide branch repository 

```bash
git stash list
```

Restore the hidden branch repository

```bash
git stash apply stash@{xx}
git stash drop
```

(first restore and then delete)

Or restoring and deleting at the same time

```bash
git stash list
```

Copy modified file from another branch

```bash
git cherry-pick commit_id
```

### Remote

Check remote information

```bash
git remote
```

For more detail

```bash
git remote -v
```

Push branches

```bash
git push origin branch_name
```

Get the newest commit from remote repository . `--prune` means delete the local branch if it is removed from remote branch

```bash
git pull
put pull --prune 
```

Let local branch connect with remote branch

```bash
git branch --set-upstream-to=origin/branch_name branch_name
```

Set up the remote branch when pushing

```bash
git push --set-upstream origin branch_name
git push -u origin branch_name
```

### Rebase

Make your history commit graph a line

```bash
git rebase
```

## Tags

### Create a tag

Create a tag for a version of repository

```bash
git tag tag_name
git tag tag_name 
git tag tag_name -m "description"
```

Check for tags information

```bash
git show tag_name
```

### Operate tags

Delete a tag

```bash
git tag -d tag_name
```

Push the tag to remote repository

```bash
git push origin tag_name
git push origin --tags
```

Deleter a tag from remote repository

```bash
git tag -d tag_name
git push origin :refs/tags/tag_name
```

## Custom Git

Let Git display with color

```bash
git config --global color.ui true
```

File `.gitignore` helps ignore deploying  special files

### Ignore specific file

Forcibly add a file

```bash
git add -f file_name
```

Check ignore rules

```bash
git check-ignore -v file_name
```

### Alias

Set a alias for long full name commands

```bash
git config --global alias.abbrev full_name
```

Some Custom Aliases

```bash
// original command
git log --oneline --graph --decorate --all

// alias
git config --global alias.lol "log --oneline --graph --decorate --all"
```

```bash
git config --global alias.ec "config --global -e"
```

```bash
git config --global alias.ch "checkout"
```

```bash
git config --global alias.cob "checkout -b"
```

```bash
git config --global alias.s "status -s"
```

clean and update branch alias

```bash
git config alias.dlb `!git checkout <DEFAULT-BRANCH> && git pull --prune && git branch --merged | grep -v "\*" | xargs -n 1 git branch -d`
```



### Auto CRLF

Git setting that automatically **converts line endings** when checking files in and out of the repository. 

Line endings differ by OS: 

Windows uses `CRLF` (`\r\n`)   - `true`

Unix/Linux/macOS use `LF` (`\n`) - `input`

```bash
git config --global core.autocrlf <true|false|input>
```

### Default Editor

`--wait` wait for the editor close before continuing.

```bash
git config --global core.editor "code --wait"
```

### 

## Reset

```bash
git reset --soft HEAD~1
```

Only undo the commit

```bash
git reset --mixed HEAD~1
```

Also reset the staging area

```bash
git resert --hard HEAD~1
```

Reset the working directory, means you will loose your edition at all, 

however, you can look for it using  `reflog `only if you submitted it  before

```bash
git reflog
```

## Revert

Create a new commit which the content is the reverse action of this certain commit.

```bash
git revert hashcode --no-edit
```

revert will automatically pops up edit to let you specify commit message, use `--no-edit` to use default message.

## Log

`--oneline`: Display each commit in a single line

`--graph`: Show ASCII graph of the branch and merge structure

`--decorate`: Add branch and tag names (refs) as decorations

`--all`: Show commits from all branches (not just the current one)

```bash
git log --oneline --graph --decorate --all
```

See the exact change of each commit

```bash
git log --stat
```

See the detail difference of each commit

```bash
git log --patch
```

See the more recent x commits

```bash
git log -n x
```

## Bisect

```bash
git bisect start 
git bisect good xxx
git bisect bad xxx
```

And then git will automatically find the middle commit, and switch to it. 

Run using bisect. The test file must return numbers, 0 as good, any other number as bad.

```bash
git bisect run test_file_or_command
```

Reset bisect to return  to a branch

```bash
git bisect reset
```

## Other

