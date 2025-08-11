require( 'dotenv' ).config();
// console.log( process.env ); // holds environment variables

require( './data/init' );
const indexRouter = require( './routes/index.route' );
const workshopsRouter = require( './routes/workshops.route' );

const express = require( 'express' );

const app = express(); // Express Application object

app.use(
    ( req, res, next ) => {
        console.log( 'middleware 1 called' );
        const requestDate = new Date();

        next(); // now Express knows we are done processing the request

        console.log( 'middleware 1 after call to next' );
        const responseDate = new Date();

        console.log( 'Time for processing (in ms) = ', responseDate.getTime() - requestDate.getTime() );
    }
);

// configure application to read JSON data in incoming requests and set it up on req.body
app.use( express.json() );

// app.use( middleware ); // routers are middleware
app.use( indexRouter );
app.use( '/api/workshops', workshopsRouter );

// resource not found middleware
app.use(( req, res, next ) => {
    const err = new Error( 'Resource not found' );
    err.status = 404;
    next( err ); // controls skips the following middleware and goes directly to the global error handler midlleware
});

// this is skipped as the previous middleware called next with an error object passed as argument
app.use(
    ( req, res, next ) => {
        console.log( 'some middleware' );
        next();
    }
)

// global error handler middleware
app.use(( err, req, res, next ) => { // a middleware with 4 arguments is an "Error handler middleware"
    const status = err.status || 500;
    res.status( status ).json({
        status: 'error',
        message: err.message
    });
    // next(); // not a good idea to call next when a response is also sent
});

const PORT = process.env.PORT || 3000;
app.listen( PORT );