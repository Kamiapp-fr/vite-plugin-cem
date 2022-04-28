const { execSync } = require('child_process');
const version = process.argv.at(2); 

if (!version) {
  throw new Error('Missing version !');
}

execSync(`chan release ${version}`);
execSync(`npm version ${version}`);
execSync('git push --tags');