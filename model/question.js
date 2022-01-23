const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    url: { type: String, require: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    premium: Boolean,
   
    likes: { type: Number, require: true },
    sharedCount: { type: Number, require: true },
    video: { type: String, require: true },

});

module.exports = mongoose.model('Question', questionSchema);

// companies: [
//     'Amazon',
//     'Adobe',
//     'Google',
//     'Bloomberg',
//     'Facebook',
//     'Apple',
//     'Microsoft',
// ],

// pattern: ['Arrays'],