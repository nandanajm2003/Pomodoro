let timer;
let minutes = 0;
let seconds = 0;
let waterReminderInterval = 1800; // Default interval for water reminder in seconds (30 minutes)

document.getElementById('setTime').addEventListener('click', function() {
    minutes = parseInt(document.getElementById('minutesInput').value);
    seconds = parseInt(document.getElementById('secondsInput').value);
    updateDisplay();
});

document.getElementById('start').addEventListener('click', function() {
    timer = setInterval(updateTimer, 1000);
});

document.getElementById('pause').addEventListener('click', function() {
    clearInterval(timer);
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    updateDisplay();
});

document.getElementById('intervalInput').addEventListener('change', function() {
    waterReminderInterval = parseInt(document.getElementById('intervalInput').value) * 60;
});

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            // Add code for task completion or reminder
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
    
    // Check for water reminder
    if ((minutes * 60 + seconds) % waterReminderInterval === 0 && (minutes * 60 + seconds) !== 0) {
        showWaterReminder();
    }
}

function updateDisplay() {
    document.getElementById('minutes').innerText = padZero(minutes);
    document.getElementById('seconds').innerText = padZero(seconds);
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}

function showWaterReminder() {
    // Play notification sound
    const notificationSound = new Audio('audio.mp3');
    notificationSound.play();

    // Display notification message
    const notification = document.createElement('div');
    notification.className = 'water-reminder';
    notification.textContent = 'Time to drink water!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // Remove notification after 3 seconds
}


document.getElementById('addGoal').addEventListener('click', function() {
    const goalInput = document.getElementById('goalInput').value;
    if (goalInput.trim() !== '') {
        addGoalToList(goalInput);
        document.getElementById('goalInput').value = '';
    }
});

function addGoalToList(goalText) {
    const goalList = document.getElementById('goalList');
    const li = document.createElement('li');
    li.textContent = goalText;
    goalList.appendChild(li);
}


