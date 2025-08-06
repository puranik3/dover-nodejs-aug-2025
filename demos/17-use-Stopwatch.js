const Stopwatch = require( "./17-Stopwatch" );

const sw = new Stopwatch();

sw.start();

sw.on( 'tick', ( seconds ) => {
    console.log( seconds );
});

// write code to listen for stop event and set up the listener with on()
// your code...

// call stop() to stop the stopwatch
// your code...