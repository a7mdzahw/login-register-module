const axios = require("axios");

const http = axios.create({
  baseURL: "http://192.168.1.7:5091/api",
});

module.exports = http;
