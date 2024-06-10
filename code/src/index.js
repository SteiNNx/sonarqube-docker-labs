const axios = require('axios');

function fetchData(url) {
  return axios.get(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    });
}

module.exports = { fetchData };
