import { execSync } from  'child_process';
const version = process.argv.at(2); 

if (!version) {
  throw new Error('Missing version !');
}

execSync(`chan release ${version}`);
execSync(`git add .`);
execSync(`npm version ${version} --force`);
execSync('git push');
execSync('git push --tags');