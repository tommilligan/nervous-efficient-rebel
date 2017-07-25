#!/bin/bash

# Zip files into archive
zip -r deploy * .env.example
# Make deployment folder
mkdir deploy
# Move zip into deployment folder
mv deploy.zip deploy/
