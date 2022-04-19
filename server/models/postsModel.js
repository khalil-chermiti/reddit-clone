import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    createdBy:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
        default:0,

    },
    downvotes:{
        type:Number,
        default:0,
    },
    title:{
        type:String,
        maxlength:100,
        required:[true,'please provide a Title for the post'],
    },
    community:{
        type:String,
        required:[true,'please specify the community!'],
    },
    content:{
        type:String,
    },
    comments:{
        type:Array,
        default:[],
    }

},
{timestamps:true}
);

export default mongoose.model('Post',postSchema);