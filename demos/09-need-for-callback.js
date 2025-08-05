// asynchronous operations need callback functions for doing something after the operation that is started completes
function sum( x, y, callback ) {
    // Hey Node JS, execute f AFTER 3 seconds
    setTimeout(
        function() { // f
            // return x + y;
            callback( x + y );
        },
        3000
    );

    // ...
    // return undefined;
}

// console.log(
    sum(
        12,
        13,
        ( result ) => {
            console.log( 'result = ', result );
        }
    )
// );