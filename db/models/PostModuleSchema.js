const { mongoose } = require('../index');
const Schema = mongoose.Schema;
 
const PostModulesModelSchema=  new Schema({
    ModuleName: {
        type: String,
    },
    status:{
        type:String,
        enum: ['Active', 'Inactive', 'Delete'],
        default: 'Active'
    },
    updated_date:{
        type: Date,
    }
}, { timestamps: { createdAt: 'create_date' } })
const PostModulesModel = mongoose.model('PostModules', PostModulesModelSchema )
module.exports = PostModulesModel
