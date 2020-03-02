const { mongoose } = require('../index');

const Schema = mongoose.Schema;
 
const PostCommentLikeSchema=  new Schema({
    member_id: {
        type: String,
    },
    status:{
        type:String,
        enum: ['Like','Unlike'],
    }

}, { timestamps: { createdAt: 'create_date' } })
const PostCommentLikeModel = mongoose.model('post_comment_likes', PostCommentLikeSchema )
module.exports = PostCommentLikeModel
