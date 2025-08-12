const express = require( 'express' );
const controllers = require( '../controllers/sessions.controller' );

const router = express.Router();

router.route('/')
    .post( controllers.postSession );

module.exports = router;