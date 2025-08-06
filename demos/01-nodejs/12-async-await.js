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

// EXERCISE: async functions return promise as well
const calculateSums = async () => {
    try {
        console.log( 1, "starting operation 1" );
        const result1 = await sum( 12, 13 ); // I calculateSums, am willing to give up control!
        console.log( "result1 = ", result1 );

        console.log( 2, "starting operation 2" );
        const result2 = await sum( result1, 14 ); // I calculateSums, am willing to give up control!
        console.log( "result2 = ", result2 );

        console.log( 3, "starting operation 3" );
        const result3 = await sum( result2, 15 );  // I calculateSums, am willing to give up control!
        console.log( "result3 = ", result3 );

        return result3; // EXERCISE: Explore how to use this returned value
    } catch( error ) {
        console.log( error.message );
    }

    console.log( 4, "finished calculateSums" );
};

calculateSums();

console.log( 5, "end of script" );