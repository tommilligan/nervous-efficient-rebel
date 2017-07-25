#!/bin/bash

rootFolder="../"

# Zip files into archive
zip -r "$rootFolder/deploy" "$rootFolder/*" "$rootFolder/.env.example"
# Make deployment folder
mkdir "$rootFolder/deploy"
# Move zip into deployment folder
mv "$rootFolder/deploy.zip" "$rootFolder/deploy/"
