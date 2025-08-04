setTimeout(
    () => { // f
        console.log( "1" );
    },
    2000
);

console.log( "2" );

setTimeout(
    () => { // g
        console.log( "3" );
    },
    2000
);

// f, g are queued into the Event Queue only AFTER 2 seconds
// Event queue is checked repeatedly (forever)