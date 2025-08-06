console.log( '*** [1] started executing the arithmetic module ***' );
// private to the module since it is not exported
const sum = ( x, y ) => {
    console.log( 'sum called' );
    return x + y;
};

/*export */const diff = ( x, y ) => {
    console.log( 'diff called' );
    return sum( x,  -y );
};

const multiply = ( x, y ) => {
    console.log( 'multiply called' );
    return x * y;
};

const PI = 3.14;

export default PI;

// Whatever is the value of module.exports is what is available to files importing this file
// module.exports = diff;
// or this...
module.exports = {
    // diff: diff
    diff,
    multiply,
    PI
};

// we keep `sum` private
// export {
//     diff,
//     multiply
// }

console.log( '*** [2] completed executing the arithmetic module ***' );