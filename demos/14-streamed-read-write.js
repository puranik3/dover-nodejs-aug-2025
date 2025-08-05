// Streamed reading / writing is useful hen working with large files - eg. video files
// These methods are based on EventEmitter (another way of communicating the result of an operations, eg. contents of a file that is read)
const { createReadStream, createWriteStream } = require( 'fs' );
const path = require( 'node:path' );

const filepathPackage = path.join( __dirname, "grokking-algorithms.pdf" );

// const options = { encoding: 'utf-8' };

// read stream (rs) is returned
// When a chunk is read (generally ~64 KB by default), an event is emitted
const rs = createReadStream( filepathPackage /*, options */  );

let counter = 1;

// Important Events for file read operation: 'data', 'end', 'error'

// 'data' event is emitted when a chunk is read (fired many times)
rs.on( 'data', (chunk) => {
    console.log( 'Chunk #' + counter );
    console.log( chunk );
    ++counter;
});

// 'end' even is emitted when file has been completely read (fired once)
rs.on( 'end', () => {
    console.log( 'File has been read' );
});

// fired once if error ocuurs, or never
rs.on( 'error', (error) => {
    console.log( error.message );
});

// 64 KB = 2^6 KB
// 26 MB = 26 x 2^10
// number of chunks = 26 x 2^10 / 2^6 = 16 x 26 = 406