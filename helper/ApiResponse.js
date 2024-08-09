const ApiResponse = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    success: statusCode < 400,
    data,
  };
};

module.exports = {
  ApiResponse,
};
