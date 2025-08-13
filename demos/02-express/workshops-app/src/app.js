require( 'dotenv' ).config();
// console.log( process.env ); // holds environment variables

require( './data/init' );
const indexRouter = require( './routes/index.route' );
const workshopsRouter = require( './routes/workshops.route' );
const sessionsRouter = require( './routes/sessions.route' );
const usersRouter = require( './routes/users.route' );

const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require('cors');
const helmet = require('helmet');
const { notFoundHandler, errorHandler } = require( './middleware/errors' );
const limiter = require( './middleware/limiter' );

const app = express(); // Express Application object

app.use( morgan( 'combined' ) );
app.use( helmet() );
app.use(limiter);
app.use( cors() ); // NOT Good - Better to specify domain, methods allowed etc.

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
app.use( '/api/auth', usersRouter );
app.use( '/api/workshops', workshopsRouter );
app.use( '/api/sessions', sessionsRouter );

// resource not found middleware
app.use( notFoundHandler );

// this is skipped as the previous middleware called next with an error object passed as argument
// app.use(
//     ( req, res, next ) => {
//         console.log( 'some middleware' );
//         next();
//     }
// )

// global error handler middleware
app.use( errorHandler );

const PORT = process.env.PORT || 3000;
app.listen( PORT );