const axios = require('axios');
const {
  DEFAULT
} = require("../consts");

exports.getArticles = (req, res) => {
  //logic to fetch articles from third party API
  try {
    const apiUrl = 'http://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
    const apiKey = '4BVSU9TDme7uBVQzuaZ4VdNWug8rCR01';

    axios.get(apiUrl, {
      params: {
        "api-key": apiKey
      }
    })
    .then((response) => {
      // Handle the API response here
      console.log("API Response:", response.data);
      // You can send the response to the client or process it further as needed.
      res.status(200).json(response.data.results.books);
    })
    .catch((error) => {
      console.error("API Request Error:", error);
      return res.status(500).send({ message: 'Internal server error' });
    });
  } catch (error) {
    return res.status(500).send({ message: DEFAULT });
  }
}










