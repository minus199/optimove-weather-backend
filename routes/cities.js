var express = require('express');
var citiesRouter = express.Router({ mergeParams: true });
const weatherService = require("../service/weather-service")

citiesRouter.get('/:cityURL/current', async (req, res) => {
  try {
    const searchResults = await weatherService.getClient().current(req.params.cityURL)
    searchResults.isSpotlight = req.query.isSpotlight === 'true'
    res.json(searchResults);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather. maybe try again later." })
  }
});

citiesRouter.get('/:cityURL/history', async (req, res) => {
  try {
    const searchResults = await weatherService.getClient().history(req.params.cityURL)
    res.json(searchResults);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather. maybe try again later." })
  }
});

citiesRouter.get('/:cityURL/conditions', async (req, res) => {
  try {
    const searchResults = await weatherService.getClient().conditions(req.params.cityURL)
    res.json(searchResults);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather. maybe try again later." })
  }
});

citiesRouter.get('/:cityURL/forecast', async (req, res) => {
  try {
    const searchResults = await weatherService.getClient().forecast(req.params.cityURL)
    res.json(searchResults);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch weather. maybe try again later." })
  }
});

module.exports = citiesRouter;
