const { default: axios } = require("axios");

const http = axios.create({
  baseURL: "http://192.168.1.7:5090/api/v1/User",
});

module.exports = http;
