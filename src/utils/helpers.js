export const getUserDataById = (id) => {};

export const sliceDescription = (text) => {
  if (text.length > 200) {
    return text.slice(0, 300) + "...";
  } else return text;
};

export const statusOptions = [
  "backglog",
  "todo",
  "progress",
  "testing",
  "deploy",
  "done",
];

export const priorityOptions = ["low", "normal", "high", "very high"];

export const loginRestrictions = (string) => {
  return (string = string.replace(/\s/g, "").substring(0, 14));
};
