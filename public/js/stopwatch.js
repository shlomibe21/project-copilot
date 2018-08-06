'use strict'

let state;
let initTime;
let time;
let date;
let pausedTime;

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

    if (state === 'running') {
        // get current date and convert it into 
        // timestamp for calculations
        loopDate = new Date();
        loopTime = loopDate.getTime();
        // calculate time difference between
        // initial and current timestamp
        timeDif = loopTime - initTime;
        if (timeDif > 0) {
            ms = parseInt((timeDif % 1000) / 10);
            seconds = parseInt((timeDif / 1000) % 60);
            minutes = parseInt((timeDif / (1000 * 60)) % 60);
            hours = parseInt((timeDif / (1000 * 60 * 60)) % 24);
        }

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

function startTimerClicked() {
    $('.js-stopwatch').on('click', '#sw_start', function (event) {
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
        state = 'running';
        $('#sw_status').html('Running');

        // start loop
        loopTimer();
    });
}

function stopTimerClicked() {
    $('.js-stopwatch').on('click', '#sw_stop', function (event) {
        // change button value
        $('#sw_start').val('Restart');
        // set state
        state = 'stop';
        $('#sw_status').html('Stopped');
    });
}

function pasueTimerClicked() {
    $('.js-stopwatch').on('click', '#sw_pause', function (event) {
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
}

function resetTimerClicked() {
    $('.js-stopwatch').on('click', '#sw_reset', function (event) {
        // reset display
        $('#sw_ms, #sw_s, #sw_m, #sw_h').html('00');

        // change button value
        $('#sw_start').val('Start');

        // set state
        state = 'reset';
        $('#sw_status').html('Reset');
    });
}

function displayTimer() {
    let template = `
    <section role=region class=stopwatch-content>
            <legend>Stopwatch - 
                <span id="sw_status">Idle</span>
            </legend>
            <div class="stopwatch-time">
                <span id="sw_h" class="sw-number">00</span>:
                <span id="sw_m" class="sw-number">00</span>:
                <span id="sw_s" class="sw-number">00</span>:
                <span id="sw_ms" class="sw-number">00</span>
            </div>
            <div>
                <input type="button" value="Start" id="sw_start"/>
                <input type="button" value="Pause" id="sw_pause"/>
                <input type="button" value="Stop" id="sw_stop"/>
                <input type="button" value="Reset" id="sw_reset"/>
            </div>
        </section>
    `;

    $('.js-stopwatch').html(template);
}

function handleTimer() {
    startTimerClicked();
    stopTimerClicked();
    pasueTimerClicked();
    resetTimerClicked();
    //displayTimer();
}

$(handleTimer);