const express = require( 'express' );
const workshops = require( '../data/workshops.json' );

let nextId = 13;

const router = express.Router();

router.route( '/' )
    .get(( req, res, next ) => {
        res.json( workshops );
    })
    .post(( req, res, next ) => {
        const newWorkshop = req.body;

        newWorkshop.id = nextId;
        ++nextId;
        workshops.push( newWorkshop );

        res.status( 201 ).json( newWorkshop );
    });

module.exports = router;