---
title: Git Commands
date: 2020-01-30 10:25:39
tags: Knowledge points
categories: Git
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202301260020633.jpg
---

Just because I want to solve a problem while setting  my gitee(It needs to input user name and password every time I deploy my Blog), a friend let me study git first so that I can understand what the bug is telling about!!!! (not for solving the problem, I learn it just for understanding the alert ㅍ_ㅍ......) Life is so hard......

I'll just record some commonly used commands.

<!--more-->

# Introduction

> **Git** ([/ɡɪt/](https://en.wikipedia.org/wiki/Help:IPA/English))[[7\]](https://en.wikipedia.org/wiki/Git#cite_note-:0-7) is a [distributed version-control](https://en.wikipedia.org/wiki/Distributed_version_control) system for tracking changes in [source code](https://en.wikipedia.org/wiki/Source_code) during [software development](https://en.wikipedia.org/wiki/Software_development).[[8\]](https://en.wikipedia.org/wiki/Git#cite_note-effcomp-8) It is designed for coordinating work among [programmers](https://en.wikipedia.org/wiki/Programmer), but it can be used to track changes in any set of [files](https://en.wikipedia.org/wiki/Computer_file). Its goals include speed,[[9\]](https://en.wikipedia.org/wiki/Git#cite_note-kernel_SCM_saga-9) [data integrity](https://en.wikipedia.org/wiki/Data_integrity),[[10\]](https://en.wikipedia.org/wiki/Git#cite_note-integrity_goals-10) and support for distributed, non-linear workflows.[[11\]](https://en.wikipedia.org/wiki/Git#cite_note-linusGoogleTalk-11)
>
> Git was created by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) in 2005 for development of the [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel), with other kernel developers contributing to its initial development.[[12\]](https://en.wikipedia.org/wiki/Git#cite_note-pro-git-1.2-12) Its current maintainer since 2005 is Junio Hamano. As with most other distributed version-control systems, and unlike most [client–server](https://en.wikipedia.org/wiki/Client–server) systems, every Git [directory](https://en.wikipedia.org/wiki/Directory_(computing)) on every [computer](https://en.wikipedia.org/wiki/Node_(networking)) is a full-fledged [repository](https://en.wikipedia.org/wiki/Repository_(version_control)) with complete history and full version-tracking abilities, independent of network access or a central server.[[13\]](https://en.wikipedia.org/wiki/Git#cite_note-13) Git is [free and open-source software](https://en.wikipedia.org/wiki/Free_and_open-source_software) distributed under the terms of the [GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) version 2.  ——Wikipedia

## Install Git

Type `git` to test whether you have installed git or not.

If not, type 

```
→ sudo pacman -S git
```

## Create a repository

```
→ mkdir -p Yao/Study/Git/Learn_git
→ cd Yao/Study/Git/Learn_git
→ pwd
/home/o_oyao/Yao/Study/Git/Learn_git
```

Initial the directory into Git

```
→ git init
```

Check hidden directory

```
→ ls -ah
```

Add a file to to the Git repository

```
→ git add filename
→ git add filename1 filename2
```

Submit the file to repository

```
→ git commit -m "I submitted a new file"
```

(`-m` parameter tell the git your description)

# Status and Version

## Status

Check the current status of the repository

```
→ git status
```

Check what has been changed and added but not been submitted

```
→ git diff
```

Check what has been added but not submitted

```
→ git diff --cached
```

Check the difference between working section and the newest edition in repository

```
→ git diff HEAD -- filename
```

## Version

Check the submit history

```
→ git log
```

Display the brief information of each version

```
→ git log --pretty=oneline
```

Check the graph of union of branch 

```
→ git log --graph
```

Back to previous version

```
→ git reset --hard HEAD^ 
→ git reset --hard HEAD~100
```

Back to a certain abandoned version(After you reset, you can't see the version in git log)

```
→ git reset --hard commit_id
```

(Don't need to type in the full long commit id, you just need to type the first few word)

See all your commands (Help you to find a abandoned version)

```
→ git reflog
```

## Revoke changes

Abandon changes in working section

```
→ git checkout -- filename
```

(There are two status: 1. the file has not been added yet, revoke it to the same as the repository. 2. the file has been added but changed  after added, revoke it to the storage cache.)

Revoke changes in storage cache to working section

```
→ git reset HEAD filename
```

## Delete file

Delete a file in working section

```
→ rm filename
```

Delete a file in repository

```
→ git rm filename
```

Revoke the delete

```
→ git checkout -- deleted_filename
```

(If changes has not been submitted to repository, it can't be revoked)

## Remote repository

Create SSH Key with GitHub

```
→ ssh-keygen -t rsa -C "GitHub_email@xx.xx"
```

Link your local repository to GitHub repository

```
→ git remote add origin git@github.com:GitHub_name/GitHub_repository_name.git
```

Upload local repository to GitHub repository(For an empty repository on GitHub)

```
→ git push -u origin master
```

Clone a local repository to Github repository

```
→ git clone git@github.com:GitHub_name/GitHub_repository_name.git
```

# Branches

## Create and Merge

Create and switched to the branch

```
→ git checkout -b branch_name
```

Or using two commands

```
→ git branch branch_name
→ git checkout branch_name
```

New way of creating and switching branches

```
→ git switch -c branch_name
→ git switch master
```

Check the current branch

```
→ git branch
```

Delete the branch

```
→ git branch -d branch_name
```

Forcibly delete a branch

```
→ git branch -D branch_name
```

## Branch management

Not using `Fast forward`

```
→ git merge --no-ff -m "description" branch_name
```

Hide recent work section

```
→ git stash
```

Check hide branch repository 

```
→ git stash list
```

Restore the hidden branch repository

```
→ git stash apply stash@{xx}
→ git stash drop
```

(first restore and then delete)

Or restoring and deleting at the same time

```
→ git stash list
```

Copy modified file from another branch

```
→ git cherry-pick commit_id
```

## Remote

Check remote information

```
→ git remote
```

For more detail

```
→ git remote -v
```

Push branches

```
→ git push origin branch_name
```

Get the newest commit from remote repository

```
→ git pull
```

Let local branch connect with remote branch

```
→ git branch --set-upstream-to=origin/branch_name branch_name
```

## Rebase

Make your history commit graph a line

```
→ git rebase
```

# Tags

## Create a tag

Create a tag for a version of repository

```
→ git tag tag_name
→ git tag tag_name 
→ git tag tag_name -m "description"
```

Check for tags information

```
→ git show tag_name
```

## Operate tags

Delete a tag

```
→ git tag -d tag_name
```

Push the tag to remote repository

```
→ git push origin tag_name
→ git push origin --tags
```

Deleter a tag from remote repository

```
→ git tag -d tag_name
→ git push origin :refs/tags/tag_name
```

# Custom Git

Let Git display with color

```
→ git config --global color.ui true
```

File `.gitignore` helps ignore deploying  special files

## Ignore specific file

Forcibly add a file

```
→ git add -f file_name
```

Check ignore rules

```
→ git check-ignore -v file_name
```

## Alias

Set a alias for long full name commands

```
→ git config --global alias.abbrev full_name
```