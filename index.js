const execSync = require('child_process').execSync;

console.log('Running ner-install');
code = execSync('bash ner-install.sh');
