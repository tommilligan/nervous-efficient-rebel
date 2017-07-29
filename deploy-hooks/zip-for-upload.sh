#!/bin/bash

# Zip files into archive
git archive -o nervous-efficient-rebel.zip HEAD
# Make deployment folder
mkdir deploy
# Move zip into deployment folder
mv nervous-efficient-rebel.zip deploy/
