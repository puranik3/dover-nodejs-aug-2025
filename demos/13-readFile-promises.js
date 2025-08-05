const { readFile } = require("node:fs/promises");
const path = require("node:path");

const filepathPackage = path.join( __dirname, "package.json" );
const filepathPackageLock = path.join( __dirname, "package-lock.json" );

const options = { encoding: 'utf-8' };

const readPackageFiles = async () => {
    let contents = await readFile(filepathPackage, options); // I, readPackageFiles, am willing to give up control!
    const package = JSON.parse( contents ); // convert from string to a JS object

    const devDepsWithVersions =  package.devDependencies; // { nodemon: '^3.1.10' }
    const devDeps = Object.keys( devDepsWithVersions ); // [ 'nodemon', ... ]

    contents = await readFile(filepathPackageLock, options); // I, readPackageFiles, am willing to give up control!
    const packageLock = JSON.parse( contents );

    for ( let i = 0; i < devDeps.length; ++i ) {
        console.log( devDeps[i], packageLock.packages["node_modules/" + devDeps[i]].version );
    }
};

readPackageFiles();