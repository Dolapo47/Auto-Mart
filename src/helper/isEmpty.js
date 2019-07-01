export const isFloat = (value) => {
  const regex = /^\d*(\.\d{2})?$/;
  const regInt = /^[0-9]*[1-9][0-9]*$/;
  if (value.match(regex) && value.match(regInt)) {
    return true;
  }
};

export const isInteger = (value) => {
  const regInt = /^[0-9]*[1-9][0-9]*$/;
  if (value.match(regInt)) {
    return true;
  }
};
