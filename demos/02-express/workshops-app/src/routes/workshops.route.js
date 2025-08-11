const express = require( 'express' );
const workshops = require( '../data/workshops.json' );

let nextId = 13;

const router = express.Router();

router.get( '/workshops', ( req, res ) => {
    res.json( workshops );
});

// router.post( '/workshops', ( req, res ) => {
//     const body = req.body;
//     // send the response and set the 'Content-Type' : 'text/html'
//     // res.send('Hello Postman');
//     res.json( body );
// });

router.post( '/workshops', ( req, res ) => {
    const newWorkshop = req.body;

    newWorkshop.id = nextId;
    ++nextId;
    workshops.push( newWorkshop );

    res.status( 201 ).json( newWorkshop );
});

module.exports = router;