
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const getDateFormated = (date:string) => {
  const newDate = new Date(`${date} 00:00`);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = `${newDate.getDate()}`;
  const formattedDay = day.length > 1 ? day : `0${day}`

  return `${MONTHS[month]} ${formattedDay}, ${year}`;
};

export {
  getDateFormated,
};