// MODULE
const timeSequence = (function() {
    let details = {
        totalHours: 8,
        expectedMs: 28800000

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
                <input type="text" class="form-control" id="hr-${i + 1}-min" placeholder="min">
                <input type="text" class="form-control" id="hr-${i + 1}-sec" placeholder="sek">
                <input type="text" class="form-control" id="hr-${i + 1}-ms" placeholder="ms">
            </div>
        `;

        // Append elements
        timeInputs.appendChild(inputGroup);
        if (i === (hours - 1)) {
            calcBtn.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block time-adjustment__calculate" id="calcBtn">Beregn</button>';
            timeInputs.appendChild(calcBtn);
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
            selectedHours = [fromHour.value, toHour.value];
        let totalHours = 0,
            totalMs = 0;

        // Calculate total hours and milliseconds
        totalHours = getTotalHours(selectedHours);
        totalMs = totalHours * 3600000;
        // Add total hours and ms to module
        timeSequence.details.totalHours = totalHours;
        timeSequence.details.expectedMs = totalMs;
        console.log(timeSequence.details);

        // Hide time-selector section
        timeSelector.classList.add('d-none');

        // Show time-adjustment section
        showTimeAdjustment(selectedHours);

    });
    

})();