const mongoose=require('mongoose');
const shortid=require('shortid');

const urlSchema=new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true

    },
    shortId:{
        type:String,
        required:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports=mongoose.model('Url',urlSchema);