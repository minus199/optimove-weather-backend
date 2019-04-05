const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    providerId: { type: String, unique: true },
    provider: { type: String, index: true },
    username: { type: String, unique: true },
    defaultCities: [String],
    spotlight: String
});

module.exports = mongoose.model('User', userSchema);