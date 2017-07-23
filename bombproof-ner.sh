#!/bin/bash

# Full setup for NER service

# Release to download
versionName="stanford-ner-2017-06-09"

zipFile="$versionName.zip"

# Make sure we have dependencies
java8 -version || sudo yum install java-1.8.0-openjdk.x86_64 -y

# If we dont already hav a zipfile, download
test -f "$zipFile" || wget "https://nlp.stanford.edu/software/$zipFile"

# Always unzip from the archive
rm -rf "$versionName"
unzip "$zipFile"

# Write server script
serverScript="$versionName/ner-server.sh"
cat << EOF > $serverScript
#!/bin/sh
java8 -mx1000m -cp "$versionName/stanford-ner.jar:$versionName/lib/*" edu.stanford.nlp.ie.NERServer  -loadClassifier $versionName/classifiers/english.muc.7class.distsim.crf.ser.gz -port 44552 -outputFormat inlineXML
EOF

# Make executable 
chmod a+x $serverScript

# Start service
setsid ./$serverScript > bombproof.log 2>&1 < /dev/null &


