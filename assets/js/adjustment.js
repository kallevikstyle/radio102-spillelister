// Get current hour
function getHour(value, i) {
    let hour = new Date("01/01/2007 " + value).getHours() + i;

    if (hour < 10) {
        hour = "0" + hour + ":00";
    } else {
        hour += ":00";
    }
    return hour;
}
// Calculate milliseconds
function getMilliseconds(minutes, seconds, milliseconds) {
    let sum = 0;

    // Minutes
    for (let i = 0; i < minutes.length; i++) {
        sum += (minutes[i].value * 60000);
    }
    // Seconds
    for (let i = 0; i < seconds.length; i++) {
        sum += (seconds[i].value * 1000);
    }
    // Milliseconds
    for (let i = 0; i < milliseconds.length; i++) {
        sum += (milliseconds[i].value * 1);
    }
    
    return sum;
}
// Convert milliseconds to minutes and seconds
function millisToMinutesAndSeconds(millis) {
    var ms = Math.abs(millis);
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + " minutter og " + (seconds < 10 ? '0' : '') + seconds + " sekunder";
}
// Calculate hours with 'beregn' button
function calculateHours() {
    const calcBtn = document.querySelector('#calcBtn');

    calcBtn.addEventListener('click', function() {
        const inputMin = document.querySelectorAll('.input-min'),
            inputSec = document.querySelectorAll('.input-sec'),
            inputMs = document.querySelectorAll('.input-ms'),
            currentDuration = document.querySelector('#currentDuration'),
            durationDiff = document.querySelector('#durationDiff'),
            sumMs = getMilliseconds(inputMin, inputSec, inputMs),
            difference = sumMs - localStorage.totalMs;
        let sumComment = "";

        if (difference > 0) {
            sumComment = " over."
        } else if (difference < 0) {
            sumComment = " under."
        } else {
            sumComment = ".";
        }
        
        // Display current duration in result table
        currentDuration.innerHTML = `${sumMs} millisekunder`;
        // Display difference
        durationDiff.innerHTML = `${difference} millisekunder<br>
        (${millisToMinutesAndSeconds(difference)}${sumComment})`;
    });

}
// Show time adjustment section
function showTimeAdjustment(startHour) {
    const timeInputs = document.querySelector('#time-inputs'),
        hours = localStorage.totalHours,
        targetDuration = document.querySelector('#targetDuration');
    let i = 0;

    while (i < hours) {
        const inputGroup = document.createElement('div'),
            calcBtn = document.createElement('div');

         // Assign classes and content to input group
        inputGroup.classList.add('input-group');
        inputGroup.classList.add('time-adjustment__input-group');
       
        inputGroup.innerHTML = `
            <div class="input-group time-adjustment__input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text time-adjustment__input-prepend">${getHour(startHour, i)}</span>
                </div>
                <input type="text" class="form-control input-min" id="hr${i + 1}-min" placeholder="min">
                <input type="text" class="form-control input-sec" id="hr${i + 1}-sec" placeholder="sek">
                <input type="text" class="form-control input-ms" id="hr${i + 1}-ms" placeholder="ms">
            </div>
        `;

        // Append elements
        timeInputs.appendChild(inputGroup);
        // Append calculate button
        if (i === (hours - 1)) {
            calcBtn.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block time-adjustment__calculate" id="calcBtn">Beregn</button>';
            timeInputs.appendChild(calcBtn);
            calculateHours();
        }
        i++;
    }

    // Display target duration in result table
    targetDuration.innerHTML = `${localStorage.totalMs} millisekunder`;
}

(function () {
    if (localStorage.startHour && localStorage.endHour && localStorage.totalHours && localStorage.totalMs) {
        showTimeAdjustment(localStorage.startHour);
        
    } else {
        console.log('A value is missing from Local Storage')
    }

    
})();