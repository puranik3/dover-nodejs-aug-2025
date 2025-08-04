// readFile is preferred (it is asynchronous, i.e. non-blocking)
const { readFile, readFileSync } = require("node:fs");
const path = require("node:path");

// require("package.json"); // JSON files can be read using require()

console.log( __dirname );

const filepath = path.join( __dirname, "package.json" );
const options = { encoding: 'utf-8' };

// not good -> blocking function - CPU is unnecessarily blocked till the time the file is completely read
// gets the bytes by default

// uncomment and check
// try {
//     const contents = readFileSync( filepath, options );
//     console.log( contents );
// } catch( error ) {
//     console.log( error.message );
// }

// console.log( 'do something more in spite of error' );

// -- A better way to read file ---
readFile(
    filepath,
    options,
    // "callback function" -> this function is called when the file has been completely read
    (err, contents) => { // f
        if ( err ) {
            console.log( err.message );
            return;
        }

        console.log( '[1] file has been read' );
        console.log( contents );
    }
);

// Whenever the file is read, (err, contents, f) are queues in the "Event Queue"

console.log( '[2] line after the call to readFile()' );

// more code can follow... -> in instructor's computer it takes around 10 seconds
for ( let i = 0; i < 1e10; ++i ) {
    ;
}

console.log( '[3] end of script' );

// 1. function call stack is empty
// 2. Checks (polls) the event queue