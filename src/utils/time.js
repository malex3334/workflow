export const timeStamp = (timestamp) => {
  const now = Date.now();
  var date = new Date(timestamp);

  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
