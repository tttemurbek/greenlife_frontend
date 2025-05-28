#!/bin/bash

# Pull latest changes
git reset --hard
git checkout master
git pull origin master

npm install -g yarn serve
yarn
yarn run build
pm2 start "yarn run start:prod" --name=GREENLIFE-REACT