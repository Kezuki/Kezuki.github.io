const jsControlModeItem = document.querySelectorAll('.jsControlModeItem');
const jsControlTimeMin = document.querySelector('.jsControlTimeMin');
const jsControlTimeSec = document.querySelector('.jsControlTimeSec');
const jsControlTimeButton = document.querySelectorAll('.jsControlTimeButton');
const jsControlPanelItemStart = document.querySelector('.jsControlPanelItemStart');
const jsControlPanelItemReset = document.querySelector('.jsControlPanelItemReset');
const jsControlPanelItemPause = document.querySelector('.jsControlPanelItemPause');

let interval,
    timer = {
        startTime: 1500,
        currentTime: 1500,
        status: 'stop',

        convert: function (time) {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return {
                minute: minutes,
                second: seconds
            };
        },

        startCount: function (func) {
            timer.status = 'run';
            return setInterval(function () {
                func(--timer.currentTime);
            }, 1000);
        },

        stopCount: function (count) {
            timer.status = 'stop';
            clearInterval(count);
        },

        setTime: function (param) {
            let timeObj = timer.convert(param);
            jsControlTimeMin.textContent = timeObj.minute;
            jsControlTimeSec.textContent = timeObj.second;
        },


    };

jsControlModeItem.forEach(function (elem) {
    elem.addEventListener('click', function () {
        timer.stopCount(interval);
        let attr = Number(this.getAttribute('data-value'));
        timer.startTime = attr;
        timer.setTime(timer.currentTime = attr)
    });
});

jsControlPanelItemStart.addEventListener('click', function () {
    if (timer.status === 'run') return false;
    interval = timer.startCount(timer.setTime);
});

jsControlTimeButton.forEach(function (elem) {
    elem.addEventListener('click', function () {
        let sign = Number(this.getAttribute('data-sign') + 60);
        timer.setTime(timer.currentTime += sign);
    });
});

jsControlPanelItemPause.addEventListener('click', function () {
    timer.stopCount(interval);
});

jsControlPanelItemReset.addEventListener('click', function () {
    timer.stopCount(interval);
    timer.setTime(timer.currentTime = timer.startTime);
});