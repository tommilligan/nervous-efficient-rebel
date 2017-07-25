#!/bin/bash

cd /home/ec2-user/ner/deploy
cp ../.env* .
yarn install
node index.js
