// const workshops = require( '../data/workshops.json' );
const services = require( '../services/workshops.service' );
const sessionServices = require( '../services/sessions.service' );

// let nextId = 13;

// http://localhost:3000/api/workshops
// http://localhost:3000/api/workshops?page=1&sort=name&category=frontend
const getWorkshops = async ( req, res, next ) => {
    let { page, sort : sortField, category } = req.query;

    if( page ) {
        page = +page;
    } else {
        page = 1;
    }

    const data = await services.getAllWorkshops(page, sortField, category);

    res.json({
        status: 'success',
        // data: data
        data
    });
};

const postWorkshop = async ( req, res, next ) => {
    const newWorkshop = req.body;

    // Check if body is sent and not empty
    if (!newWorkshop || Object.keys(newWorkshop).length === 0) {
        const err = new Error('The request body is empty. Workshop object expected.');
        err.status = 400;
        throw err;
    }

    try {
        const updatedWorkshop = await services.addWorkshop( newWorkshop );
        res.status(201).json({
            status: 'success',
            data: updatedWorkshop
        });
    } catch( error ) {
        error.status = 400;
        throw error;
    }
};

// http://localhost:3000/api/workshops/:id
// http://localhost:3000/api/workshops/:id?embed=sessions
const getWorkshopById = async ( req, res ) => {
    const id = req.params.id;
    const embedSessions = req.query.embed === 'sessions';

    try {
        const workshop = await services.getWorkshopById( id, embedSessions );

        res.json({
            status: 'success',
            data: workshop
        });
    } catch( error ) {
        error.status = 404;
        throw error;
    }
};

// @todo - Proper handling of error response status codes (400 vs 404)
const patchWorkshop = async ( req, res ) => {
    const id = req.params.id;

    const workshop = req.body;

    // if workshop = req.body -> {}
    if( Object.keys( workshop ).length === 0 ) {
        const err = new Error('The request body is empty. A partial Workshop object expected.');
        err.status = 400;
        throw err;
    }

    try {
        const updatedWorkshop = await services.updateWorkshop( id, workshop );
        res.json({
            status: 'success',
            data: updatedWorkshop
        });
    } catch( error ) {
        const err = new Error( error.message );
        err.status = 404;
        throw err;
    }
};

const deleteWorkshop = async ( req, res ) => {
    const id = req.params.id;

    try {
        await services.deleteWorkshop( id );
        // 204 -> use this status code for successful operation but you do not want to send any data in response (as in res.status(204).end())
        res.json({
            status: 'success'
        });
    } catch( error ) {
        error.status = 404;
        throw error;
    }
};

// http://localhost:3000/api/workshops/62ed07b0437f58e437c01f57/speakers
// body -> [
//     "Ross Taylor",
//     "Reid n Taylor"
// ]
const addSpeakers = async ( req, res ) => {
    const id = req.params.id;
    const speakers = req.body;

    if( !( speakers instanceof Array ) || speakers.length === 0 ) {
        const error = new Error( "Speakers must be a non-empty array. Data is missing or formed incorrectly" );
        error.status = 400;
        throw error;
    }

    try {
        const updatedWorkshop = await services.addSpeakers( id, speakers );
        res.json({
            status: 'success',
            data: updatedWorkshop
        });
    } catch( error ) {
        error.status = 404;
        throw error;
    }
};

const postSession = async ( req, res ) => {
    const workshopId = req.params.id;

    const session = {
        // workshopId: workshopId,
        workshopId,
        ...req.body
    };

    try {
        let newSession = await sessionServices.addSession( session );

        res.status( 201 ).json({
            status: 'success',
            data: newSession
        });
    } catch( error ) {
        error.status = 400;
        throw error;
    }
};

// Sample: http://localhost:3000/api/workshops/62ed150ad0d302eca77f0f38/sessions
const getSessions = async ( req, res ) => {
    const workshopId = req.params.id;

    try {
        const sessions = await sessionServices.getSessions( workshopId );
        res.json({
            status: 'success',
            data: sessions
        });
    } catch( error ) {
        if( error.type === 'CastError' ) {
            error.status = 400;
            throw error;
        } else if( error.type === 'NotFound' ) {
            error.status = 404;
            throw error;
        }
    }
};

module.exports = {
    getWorkshops,
    postWorkshop,
    getWorkshopById,
    patchWorkshop,
    deleteWorkshop,
    addSpeakers,
    postSession,
    getSessions
};