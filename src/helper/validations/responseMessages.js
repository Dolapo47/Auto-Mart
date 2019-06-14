export const errorMessage = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};

export const userMessage = (res, statusCode, message, token, user) => {
  res.status(statusCode).json({
    status: statusCode,
    success: message,
    data: [{ token, user, }]
  });
};
