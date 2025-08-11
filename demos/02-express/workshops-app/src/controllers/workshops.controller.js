// const workshops = require( '../data/workshops.json' );
const services = require( '../services/workshops.service' );

// let nextId = 13;

const getWorkshops = async ( req, res, next ) => {
    const workshops = await services.getAllWorkshops();

    res.json({
        status: 'success',
        data: workshops
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

module.exports = {
    getWorkshops,
    postWorkshop
};