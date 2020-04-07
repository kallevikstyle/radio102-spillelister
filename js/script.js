function getTotalHours(hours) {
    const fromHour = new Date("01/01/2007 " + hours[0]).getHours(),
        toHour = new Date("01/01/2007 " + hours[1]).getHours();

    return ((toHour - fromHour) + 1);

}

(function () {
    const getHours = document.querySelector('#getHours');

    // Event listener for getHours button
    getHours.addEventListener('click', function(e) {
        const fromHour = document.querySelector('#fromHour'),
            toHour = document.querySelector('#toHour'),
            selectedHours = [fromHour.value, toHour.value];

        getTotalHours(selectedHours);

    });
    

})();