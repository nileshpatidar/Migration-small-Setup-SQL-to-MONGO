const {mongoose} = require('../index');
const Schema = mongoose.Schema;
 
const PostImage=  new Schema({
    image_type:{
        type:String,
        enum: ['image','video','gif'],
        default: 'image'
        
    },
    video_thumb: {
        type: String,
        default:null
    },
    image: {
        type: String,
    },
    original_image: {
        type: String,
    },
    status:{
        type:String,
        enum: ['Active','Inactive','Delete'],
        default: 'Active' 
    },
    imagesize650x650_height: {
        type: Number,
    },
    imagesize650x650_width: {
        type: Number,
    },

}, { timestamps: { createdAt: 'create_date' } })
const PostImageModel = mongoose.model('post_images', PostImage )
module.exports = PostImageModel

