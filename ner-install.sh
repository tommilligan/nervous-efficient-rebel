#!/bin/bash

# Full setup for NER service

# Release to download
versionName="stanford-ner-2017-06-09"
zipFile="$versionName.zip"


# Get NER source
# If we dont already hav a zipfile, download
test -f "$zipFile"
if [ $? -eq 0 ]; then
    printf "Using existing NER zipfile $zipfile\n"
else
    printf "Fetching NER zipfile\n"
    wget "https://nlp.stanford.edu/software/$zipFile"
fi
# Always unzip from the archive
rm -rf "$versionName"
unzip "$zipFile"


# Make sure we have Java 8
# is default java version 8
executable="java8"
java -version 2>&1 | awk '/version/{print $NF}' | grep '"1.8.'
if [ $? -eq 0 ]; then
    printf "Default java is java8\n"
    executable="java"
else
    # or is java8 installed
    java8 -version
    if [ $? -eq 0 ]; then
        printf "java8 found\n"
    else
        printf "need java8\n"
        sudo yum install java-1.8.0-openjdk.x86_64 -y
    fi
fi
printf "Using java executable '$executable'\n"


# Write server script
serverScript="$versionName/ner-server.sh"
printf "Writing server script to $serverScript\n"
cat << EOF > $serverScript
#!/bin/sh
$executable -mx1000m -cp "$versionName/stanford-ner.jar:$versionName/lib/*" edu.stanford.nlp.ie.NERServer  -loadClassifier $versionName/classifiers/english.muc.7class.distsim.crf.ser.gz -port 44552 -outputFormat inlineXML
EOF

# Make executable 
chmod a+x $serverScript

