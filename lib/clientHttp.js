const { default: axios } = require("axios");

const http = axios.create({ baseURL: `http://localhost:${process.env.PORT || 3000}` });

module.exports = http;
