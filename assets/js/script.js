// MODULE
const timeSequence = (function() {
    let details = {
        totalHours: 0,
        expectedMs: 0

    }

    return {
        details
    }
})();

// Calculate total hours
function getTotalHours(hours) {
    const fromHour = new Date("01/01/2007 " + hours[0]).getHours(),
        toHour = new Date("01/01/2007 " + hours[1]).getHours();

    return ((toHour - fromHour) + 1);
}
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
// Convert milliseconds to minutes and seconds
function millisToMinutesAndSeconds(millis) {
    var ms = Math.abs(millis);
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + " minutter og " + (seconds < 10 ? '0' : '') + seconds + " sekunder";
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

// Calculate button events
function calculateHours() {
    const calcBtn = document.querySelector('#calcBtn');

    calcBtn.addEventListener('click', function() {
        const inputMin = document.querySelectorAll('.input-min'),
            inputSec = document.querySelectorAll('.input-sec'),
            inputMs = document.querySelectorAll('.input-ms'),
            currentDuration = document.querySelector('#currentDuration'),
            durationDiff = document.querySelector('#durationDiff'),
            sumMs = getMilliseconds(inputMin, inputSec, inputMs),
            difference = sumMs - timeSequence.details.expectedMs;
        let sumComment = "";
        console.log(sumMs);

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
function showTimeAdjustment(selectedHours) {
    const timeAdjustment = document.querySelector('.time-adjustment'),
        timeInputs = document.querySelector('#time-inputs'),
        hours = timeSequence.details.totalHours;
    let i = 0;

    // Show section
    timeAdjustment.classList.add('d-block');

    while (i < hours) {
        const inputGroup = document.createElement('div'),
            calcBtn = document.createElement('div');

         // Assign classes and content to input group
        inputGroup.classList.add('input-group');
        inputGroup.classList.add('time-adjustment__input-group');
       
        inputGroup.innerHTML = `
            <div class="input-group time-adjustment__input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text time-adjustment__input-prepend">${getHour(selectedHours[0], i)}</span>
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
}

(function () {
    const getHours = document.querySelector('#getHours');

    // Event listener for getHours button
    getHours.addEventListener('click', function(e) {
        const timeSelector = document.querySelector('.time-selector'),
            fromHour = document.querySelector('#fromHour'),
            toHour = document.querySelector('#toHour'),
            selectedHours = [fromHour.value, toHour.value],
            targetDuration = document.querySelector('#targetDuration');
        let totalHours = 0,
            totalMs = 0;

        // Calculate total hours and milliseconds
        totalHours = getTotalHours(selectedHours);
        totalMs = totalHours * 3600000;
        // Add total hours and ms to module
        timeSequence.details.totalHours = totalHours;
        timeSequence.details.expectedMs = totalMs;

        // Hide time-selector section
        timeSelector.classList.add('d-none');

        // Show time-adjustment section
        showTimeAdjustment(selectedHours);

        // Display target duration in result table
        targetDuration.innerHTML = `${timeSequence.details.expectedMs} millisekunder`;


    });
    

})();