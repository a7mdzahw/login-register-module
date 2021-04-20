const { default: axios } = require("axios");

const http = axios.create({
  baseURL: "http://192.168.1.7:5090/api/v1/User",
});

http.interceptors.response.use(null, (err) => {
  if (err.response?.data) {
    console.log("response", err.response?.data);
  } else {
    console.log("message", err.message);
  }
  return Promise.reject("Unexpexted Error Occurred");
});

module.exports = http;
