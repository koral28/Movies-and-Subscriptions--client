const axios = require("axios");

exports.createAccount = (userName, password) => {
  return axios.post("http://localhost:8000/api/login/createNewUserAccount", {
    userName,
    password,
  });
};
