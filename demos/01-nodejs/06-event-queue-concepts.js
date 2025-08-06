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
    1000
);

// g is queued into the Event Queue only AFTER 1 second from the start of the script
// f is queued into the Event Queue only AFTER 2 seconds from start of the script
// Event queue is checked repeatedly (forever)

// 2 (one second) 3 (one second) 1