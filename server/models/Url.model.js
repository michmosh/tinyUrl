const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: true
    },
    short_url:
    {
        type: String,
        require: true
    
    },
    created_at:
    {
        type: Date,
        require: true,
        default:Date.now
    
    },
    updated_at:
    {
        type: Date,
        require: true,
        default:Date.now
    
    }
})

const Url = mongoose.model('Url', UrlSchema);

module.exports =  Url ;