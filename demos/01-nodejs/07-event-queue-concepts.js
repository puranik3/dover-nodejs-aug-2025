setTimeout(
    () => { // f
        console.log( "1" );
    },
    0
);

// f is in the event queue -> the queue is NOT checked yet. It is checked only when the node JS runtime is free from the currently executing code

console.log( "2" ); // printed first

setTimeout(
    () => { // g
        console.log( "3" );
    },
    1000
);

// check the event queue
// [ f ]

// f is picked up and executed -> prints 1

// AFTER 1 second g gets into the event queue
// [ g ]

// g is picked up and executed -> prints 3