const { model, Schema } = require('mongoose');

const fightSchema = new Schema({
    data: String,
    user: String,
    type: String,
    date: String
});

module.exports = model('Fight', fightSchema);
