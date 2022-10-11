export const getUserDataById = (id) => {};

export const sliceDescription = (text) => {
  if (text.length > 200) {
    return text.slice(0, 300) + "...";
  } else return text;
};
