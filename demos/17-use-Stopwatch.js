const Stopwatch = require( "./17-Stopwatch" );

const sw = new Stopwatch();

sw.start();

sw.on( 'tick', ( seconds ) => {
    console.log( seconds );
});