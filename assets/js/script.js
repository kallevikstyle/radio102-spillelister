// Calculate total hours
function getTotalHours(hours) {
    const fromHour = new Date("01/01/2007 " + hours[0]).getHours(),
        toHour = new Date("01/01/2007 " + hours[1]).getHours();

    return ((toHour - fromHour) + 1);
}



// Store values in Local Storage
const storeValues = (totalHours, totalMs, selectedHours) => {
    const startHour = selectedHours[0],
        endHour = selectedHours[1];

    localStorage.setItem('totalHours', totalHours);
    localStorage.setItem('totalMs', totalMs);
    localStorage.setItem('startHour', startHour);
    localStorage.setItem('endHour', endHour);
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
        storeValues(totalHours, totalMs, selectedHours);
    });
})();