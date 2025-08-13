const express = require( 'express' );
const controllers = require( '../controllers/workshops.controller' );
const { authenticate, authorize } = require( '../middleware/auth' );

const router = express.Router();

router.route( '/' )
    .get( controllers.getWorkshops )
    .post( authenticate, authorize( [ 'admin' ] ), controllers.postWorkshop );

router.route( '/:id' )
    .get( controllers.getWorkshopById )
    .patch( controllers.patchWorkshop )
    .delete( controllers.deleteWorkshop );

router.route( '/:id/speakers' )
    .patch( controllers.addSpeakers );

router.route( '/:id/sessions' )
     .get( controllers.getSessions )
     .post( controllers.postSession );

module.exports = router;