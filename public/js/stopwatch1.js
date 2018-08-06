'use strict'

let state;
let initTime;
let time;
let date;
let pausedTime;

$(document).ready(function () {
    function formatTimer(unit, unitType) {
        if ((unitType === 'ms') && (unit > 99)) {
            unit = "0" + unit;
        }
        else {
            if (unit < 10) {
                unit = '0' + unit;
            }
        }

        return unit;
    }

    function loopTimer() {
        let timeDif;
        let loopDate;
        let loopTime;
        let ms = 0;
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        if (state === 'alive') {
            // get current date and convert it into 
            // timestamp for calculations
            loopDate = new Date();
            loopTime = loopDate.getTime();
            // calculate time difference between
            // initial and current timestamp
            timeDif = loopTime - initTime;

            ms = parseInt((timeDif % 1000) / 10);
            seconds = parseInt((timeDif / 1000) % 60);
            minutes = parseInt((timeDif / (1000 * 60)) % 60);
            hours = parseInt((timeDif / (1000 * 60 * 60)) % 24);

            // update display
            $('#sw_ms').html(formatTimer(ms, 'ms'));
            $('#sw_s').html(formatTimer(seconds, 'seconds'));
            $('#sw_m').html(formatTimer(minutes, 'seconds'));
            $('#sw_h').html(formatTimer(hours, 'seconds'));

            // loop
            time = setTimeout(loopTimer, 1);

        } else {
            // kill loop
            clearTimeout(time);
            return true;
        }
    }

    $('#sw_start').on('click', function (event) {
        let a;

        // get current date
        date = new Date();

        switch (state) {
            case 'pause':
                // resume timer
                // get current timestamp (for calculations) and
                // substract time difference between pause and now
                initTime = date.getTime() - pausedTime;
                break;
            default:
                // get current timestamp (for calculations)
                initTime = date.getTime();
                break;
        }

        // reset state
        state = 'alive';
        $('#sw_status').html('Running');

        // start loop
        loopTimer();
    });

    $('#sw_stop,#cd_stop').on('click', function (event) {
        // change button value
        $('#sw_start').val('Restart');
        // set state
        state = 'stop';
        $('#sw_status').html('Stopped');
    });

    $('#sw_reset,#cd_reset').on('click', function () {
        // reset display
        $('#sw_ms, #sw_s, #sw_m, #sw_h').html('00');

        // change button value
        $('#sw_start').val('Start');

        // set state
        state = 'reset';
        $('#sw_status').html('Reset');
    });

    $('#sw_pause,#cd_pause').on('click', function () {
        // save timestamp of pause
        let currentDate = new Date();
        let currentTime = currentDate.getTime();

        // save elapsed time (until pause)
        pausedTime = currentTime - initTime;

        // change button value
        $('#sw_start').val('Resume');

        // set state
        state = 'pause';
        $('#sw_status').html('Paused');
    });
});