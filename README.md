## INSTALL NOTES

The Areabox is composed of 3 parts

1. areaboi2 is a node web app of the chat interface
2. upload has api calls used by the chat interface for taks such as upload files, audio upload, retrieval of ogp from externakl sites and thumbnails for images
3. areaboi_home has home page of project currently having only html files

tested with node 16, requires node 16 for firebase hosting
It is based on

```
https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-nextjs
```

\*\* Prerequisites

```
yarn global add firebase-tools
#sudo npm install -g firebase-tools
```

to install node you may use 'n' (this is for linux) or check the page at https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js

```
sudo npm cache clean -f
sudo npm install -g n
sudo n 16
```

\*\* running Areabox Chat for development on local computer

```
1. install
yarn install

2. test and develop with hot reload,
this requires files a copy or symbolic link of the static files

cd areaboi3/src/client
ln -s ../../public/ public
mklink /d public ..\..\public (Windows OS)

cd areaboi3
yarn watch
or
./dev.sh
```

\*\* Instalation to server

Actualy used this alternate path to solve issue with react-scripts

```
1.
cd areaboi3
yarn

2.
cd Admin/client
yarn
chmod +x node_modules/.bin/react-scripts
or You can try this too in the Admin/client package.json, you can change the build script to this
"build": "node ./node_modules/react-scripts/bin/react-scripts.js build")

3.
cd areaboi3
#./deploy.sh
or simply
yarn deploy
```

\*\* KNOWN ISSUES:

1. while develop with yarn watch if get internal server errors use yarn build && yarn serve to debug
2. On Major NextJS version upgrades remove all node_modules from src/app and src/functions
   and remove src/functions/next and do the stpes above for Instalation to Server

## BITBUCKET Reference

**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

_We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket._

---

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: _Delete this line to make a change to the README from Bitbucket._
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).
