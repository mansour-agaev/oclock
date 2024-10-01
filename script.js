// Affichage de l'horloge
function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours() + 2).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);

// Minuteur
let timerInterval;
let timerTime = 0;

document.getElementById('start-timer').addEventListener('click', () => {
    const inputTime = parseInt(document.getElementById('timer-input').value);
    if (!isNaN(inputTime) && inputTime > 0) {
        timerTime = inputTime;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                document.getElementById('timer-display').textContent = new Date(timerTime * 1000).toISOString().substr(14, 5);
            } else {
                clearInterval(timerInterval);
                alert('Le temps est écoulé !');
            }
        }, 1000);
    }
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    document.getElementById('timer-display').textContent = '00:00';
});

// Chronomètre
let stopwatchInterval;
let stopwatchTime = 0;
let running = false;

document.getElementById('start-stopwatch').addEventListener('click', () => {
    if (running) {
        clearInterval(stopwatchInterval);
        running = false;
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById('stopwatch-display').textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        }, 1000);
        running = true;
    }
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    document.getElementById('stopwatch-display').textContent = '00:00:00';
    document.getElementById('laps-list').innerHTML = '';
    stopwatchTime = 0;
    running = false;
});

document.getElementById('lap-stopwatch').addEventListener('click', () => {
    const lapTime = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Tour: ${lapTime}`;
    document.getElementById('laps-list').appendChild(lapItem);
});

// Réveil
let alarms = [];

document.getElementById('set-alarm').addEventListener('click', () => {
    const alarmTime = document.getElementById('alarm-time').value;
    const alarmMessage = document.getElementById('alarm-message').value;
    if (alarmTime && alarmMessage) {
        alarms.push({ time: alarmTime, message: alarmMessage });
        updateAlarmsList();
    }
});

function updateAlarmsList() {
    const now = new Date();
    const alarmList = document.getElementById('alarms-list');
    alarmList.innerHTML = '';
    alarms.forEach(alarm => {
        const alarmDate = new Date();
        const [hours, minutes] = alarm.time.split(':');
        alarmDate.setHours(hours, minutes, 0);

        const timeDifference = alarmDate - now;
        const status = timeDifference <= 0 ? 'passée' : `dans ${Math.floor(timeDifference / 60000)} minutes`;

        const alarmItem = document.createElement('li');
        alarmItem.textContent = `${alarm.time} - ${alarm.message} (${status})`;
        alarmList.appendChild(alarmItem);

        if (timeDifference <= 0 && timeDifference > -1000) {
            alert(`Alarme : ${alarm.message}`);
        }
    });
}
setInterval(updateAlarmsList, 1000);
