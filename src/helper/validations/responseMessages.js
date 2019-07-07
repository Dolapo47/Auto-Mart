export const errorMessage = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};

export const successMessage = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export const userMessage = (res, statusCode, message, token, user) => {
  res.status(statusCode).json({
    status: statusCode,
    success: message,
    data: { token, user, }
  });
};

export const retrieveCarMessage = (res, statusCode, message, car) => {
  res.status(statusCode).json({
    status: statusCode,
    success: message,
    data: car,
  });
};
