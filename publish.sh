#!/bin/bash

node scripts/publish.js 
git add -A .
timestamp=$(date '+%Y-%m-%d-%H-%M')
git commit -m "build $timestamp"
git push origin master