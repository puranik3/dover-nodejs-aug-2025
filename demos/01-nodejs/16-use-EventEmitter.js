const ee = require( './16-EventEmitter' );

ee.on( 'tick', (seconds) => {
    console.log( `1 second has passed. total seconds passed is ${seconds}` );
});