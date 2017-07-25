require('dotenv-safe').load();

var childProcess = require('child_process');

console.log('Running ner-install.sh');
code = childProcess.execSync('bash deploy-bin/ner-install.sh');
