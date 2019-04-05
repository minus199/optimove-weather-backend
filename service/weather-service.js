const apixu = require("apixu")
apixu.config.apikey = process.env.APIXUKEY;
const weatherAPI = new apixu.Apixu(apixu.config);

module.exports = {
    getClient: () => weatherAPI
}