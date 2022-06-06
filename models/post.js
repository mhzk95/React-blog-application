const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
        default:''
    },
    categories:{
        type:Array,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likes:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'User'
        }],
        required:false
    },
    comments:{
        type:[
            {
                comment:String,
                userId:{
                    type:Schema.Types.ObjectId,
                    ref:'User'
                },
                username:String,
                userImage:String,
                createdAt:Date
            }
        ]
    }
},{timestamps:true})

module.exports = new mongoose.model('Post',PostSchema)