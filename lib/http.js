const axios = require("axios");

const client = axios.create({ baseURL: `http://localhost:${process.env.PORT || 3000}` });
const company = axios.create({ baseURL: "http://192.168.1.7:5091/api" });

const server = axios.create({
  baseURL: "http://192.168.1.7:5090/api/v1/User",
});

server.interceptors.response.use(null, (err) => {
  if (err.response?.data) {
    console.log("response", err.response?.data);
  } else {
    console.log("message", err.message);
  }
  return Promise.reject("Unexpexted Error Occurred");
});

module.exports = {
  client,
  company,
  server,
};
