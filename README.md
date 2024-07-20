<img src="https://github.com/The-Best-Codes/bc-holiday.js/assets/106822363/1a626fbe-bdbb-43ff-b445-120256c474ee" alt="icon" for="cover" />


# bc-holiday.js
## A compact JavaScript library that calculates the holidays for the current day or in a date range.
### ⚠️ bc-holiday.js is still in development! Please let me know in the `Issues` tab if you encounter any issues or would like holidays added to the list.

# Usage 
## Setting up the script
Include the JS library in your HTML documents like this:
```html
<script src="script/bc-holiday.js"></script>
```
Or use the URL to the file in the GitHub repo:

```html
<script src="https://raw.githubusercontent.com/The-Best-Codes/bc-holiday.js/main/bc-holiday.js"></script>
```

### Get the holidays for the current day

_Example: Returns the holidays for the current day_

![image](https://github.com/The-Best-Codes/bc-holiday.js/assets/106822363/222b29b5-b1ef-470e-b33e-a100d04d7c71)


```javascript
const holidaysToday = bcHoliday.getHolidaysOn(new Date());
console.log(holidaysToday);
/*Write the days holidays to the console as an array*/
```

```json
[]
```

### Get the holidays for a time period between two dates

_Example: Get the holidays in November_

**Note that JavaScript is 0 based, so November, the 11th month, is 10 in JS**

![image](https://github.com/The-Best-Codes/bc-holiday.js/assets/106822363/53a6c452-204d-44dd-81b8-278046122638)


```javascript
const holidaysThisMonth = bcHoliday.getHolidaysInRange(new Date(2023, 10, 1), new Date(2023, 10, 30));
console.log(holidaysThisMonth);
/*Write the days holidays to the console as an array*/
```

```json
{"11-01":["All Saints' Day"],"11-11":["Veterans Day"],"11-23":["Thanksgiving"]}
```

_Example: Show the holidays for November on an HTML page_

**Note that JavaScript is 0 based, so November, the 11th month, is 10 in JS**

<details>
  <summary>Click to view code</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <title>Holiday List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    h1 {
      text-align: center;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin-bottom: 10px;
    }

    .holiday-date {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Holiday List</h1>
  <ul id="holiday-list"></ul>

  <script>
    const holidaysData = bcHoliday.getHolidaysInRange(new Date(2023, 10, 1), new Date(2023, 10, 30));

    const holidayListElement = document.getElementById('holiday-list');

    for (const date in holidayData) {
      const holidayName = holidayData[date][0]; // Assuming only one holiday per date

      const listItem = document.createElement('li');
      const dateElement = document.createElement('span');
      dateElement.classList.add('holiday-date');
      dateElement.textContent = formatDate(date);
      listItem.appendChild(dateElement);
      listItem.appendChild(document.createTextNode(': ' + holidayName));

      holidayListElement.appendChild(listItem);
    }

    function formatDate(dateString) {
      const [month, day] = dateString.split('-');
      return `${getMonthName(month)} ${parseInt(day)}${getDaySuffix(parseInt(day))}`;
    }

    function getMonthName(month) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames[parseInt(month) - 1];
    }

    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }

      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
  </script>
<script src="script/path/to/bc-holiday.js"></script>
</body>
</html>
```

</details>

## Other functions and their usages

### `formatDate(date)`

![image](https://github.com/The-Best-Codes/bc-holiday.js/assets/106822363/44f075e0-8dc4-441a-ae3e-f14ac84e5d49)


_Example: Return the current day in `MM-DD`  format_
```javascript
bcHoliday.formatDate(new Date());
```
```
'01-01'
```
### `calculateEaster(year)`

![image](https://github.com/The-Best-Codes/bc-holiday.js/assets/106822363/3d4334be-abab-46fa-aa38-949bb154a8dd)


_Example: Return the day on which Easter will occur for the supplied year_
```javascript
bcHoliday.calculateEaster(2030);
//Returns the date of Easter for the supplied year
```
```
Sun Apr 21 2030 00:00:00 GMT-0500 (Central Daylight Time)
```


# If this repo helped you, be sure to give it a star ⭐!
