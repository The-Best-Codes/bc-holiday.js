// bc-holiday.js
(function () {
    'use strict';

    // Fixed-date holidays in the format 'MM-DD': ['Holiday Name']
    const fixedHolidays = {
        '01-01': ['New Year\'s Day'],
        '07-04': ['Independence Day'],
        '12-25': ['Christmas Day'],
        '12-31': ['New Year\'s Eve'],
        '11-11': ['Veterans Day'],
        '09-05': ['Labor Day'], // First Monday in September
        '10-31': ['Halloween'],
        '03-17': ['St. Patrick\'s Day'],
        '02-14': ['Valentine\'s Day'],
        '01-15': ['Martin Luther King Jr. Day'], // Third Monday in January
        '02-02': ['Groundhog Day'],
        '02-12': ['Lincoln\'s Birthday'],
        '02-22': ['Washington\'s Birthday'],
        '04-22': ['Earth Day'],
        '06-14': ['Flag Day'],
        '06-19': ['Juneteenth'],
        '10-12': ['Columbus Day'], // Second Monday in October
        '11-01': ['All Saints\' Day'],
        '12-24': ['Christmas Eve'],
        // Add other fixed-date holidays here
    };

    // Function to calculate the n-th weekday of a given month and year
    function calculateNthWeekday(year, month, n, weekday) {
        const firstDayOfMonth = new Date(year, month, 1);
        let dayOfWeek = firstDayOfMonth.getDay();
        let date = 1 + ((weekday - dayOfWeek + 7) % 7);
        if (n > 1) {
            date += (n - 1) * 7;
        }
        return new Date(year, month, date);
    }

    // Calculate variable-date holidays for a given year
    function getVariableDateHolidays(year) {
        const easterDate = calculateEaster(year);
        const variableHolidays = {
            // Thanksgiving (4th Thursday of November)
            [formatDate(calculateNthWeekday(year, 10, 4, 4))]: ['Thanksgiving'],
            // Memorial Day (last Monday of May)
            [formatDate(calculateNthWeekday(year, 4, 5, 1))]: ['Memorial Day'],
            // Mother's Day (2nd Sunday of May)
            [formatDate(calculateNthWeekday(year, 4, 2, 0))]: ['Mother\'s Day'],
            // Father's Day (3rd Sunday of June)
            [formatDate(calculateNthWeekday(year, 5, 3, 0))]: ['Father\'s Day'],
            // Labor Day (1st Monday of September)
            [formatDate(calculateNthWeekday(year, 8, 1, 1))]: ['Labor Day'],
            // Columbus Day (2nd Monday of October)
            [formatDate(calculateNthWeekday(year, 9, 2, 1))]: ['Columbus Day'],
            // Martin Luther King Jr. Day (3rd Monday of January)
            [formatDate(calculateNthWeekday(year, 0, 3, 1))]: ['Martin Luther King Jr. Day'],
            // Easter Sunday
            [formatDate(easterDate)]: ['Easter Sunday'],
            // Good Friday (2 days before Easter)
            [formatDate(new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 2))]: ['Good Friday'],
            // Easter Monday (1 day after Easter)
            [formatDate(new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 1))]: ['Easter Monday'],
            // Add other variable-date holidays here
        };
        // Easter calculation can be complex and is omitted in this example
        return variableHolidays;
    }

    function calculateEaster(year) {
        const f = Math.floor,
            // Golden Number - 1
            G = year % 19,
            C = f(year / 100),
            // related to Epact
            H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
            // number of days from 21 March to the Paschal full moon
            I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
            // weekday for the Paschal full moon
            J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
            // number of days from 21 March to the Sunday on or before the Paschal full moon
            L = I - J,
            month = 3 + f((L + 40) / 44),
            day = L + 28 - 31 * f(month / 4);

        return new Date(year, month - 1, day);
    }

    function getHolidaysOn(date) {
        const dateString = formatDate(date);
        const year = date.getFullYear();
        const variableHolidays = getVariableDateHolidays(year);

        const holidays = fixedHolidays[dateString] || [];
        if (variableHolidays[dateString]) {
            holidays.push(...variableHolidays[dateString]);
        }

        return holidays;
    }

    function getHolidaysInRange(startDate, endDate) {
        let currentDate = new Date(startDate.getTime());
        const holidaysInRange = {};

        while (currentDate <= endDate) {
            const dateString = formatDate(currentDate);
            const holidays = getHolidaysOn(currentDate);

            if (holidays.length > 0) {
                holidaysInRange[dateString] = holidays;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return JSON.stringify(holidaysInRange);
    }

    function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
    }

    // Expose the functions
    window.bcHoliday = {
        getHolidaysOn: getHolidaysOn,
        getHolidaysInRange: getHolidaysInRange,
        formatDate: formatDate,
        calculateEaster: calculateEaster
    };
})();