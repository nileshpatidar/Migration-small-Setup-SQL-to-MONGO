const { mongoose } = require('../index');
const Schema = mongoose.Schema;
const PostImageModel = require('./PostimageSchema').schema
const PostLikeModel = require('./PostLikeSchema').schema

const PostSchema = new Schema({
    postimages: [PostImageModel],
    postlikes: {
        type: [PostLikeModel],
        default: []
    },
    post_type: {
        type: String
    },
    post_id: {
        type: Number
    },
    member_id: {
        type: String
    },

    post_year: {
        type: Number
    },
    desc: {
        type: String
    },
    location: {
        type: String
    },
    visibility: {
        type: String,
    },
    availability:{
        type: String,
        enum:['Active','Inactive' ],
        default:'Active'

    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    status:{
        type: String,
        enum:['Active','Inactive','Delete']
    },
    post_data: {
        type: Object,
        validate: object => {  
        let allowedKeys = ['post_title', 'category_id', 'payment_details', 'category_type','origional_Price','price','discount_offer','product_status','post_currency','kitchen','bathroom','room','sqft','rent_time_duration','start_budget','end_budget','exchange_with','job_type','job_time_duration','opportunity_salary','give_subcategorytype','comment_model','start_datetime','end_datetime','courtesy','amount','ticket_information','hosted_by','album_pick_date','album_type'];
            let correctKeys = Object.keys(object).every(key => allowedKeys.includes(key)); //make sure all keys are inside `allowedKeys`
            return correctKeys ;
    }
},
}, { timestamps: { createdAt: 'create_date' } });

PostSchema.pre('save', async function () {
    
    // _id = mongoose.Types.ObjectId(this._id)
    if (this.post_type === 'give') {
        this.post_data = {
            post_title: this.post_data.post_title,
            payment_details: this.post_data.payment_details,
            category_id: this.post_data.category_id,
        }
    } else if (this.post_type === 'trade') {
        this.post_data.category_type === 'Sell' ?
            this.post_data = {
                category_type: this.post_data.category_type,
                category_id: this.post_data.category_id,
                post_title: this.post_data.post_title,
                origional_Price: this.post_data.origional_Price,
                price: this.post_data.price,
                discount_offer: this.post_data.discount_offer,
                product_status: this.post_data.product_status,
                post_currency: this.post_data.post_currency,
                kitchen: this.post_data.kitchen,
                bathroom: this.post_data.bathroom,
                sqft: this.post_data.sqft,
                room: this.post_data.room,
            } :
            this.post_data.category_type === 'Rent' ?
                this.post_data = {
                    category_type: this.post_data.category_type,
                    category_id: this.post_data.category_id,
                    post_title: this.post_data.post_title,
                    price: this.post_data.price,
                    post_currency: this.post_data.post_currency,
                    rent_time_duration: this.post_data.rent_time_duration,
                    kitchen: this.post_data.kitchen,
                    bathroom: this.post_data.bathroom,
                    sqft: this.post_data.sqft,
                    room: this.post_data.room,

                } : this.post_data.category_type === 'Wanted' ?
                    this.post_data = {
                        category_type: this.post_data.category_type,
                        category_id: this.post_data.category_id,
                        post_title: this.post_data.post_title,
                        // price: this.post_data.price,
                        post_currency: this.post_data.post_currency,
                        start_budget: this.post_data.start_budget,
                        end_budget: this.post_data.end_budget,
                        kitchen: this.post_data.kitchen,
                        bathroom: this.post_data.bathroom,
                        sqft: this.post_data.sqft,
                        room: this.post_data.room,
                    }
                    : this.post_data.category_type === 'Exchange' ?
                        this.post_data = {
                            category_type: this.post_data.category_type,
                            category_id: this.post_data.category_id,
                            post_title: this.post_data.post_title,
                            exchange_with: this.post_data.exchange_with,
                        } :
                        this.post_data = {}

    } else if (this.post_type === 'opportunity') {
        this.post_data = {
            category_type: this.post_data.category_type,
            category_id: this.post_data.category_id,
            post_title: this.post_data.post_title,
            post_currency: this.post_data.post_currency,
            job_type: this.post_data.job_type,
            job_time_duration: this.post_data.job_time_duration ? this.post_data.job_time_duration : 'Per Hour',


        }
        this.post_data.category_type === 'give_opportunity' ?
            this.post_data = {
                ...this.post_data,
                opportunity_salary: this.post_data.opportunity_salary,//give only
                give_subcategorytype: this.post_data.give_subcategorytype,//give only
            } :
            this.post_data = {
                ...this.post_data
            }
    } else if (this.post_type === 'fillme') {
        this.post_data = {
            category_type: this.post_data.category_type,
            post_title: this.post_data.post_title
        }
    } else if (this.post_type === 'snapit') {
        this.post_data = {
            comment_model: this.post_data.comment_model,
        }
    } else if (this.post_type === 'create') {
        this.post_data = {
            post_title: this.post_data.post_title,
            payment_details: this.post_data.payment_details,
            category_id: this.post_data.category_id,
            start_datetime: this.post_data.start_datetime,
            end_datetime: this.post_data.end_datetime,
            category_type: this.post_data.category_type,
            courtesy: this.post_data.courtesy,
            amount: this.post_data.amount,
            ticket_information: this.post_data.ticket_information,
            hosted_by: this.post_data.hosted_by,
            post_currency: this.post_data.post_currency,
        }

    }  else if (this.post_type === 'situation_room') {
        this.post_data = {
            post_title: this.post_data.post_title,
            category_id: this.post_data.category_id,
            amount: this.post_data.amount,
            post_currency: this.post_data.post_currency,
            category_type: this.post_data.category_type,
        }
    }else if (this.post_type === 'album') {
        this.post_data = {
            post_title: this.post_data.post_title,
            album_pick_date: this.post_data.album_pick_date,
            album_type: this.post_data.album_type,
        }
    }
})

const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel
  