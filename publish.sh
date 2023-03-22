#!/bin/bash

cp ../idxp-camera-app/build/*.js build/
cp -fr ../idxp-camera-app/build/advanced  build/
cp -fr ../idxp-camera-app/build/advanced-threads  build/

node scripts/publish.js 
git add -A .
cp 
timestamp=$(date '+%Y-%m-%d-%H-%M')
git commit -m "build $timestamp"
git push origin master