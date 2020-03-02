const { mongoose } = require('../index');

const Schema = mongoose.Schema;
const PostLikeModel = require('./PostLikeSchema').schema
 
const PostCommentSchema=  new Schema({
    member_id: {
        type: String,
    },
    post_comment_id: {
        type: Number,
    },
    post_id: {
        type: Number,
    },
    comment: {
        type: String,
    },
    parent_id	: {
        type: String,
    },
    status:{
        type:String,
        enum: ['Active','Delete'],
        default: 'Active' 
    },
    comment_media: {
        type: String,
    },
    commentimage_100x100: {
        type: String,
    },
    postCommentLikes: {
        type: [PostLikeModel],
        default: []
    },
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date'  } })
const PostCommentModel = mongoose.model('post_comments', PostCommentSchema)
module.exports = PostCommentModel

