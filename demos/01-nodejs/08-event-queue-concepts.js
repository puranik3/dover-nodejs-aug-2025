setTimeout(
    () => { // f
        console.log( "1" );

        setTimeout(
            () => { // h will queued after 1 second
                console.log( "4" );
            },
            1000
        );
    },
    0
);

// Event queue: [ f ]

console.log( "2" ); // prints 2 immediately

setTimeout(
    () => { // g will be queued after 1 second
        console.log( "3" );
    },
    1000
);

// Event queue: [ f ]

// f() -> print 1 (console log "2 1") - setTimeout(h, 1000) will be called now
// Therefore g() is queued before h()

