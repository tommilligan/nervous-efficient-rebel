#!/bin/bash

# Zip files into archive
zip -r nervous-efficient-rebel *
# Make deployment folder
mkdir deploy
# Move zip into deployment folder
mv nervous-efficient-rebel.zip deploy/
