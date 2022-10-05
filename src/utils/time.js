export const timeStamp = (timestamp) => {
  const userLang = navigator.languages[1];

  const now = Date.now();
  var date = new Date(timestamp);

  let diff = date - now;
  let minutesFrom = Math.abs(Math.floor(diff / 60000));

  if (minutesFrom < 2) {
    return `just now`;
  }

  if (minutesFrom < 60) {
    return `${minutesFrom} minutes ago`;
  }

  return `${date.toLocaleDateString(userLang)}, ${date.toLocaleTimeString()}`;
};
