const mongoose = require('mongoose')
mongoose.Promise = mongoose.Promise
// require('dotenv').config()
// const mongo_uri = 'mongodb://127.0.0.1/test'
const mongo_uri = "mongodb+srv://admin:admin@cluster0-prrym.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(process.env.MONGODB_URI, {
//     auth: {
//         user: process.env.MONGO_USER,
//         password: process.env.MONGO_PWD
//     }
// }, { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection;
// db.on('error', console.log.bind(console, 'connection error'));
// db.once('open', () => {
//     console.log('\nSuccessfully connected to Mongo!\n');
// });

mongoose.connect(mongo_uri, { useNewUrlParser: true,useUnifiedTopology: true  })
.then(res => console.log('connected mongodb done')).catch(err => console.log('error in mongodb : ', err))
// mongoose.model('Book',{})
module.exports = db
module.exports.mongoose = mongoose
