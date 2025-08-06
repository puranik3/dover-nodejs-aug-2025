const { EventEmitter } = require("node:events");

const ee = new EventEmitter()

const startTime = new Date();

setInterval(
    () => {
        const currentTime = new Date();

        const seconds = ( currentTime.getTime() - startTime.getTime() ) / 1000;

        ee.emit('tick', seconds );
    },
    1000
);

module.exports = ee;