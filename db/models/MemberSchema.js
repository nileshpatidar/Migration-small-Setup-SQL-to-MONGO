const {mongoose} = require('../index');
const Schema = mongoose.Schema;
var md5 = require('md5');
const ActivePostSchema = require('./PostModuleSchema').schema
var Float = require('mongoose-float').loadType(mongoose);

const user = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email_id: {
        type: String
    },	
    contact_no: {
        type: Number,
    },
    date_of_birth:{
        type:String,
    },
    gender: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Deleted'],
        default: 'Active'
    },
    password: {
        type: String
    },
    country_code:{
        type: String
    },
    verification_code:{
        type: String
    },
    isverify: {
        type:Boolean,
        enum: [true.false],
        default: false
    },
    
    visibility: {
        type: String,
        enum: ['Public','Friends of Friends','Friends','Only Me','Custom'],
        default: 'Active'
    },
    show_instant_notifications: {
        type: String,
        enum: ['Enable','Disable'],
        default: 'Enable'
    },
    show_msgtext_notifications: {
        type: String,
        enum: ['Enable','Disable'],
        default: 'Enable'
    },
    last_notification_seen_date:{
        type: Date,
    },
    headline:{
        type: String
    },
    headline:{
        type: String
    },
    currentposition:{
        type: Number
    },
    education_id:{
        type: Number
    },
    country_id:{
        type: String
    },
    city_id:{
        type: Number
    },
    industry_id:{
        type: Number
    },
    other_industry:{
        type: String
    },
    need_a_job:{
        type: String,
        enum: ['True','False'],
        default: 'True'
    },
    summary:{
        type: String,
    },
    fileupload:{
        type: String,
    },
    cvfile:{
        type: String,
    },
    relationship:{
        type: String,
        // enum: [null,'Single','In a relationship','Engaged','Married','In a civil union','Ina domestic partnership','In an open relationship','Separated','Divorced','Widowed','Its complicated'],
        // default:null
    },
    website:{
        type: String,
    },
    filter:{
        type: String,
    },
    lat:{
        type: Float,
    },
    long:{
        type: Float,
    },
    school_id:{
        type: Number,
    },
    nickname:{
        type: String,
    },
    chat_sound:{
        type: Boolean,
    },
    deactivation_type:{
        type: String,
    },
    deactivation_description    :{
        type: String,
    },
    chat_member_status:{
        type: String,
        enum:['online','offline'],
        default:'online'
    },
    chat_active_device:{
        type: String,
        // enum:['web','mobile'],
        // default:null
    },
    Notification_frequency:{
        type: String,
        enum:['every time','once a day','do not send'],
        default:'every time'
    },
    show_profile_education:{
        type: Boolean,
    },
    device_tocken:{
        type: String,
    },
    is_cv_upload_type:{
        type: Boolean,
    },
    cv_upload_type:{
        type: String,
    },
    updated_date:{
        type: Date,
    },
    endorsable:{
        type: Number,
    },
    storie_message_replay:{
        type: String,
        enum:['public','follow','off'],
        default:'public'
    },
    storie_saveto_camera_roll:{
        type: Number,
    },
    profile_intro_link:{
        type: String,
    },
    storie_archive_setting:{
        type: Number,
    },
    chat_status_update:{
        type: Date,
    },
    notification_post_like:{
        type: String,
        enum:['on','off','friend'],
        default:'on'
    },
    notification_post_comment:{
        type: String,
        enum:['on','off','friend'],
        default:'on'
    },notification_post_comment_like:{
        type: String,
        enum:['on','off','friend'],
        default:'on'
    },
    notification_photo_like_comment:{
        type: String,
        enum:['on','off','friend'],
        default:'on'
    },
    notification_add_friend:{
        type: String,
        enum:['on','off'],
        default:'on'
    },
    notification_friend_status:{
        type: String,
        enum:['on','off'],
        default:'on'
    },
    live_video_notification:{
        type: String,
        enum:['on','off'],
        default:'on'
    },
    message_notification:{
        type: String,
        enum:['on','off'],
        default:'on'
    },
    storie_sharing_message:{
        type: Number,
    },
    private_account:{
        type: Number,
    },
    login_type:{
        type: String,
        enum:['normal','google','facebook'],
        default:'normal'
    },
    profileimage:{
        type: String,
    },
    profilecover:{
        type: String,
    },
    social_token_id:{
        type: String,
    },

    // social_type: {
    //     type: String,
    //     enum: ['normal', 'facebook', 'google'],
    //     default: 'normal',
    //     required: true
    // },
    ActivePost: [ActivePostSchema],

    
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } });
user.pre('save', async function () {
    if (this.password) {
        this.password = md5(this.password)
    }
})
user.pre('update', async function () {
    const modifiedFields = this.getUpdate().$set.password;
    if (modifiedFields) {
        this.getUpdate().$set.password = md5(modifiedFields)
    }
    this.updated_date = new Date()
})
const UserModel = mongoose.model('members', user);
module.exports = UserModel

