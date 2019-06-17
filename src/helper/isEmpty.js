export const isEmpty = (value) => {
  if (value === undefined
          || value === 'undefined'
          || value === null
          || (typeof value === 'object' && Object.keys(value).length === 0)
          || (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  }
};

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
