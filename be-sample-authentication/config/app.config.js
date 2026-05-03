require("dotenv").config();

module.exports = {
    app: {
      name: process.env.APP_NAME,
      version: process.env.VERSION,
    },
}