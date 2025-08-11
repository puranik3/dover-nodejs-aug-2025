const express = require( 'express' );
const workshops = require( '../data/workshops.json' );

const router = express.Router();

router.get( '/workshops', ( req, res ) => {
    res.json( workshops );
});

module.exports = router;