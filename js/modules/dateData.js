function dateInfo(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const dateObj = new Date(date);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  let hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;

  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}

export {dateInfo};
