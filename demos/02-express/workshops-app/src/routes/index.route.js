const express = require( 'express' );
const controllers = require( '../controllers/index.controller' );

const router = express.Router();

// setting up the routes
router.get( '/', controllers.getIndex );
router.get( '/home', controllers.getHome);

module.exports = router;