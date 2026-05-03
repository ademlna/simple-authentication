// utility/resFormat.js


const resFormat = {

// Response sukses
  success: (response = {}, message = "Success", code = 200) => {
    return {
      response,
      meta: {
        code,
        message,
        response_code: "0000",
        timestamp: new Date().toISOString(),
      },
    };
  },

//   Response error
  error: (message = "Internal Server Error", code = 500, response_code = "0001", response = null) => {
    return {
      response,
      meta: {
        code,
        message,
        response_code,
        timestamp: new Date().toISOString(),
      },
    };
  },
};

module.exports = resFormat;
