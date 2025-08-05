// pipe is a way to join a read stream (source) to a write stream (destination)
const { pipe, createReadStream, createWriteStream } = require( 'fs' );
const path = require( 'node:path' );

const srcFile = path.join( __dirname, "grokking-algorithms.pdf" );
const destFile = path.join( __dirname, "grokking-algorithms-copy.pdf" );

const rs = createReadStream( srcFile /*, options */  );
const ws = createWriteStream( destFile/*, options */  );

rs.pipe( ws );

// fired once if error occurs, or never
rs.on( 'error', (error) => {
    console.log( error.message );
});

ws.on( 'error', (error) => {
    console.log( error.message );
});