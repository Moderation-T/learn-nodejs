#!/bin/sh
cd /Users/tangyiping/Desktop/project/learn/nodejs-blog/server-origin/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
