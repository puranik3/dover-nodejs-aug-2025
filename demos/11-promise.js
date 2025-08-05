function sum( x, y ) {
    return new Promise(
        ( resolve, reject ) => {
            setTimeout(
                () => {
                    if ( typeof x !== 'number' || typeof y !== 'number' ) {
                        reject( new Error( 'At least one argument was not a number' ) );
                        return;
                    }

                    // We communicate to the Promise object, the result
                    resolve( x + y );
                },
                3000
            );
        }
    );
}

// Hey Promise! When you get the result, call the function passed to then()
sum( 12, 13 )
    .then( // called only in case of success
        ( result1 ) => {
            console.log( "result1 = ", result1 );

            // sum( result1, 14 )
            //     .then(
            //         ( result2 ) => {
            //             console.log( "result2 = ", result2 );
            //         }
            //     );

            return sum( result1, 14 );
        }
    )
    .then(
        ( result2 ) => {
            console.log( "result2 = ", result2 );

            return sum( result2, '15' );
        }
    )
    .then(
        ( result3 ) => {
            console.log( "result3 = ", result3 );
        }
    )
    .catch( // called only in case of error
        ( error ) => {
            console.log( error.message );
        }
    )

console.log( 'end of script' );