const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: { type: String, require: true },
    identifications: [{
        type: { type: String },
        number: { type: String }
    }],
    createOn: { type: Date, "default": Date.now }
});

module.exports = mongoose.model("User", userSchema, "Users");