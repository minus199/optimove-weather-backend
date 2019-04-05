const express = require('express');
const autosuggestRouter = express.Router({ mergeParams: true });
const weatherService = require("../service/weather-service")

autosuggestRouter.get('/cities/:searchTerm', async (req, res) => {
  try {
    const searchResults = await weatherService.getClient().search(req.params.searchTerm)
    res.json(searchResults);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather. maybe try again later." })
  }
});

module.exports = autosuggestRouter;
