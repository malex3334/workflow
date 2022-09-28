export const timeStamp = (timestamp) => {
  var date = new Date(timestamp);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
