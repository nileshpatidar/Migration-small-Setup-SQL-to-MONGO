const {mongoose} = require('../index');

const Schema = mongoose.Schema;
 
const PostLike=  new Schema({
    member_id: {
        type: String,
    },
    status:{
        type:String,
        enum: ['Like','Unlike'],
    }

}, { timestamps: { createdAt: 'create_date' } })
const PostLikeModel = mongoose.model('post_likes', PostLike )
module.exports = PostLikeModel

