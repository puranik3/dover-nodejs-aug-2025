require( 'dotenv' ).config();
// console.log( process.env ); // holds environment variables

// add this...
require( './data/init' );

const express = require( 'express' );

const app = express(); // Express Application object

app.get( '/', ( req, res ) => {
    res.write( 'This is the workshops app. It serves details of workshops happening nearby.' );
    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen( PORT );