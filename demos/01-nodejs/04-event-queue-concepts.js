// setTimeout(
//     () => {
//         // code to dismiss the alert message
//     },
//     5000 // milliseconds
// );


// setTimeout requests Node JS (runtime) to execute f AFTER 2 seconds. And Node JS executes this on the "main thread".
// IMPORTANT: non-blocking - so it returns immediately
setTimeout(
    () => { // f
        console.log( "1" );
    },
    2000
);

console.log( "2" );