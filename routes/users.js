const express = require('express');
const usersRouter = express.Router({ mergeParams: true });
const { SearchHistory } = require("../models")
const weatherService = require("../service/weather-service")

const buildWeatherUpdate = async (cities, spotlight) => {
  const toFetch = [...cities.map(name => ({ name, isSpotlight: false })), { name: spotlight, isSpotlight: true }]
  const promisedWeatherUpdate = toFetch.map(async f => {
    const res = await weatherService.getClient().current(f.name)
    return { ...f, ...res }
  })

  const weatherUpdate = await Promise.all(promisedWeatherUpdate)
  return weatherUpdate.reduce((acc, w) => {
    if (w.isSpotlight) {
      acc['spotlight'] = w
    } else {
      acc['topCities'][w.location.name] = w
    }

    return acc
  }, { topCities: {} })
}

usersRouter.get('/current', async function (req, res) {
  if (!req.user) {
    const weatherUpdate = await buildWeatherUpdate(["Roma", "Paris", "Minsk", "London"], "Dimona")
    return res.json({ username: "anon", isLoggedIn: false, weatherUpdate })
  }

  const { username, defaultCities, spotlight } = req.user
  const weatherUpdate = await buildWeatherUpdate(defaultCities, spotlight)
  res.json({ username, isLoggedIn: true, weatherUpdate: weatherUpdate })
})

usersRouter.get("/current/lastSearches", (req, res) => {
  try {
    SearchHistory.findLastHistoryItemsByUser(req.user._id, (err, items) => res.json(items))
  } catch (e) {
    res.json([])
  }
})

usersRouter.post("/current/lastSearches", (req, res) => {
  SearchHistory.create(new SearchHistory({
    userId: req.user._id,
    searchTerm: req.body.searchTerm
  })).then(updated => {
    SearchHistory.findLastHistoryItemsByUser(updated.userId, (err, items) => res.json(items))
  })
})

module.exports = usersRouter;
