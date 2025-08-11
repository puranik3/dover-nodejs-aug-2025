// you need to move the controller functions here, export them, and use in index.route.js file

const getIndex = ( req, res ) => {
    res.write( 'This is the workshops app. It serves details of workshops happening nearby.' );
    res.end();
};

const getHome = ( req, res ) => {
    // tell the browser to make request to / instead. On receiving this response, the browser makes a new request to /
    res.redirect( '/' );
};

module.exports = {
    getIndex,
    getHome
};