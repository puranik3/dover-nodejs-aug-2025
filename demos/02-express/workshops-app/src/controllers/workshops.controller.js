// const workshops = require( '../data/workshops.json' );
const services = require( '../services/workshops.service' );

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

const getWorkshopById = async ( req, res ) => {
    const id = req.params.id;

    try {
        const workshop = await services.getWorkshopById( id );

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

module.exports = {
    getWorkshops,
    postWorkshop,
    getWorkshopById,
    patchWorkshop
};