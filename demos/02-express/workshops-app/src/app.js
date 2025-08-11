require( 'dotenv' ).config();
// console.log( process.env ); // holds environment variables

require( './data/init' );
const indexRouter = require( './routes/index.route' );
const workshopsRouter = require( './routes/workshops.route' );

const express = require( 'express' );

const app = express(); // Express Application object

// configure application to read JSON data in incoming requests and set it up on req.body
app.use( express.json() );

// app.use( middleware ); // routers are middleware
app.use( indexRouter );
app.use( workshopsRouter );

const PORT = process.env.PORT || 3000;
app.listen( PORT );