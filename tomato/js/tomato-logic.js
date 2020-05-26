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
        status: 'stop',

        convert: function (time) {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = '0' + seconds
            }

            return {
                minute: minutes,
                second: seconds
            };
        },

        startCount: function (func) {
            timer.status = 'run';
            return setInterval(function () {
                func(--timer.startTime)
            }, 1000);
        },

        stopCount: function (count) {
            timer.status = 'stop';
            clearInterval(count)
        },

        setTime: function (param) {
            var timeObj = timer.convert(param)
            jsControlTimeMin.textContent = timeObj.minute;
            jsControlTimeSec.textContent = timeObj.second;
        },


    };

jsControlModeItem.forEach(function (elem) {
    elem.addEventListener('click', function () {
        timer.stopCount(interval)
        timer.startTime = +this.getAttribute('data-value');
        timer.setTime(timer.startTime)
    });
});

jsControlPanelItemStart.addEventListener('click', function () {
    if (timer.status === 'run') return false;
    interval = timer.startCount(timer.setTime)
});

jsControlTimeButton.forEach(function (elem) {
    elem.addEventListener('click', function () {
        var sign = this.getAttribute('data-sign') + 60;
        timer.startTime += +sign;
        timer.setTime(+timer.startTime)
    });
});

jsControlPanelItemPause.addEventListener('click', function () {
    timer.stopCount(interval)
});

jsControlPanelItemReset.addEventListener('click', function () {
    timer.stopCount(interval)
    timer.startTime = 1500;
    timer.setTime(timer.startTime)
});