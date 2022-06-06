const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    }
})

module.exports = new mongoose.model('Category',CategorySchema)