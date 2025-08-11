const express = require( 'express' );
const controllers = require( '../controllers/workshops.controller' );

let nextId = 13;

const router = express.Router();

router.route( '/' )
    .get( controllers.getWorkshops )
    .post( controllers.postWorkshop );

module.exports = router;