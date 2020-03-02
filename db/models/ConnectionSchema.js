const {mongoose} = require('../index');
const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    connection_id: {
        type: Number
    },
    member_id: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'inActive', 'Delete'],
        default: 'Active'

    },
    connection_status: {
        type: String,
        // enum: ['Requested', 'Connection', 'Unconnection', 'Deleted', 'Blocked'],
        // default: 'Unconnection'
    },
    friend_member_id: {
        type: String
    },
    nickname: {
        type: String
    },
    request_date: {
        type: String
    },
    follow_filter:{
        type:Array,
        default:[
            {"post_type":"hoookedup","status":"Yes"},
            {"post_type":"snapit","status":"Yes"},
            {"post_type":"fillme","status":"Yes"},
            {"post_type":"give","status":"Yes"},
            {"post_type":"trade","status":"Yes"},
            {"post_type":"create","status":"Yes"},
            {"post_type":"situation_room","status":"Yes"},
            {"post_type":"opportunity","status":"Yes"},
            {"post_type":"turnup","status":"Yes"},
            {"post_type":"good_deed","status":"Yes"},
            {"post_type":"album","status":"Yes"}
        ]
        // validate: object => {  
        //         let allowedKeys = ['hoookedup', 'fillme', 'snapit', 'give','create','trade','opportunity','turnup','situation_room','good_deeds'];
        //         let correctKeys = Object.keys(object).every(key => allowedKeys.includes(key)); //make sure all keys are inside `allowedKeys`
        //         return correctKeys 
        // }
    }


}, { timestamps: { createdAt: 'create_date' } });

// schema.pre('updateOne', { document: true, query: false }, function() {
//     console.log('Updating');
//     this.update_array.map(item=>{
        
//     })
//   })


const connectionsModel = mongoose.model('connections', connectionsSchema);
module.exports = connectionsModel


