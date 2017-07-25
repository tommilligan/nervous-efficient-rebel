#!/bin/bash

# Go to deployment directory
cd /home/ec2-user/ner/deploy
# Copy environment files
cp ../.env* .
# Run install
node install.js
