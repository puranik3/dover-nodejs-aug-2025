const workshops = require( '../data/workshops.json' );

let nextId = 13;

const getWorkshops = ( req, res, next ) => {
    res.json( workshops );
};

const postWorkshop = ( req, res, next ) => {
    const newWorkshop = req.body;

    newWorkshop.id = nextId;
    ++nextId;
    workshops.push( newWorkshop );

    res.status( 201 ).json( newWorkshop );
};

module.exports = {
    getWorkshops,
    postWorkshop
};