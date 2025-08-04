const { createServer } = require("node:http");
// import { createServer } from 'node:http';

// http.createServer

const server = createServer(
    // whenever a request comes this function executes
    ( req, res ) => {
        console.log('new request is being processed');
        res.write("Hello from Node JS and Express");
        res.end( "That's all folks!" );
    }
);

server.listen( 3000 );