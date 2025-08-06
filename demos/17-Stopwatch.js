const { EventEmitter } = require("node:events");

class Stopwatch extends EventEmitter {
    startTime = 0;
    id = 0;

    start() {
        this.startTime = new Date();

        this.id = setInterval(
            () => { // interval function
                const currentTime = new Date();

                const seconds = ( currentTime.getTime() - this.startTime.getTime() ) / 1000;

                this.emit('tick', seconds );
            },
            1000
        );
    }

    // EXERCISE
    // Implement a stop method, which emits a 'stop' event, and passes the data as the total time elapsed. It should stop the interval function from executing further, and set the startTime back to 0.
    stop() {
        const currentTime = new Date();
        const seconds = ( currentTime.getTime() - this.startTime.getTime() ) / 1000;

        clearInterval( this.id );

        this.emit( 'stop', seconds );
    }
}

module.exports = Stopwatch;