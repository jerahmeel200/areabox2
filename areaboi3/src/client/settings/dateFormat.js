export default function formatDate() {
  const date = new Date();
  let minutes = date.getUTCMinutes();
  let hours = date.getUTCHours() + 1;
  let amOrPM = hours > 12 ? 'p.m' : 'a.m';
  let formattedHours = hours === 24 ? 0 : hours;
  let day = date.getUTCDay();
  let today = date.getUTCDate();
  let month = date.getUTCMonth();
  let year = date.getUTCFullYear();

  return `${formatNumbers(formattedHours)}:${formatNumbers(
    minutes
  )} ${amOrPM} ${getMonth(month)} ${today}, ${year}`;
}

function getMonth(no) {
  let month = '';
  switch (no) {
    case 0:
      month = 'JAN';
      break;
    case 1:
      month = 'FEB';
      break;
    case 2:
      month = 'MARCH';
      break;
    case 3:
      month = 'APRIL';
      break;
    case 4:
      month = 'MAY';
      break;
    case 5:
      month = 'JUNE';
      break;
    case 6:
      month = 'JULY';
      break;
    case 7:
      month = 'AUG';
      break;
    case 8:
      month = 'SEPT';
      break;
    case 9:
      month = 'OCT';
      break;
    case 10:
      month = 'NOV';
      break;
    case 11:
      month = 'DEC';
  }
  return month;
}
function formatNumbers(no) {
  return no.toString().padStart(2, '0');
}
