function formatTime(time) {
  const date = new Date(time);
  const options = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString(['en-NG'], options);
}

export default formatTime;
