import fs from 'fs';
import path from 'path';
const sourcePath = path.join(import.meta.dirname, '../package.json');
const destinationPath = path.join(import.meta.dirname, '../build/package.json');
const licenseSourcePath = path.join(import.meta.dirname, '../LICENSE');
const licenseDestinationPath = path.join(import.meta.dirname, '../build/LICENSE');

/**
 * Copies package.json and LICENSE to the build directory, excluding devDependencies.
 * Exits the process if any step fails.
 */
function copyFiles() {
    if (!fs.existsSync(sourcePath)) {
        console.error('Source package.json does not exist.');
        process.exit(1);
    }
    const packageJsonFile = fs.readFileSync(sourcePath, 'utf8');
    if (!packageJsonFile) {
        console.error('Failed to read source package.json.');
        process.exit(1);
    }
    const data = JSON.parse(packageJsonFile);
    delete data.devDependencies;
    fs.writeFileSync(destinationPath, JSON.stringify(data, null, 2));
    fs.copyFileSync(licenseSourcePath, licenseDestinationPath);
    console.log('package.json and LICENSE copied successfully.');
}
// Execute the function
copyFiles();
