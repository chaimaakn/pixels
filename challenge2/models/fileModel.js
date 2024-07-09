const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    description: { type: String, required: true },
    mime_type: { type: String, required: true },
    path: { type: String, required: true }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
