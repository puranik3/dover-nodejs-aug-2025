const { createServer } = require( 'node:http' );
const { createReadStream } = require( 'node:fs' );
const { join } = require( 'node:path' );
const URL = require( 'url' );

// file paths
const options = { encoding : 'utf-8' };

const pages = {
    home: join( __dirname, 'home.html' ),
    about: join( __dirname, 'about.html' ),
    contact: join( __dirname, 'contact.html' )
};

const server = createServer();

server.on( 'request',  ( req, res ) => {
    const { query, pathname } = URL.parse( req.url, true );

    const url = pathname.substring(1);

    console.log( url );

    if ( url === 'add' ) {
        console.log( url );

        if ( query.x && query.y ) {
            console.log( 'x amd y sent' );

            res.end( +query.x + +query.y + "" );
            return;
        } else {
            res.statusCode = 400;
            res.end( "Bad request" );
            return;
        }
    }

    filename = url;

    if ( url === '' ) {
        filename = 'home'
    } else if ( !Object.keys( pages ).includes( url )  ) {
        res.statusCode = 404;
        res.end( "Not found" );
        return;
    }

    const rs = createReadStream( pages[filename], options );
    rs.pipe( res );
});

server.on( 'listening', () => {
    console.log( `Server is running on http://localhost:3000` );
});

server.listen( 3000 );