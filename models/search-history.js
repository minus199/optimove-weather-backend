const mongoose = require("mongoose")
const searchHistorySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    searchTerm: { type: String },
    searchTime: { type: Date, default: Date.now }
})

searchHistorySchema.statics.findLastHistoryItemsByUser = function (userId, cb) {
    return this
        .find({ userId })
        .sort({ 'searchTime': -1 })
        .limit(10)
        .select({ searchTerm: 1, searchTime: 1, _id: 0 })
        .exec((err, items) => cb(err, items))
    // return this.find({ userId }, cb);
}

module.exports = mongoose.model('SearchHistory', searchHistorySchema);