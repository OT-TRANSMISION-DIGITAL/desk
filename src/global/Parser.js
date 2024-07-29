export const parseAndFormatDate = (dateTimeString, formatString) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getMonthIndex = (monthName) => monthNames.indexOf(monthName);
  
    const parseDateTimeString = (dateTimeString) => {
      const [datePart, timePart] = dateTimeString.split(' ');
      const [year, month, day] = datePart.split('-');
      let date;
      if (timePart) {
        const [hours, minutes, seconds] = timePart.split(':');
        date = new Date(year, month - 1, day, hours, minutes, seconds);
      } else {
        date = new Date(year, month - 1, day);
      }
      return date;
    };
  
    const formatDateTimeString = (date, formatString) => {
      const formattedYear = date.getFullYear();
      const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
      const formattedDay = String(date.getDate()).padStart(2, '0');
      const formattedMonthName = monthNames[date.getMonth()];
      const formattedHours = String(date.getHours()).padStart(2, '0');
      const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
      const formattedSeconds = String(date.getSeconds()).padStart(2, '0');
  
      return formatString
        .replace('YYYY', formattedYear)
        .replace('MMMM', formattedMonthName)
        .replace('MM', formattedMonth)
        .replace('DD', formattedDay)
        .replace('HH', formattedHours)
        .replace('mm', formattedMinutes)
        .replace('ss', formattedSeconds);
    };
  
    const date = parseDateTimeString(dateTimeString);
    const newDate = formatDateTimeString(date, formatString);
    console.log(newDate);
    return newDate
};