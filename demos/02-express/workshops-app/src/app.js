require( 'dotenv' ).config();
// console.log( process.env ); // holds environment variables

require( './data/init' );
const indexRouter = require( './routes/index.route' );

const express = require( 'express' );

const app = express(); // Express Application object

// app.use( middleware ); // routers are middleware
app.use( indexRouter );

const PORT = process.env.PORT || 3000;
app.listen( PORT );