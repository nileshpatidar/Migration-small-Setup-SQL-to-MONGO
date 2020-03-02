const postSchema = require('../db/models/PostSchema');
const PostCommentSchema = require('../db/models/PostCommentSchema');
const MemberSchema = require('../db/models/MemberSchema');
const ConnectionSchema = require('../db/models/ConnectionSchema');
const Query = require('../allQueries/postrelatedQuery');

//Create an event handler:
var posttableEventHandler = async function (mysqlConnection, tableName, mongoCollection) {
    var sql = 'SELECT * FROM ' + tableName + ';';
    var mongolastpost =await postSchema.find({}).sort({create_date:-1}).limit(1)
    if(mongolastpost.length){
        sql = 'SELECT * FROM ' + tableName + ' where post_id >'+mongolastpost[0].post_id+''
    }
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, results, fields) {
            if (error) {
                    console.log(`${tableName} err`,err );
                reject(error);
            } else {
                var jobs = 0;
                if (results.length > 0) {
                    var post = {}
                    for (var i = 0; i < results.length; i++) {
                        ++jobs;
                        // if (results[i].post_type === "opportunity"  ) {
                        if (results[i].post_type === 'give') {
                            post.post_data = {
                                post_title: post.post_title,
                                payment_details: post.payment_details,
                                category_id: post.category_id,
                            }
                        } else if (results[i].post_type === "opportunity") {
                            post.post_data = {
                                category_type: results[i].category_type,
                                category_id: results[i].category_id,
                                post_title: results[i].post_title,
                                post_currency: results[i].post_currency,
                                job_time_duration: results[i].job_time_duration,
                                job_type: results[i].job_type,
                                opportunity_salary: results[i].opportunity_salary
                            }
                            results[i].category_type === 'give_opportunity' ?
                                post.post_data = {
                                    ...post.post_data,
                                    opportunity_salary: post.opportunity_salary,//give only
                                    give_subcategorytype: post.give_subcategorytype,//give only
                                } :
                                post.post_data = {
                                    ...post.post_data
                                }
                        } else if (results[i].post_type === "trade") {
                            if (results[i].category_type === "Sell") {
                                post.post_data = {
                                    category_type: results[i].category_type,
                                    category_id: results[i].category_id,
                                    post_title: results[i].post_title,
                                    origional_Price: results[i].origional_Price,
                                    discount_offer: results[i].discount_offer,
                                    post_currency: results[i].post_currency,
                                    price: results[i].price,
                                    product_status: results[i].product_status,
                                    kitchen: results[i].kitchen,
                                    bathroom: results[i].bathroom,
                                    sqft: results[i].sqft,
                                    room: results[i].room,
                                }
                            } else if (results[i].category_type === "Rent") {
                                post.post_data = {
                                    category_type: results[i].category_type,
                                    category_id: results[i].category_id,
                                    post_title: results[i].post_title,
                                    price: results[i].price,
                                    post_currency: results[i].post_currency,
                                    rent_time_duration: results[i].rent_time_duration,
                                    kitchen: results[i].kitchen,
                                    bathroom: results[i].bathroom,
                                    sqft: results[i].sqft,
                                    room: results[i].room,
                                }
                            } else if (results[i].category_type === "Wanted") {
                                post.post_data = {
                                    category_type: results[i].category_type,
                                    category_id: results[i].category_id,
                                    post_title: results[i].post_title,
                                    post_currency: results[i].post_currency,
                                    start_budget: results[i].start_budget,
                                    end_budget: results[i].end_budget,
                                    kitchen: results[i].kitchen,
                                    bathroom: results[i].bathroom,
                                    sqft: results[i].sqft,
                                    room: results[i].room,
                                }
                            } else if (results[i].category_type === "Exchange") {
                                post.post_data = {
                                    category_type: results[i].category_type,
                                    category_id: results[i].category_id,
                                    post_title: results[i].post_title,
                                    exchange_with: results[i].exchange_with,
                                }
                            }
                        } else if (results[i].post_type === "fillme") {
                            post.post_data = {
                                category_type: results[i].category_type,
                                post_title: results[i].post_title,
                            }
                        } else if (results[i].post_type === "snapit") {
                            post.post_data = {
                                comment_model: results[i].comment_model,
                                post_title: results[i].post_title,
                            }
                        } else if (results[i].post_type === "create") {
                            post.post_data = {
                                category_id: results[i].category_id,
                                start_datetime: results[i].start_datetime,
                                payment_details: results[i].payment_details,
                                end_datetime: results[i].end_datetime,
                                category_type: results[i].category_type,
                                courtesy: results[i].courtesy,
                                amount: results[i].amount,
                                ticket_information: results[i].ticket_information,
                                hosted_by: results[i].hosted_by,
                                post_currency: results[i].post_currency,
                                post_title: results[i].post_title,
                            }
                        } else if (results[i].post_type === "situation_room") {
                            post.post_data = {
                                post_title: results[i].post_title,
                                category_id: results[i].category_id,
                                amount: results[i].amount,
                                post_currency: results[i].post_currency,
                                category_type: results[i].category_type,
                            }
                        } else if (this.post_type === 'album') {
                            post.post_data = {
                                post_title: results[i].post_title,
                                album_pick_date: results[i].album_pick_date,
                                album_type: results[i].album_type,
                            }
                        }else{
                        post.post_data = {}
                        }
                        post.post_id = results[i].post_id,
                        post.member_id = results[i].member_id,
                            post.post_type = results[i].post_type,
                            post.post_year = results[i].post_year,
                            post.location = results[i].location,
                            post.desc = results[i].desc
                            post.create_date = results[i].create_date
                            post.status = results[i].status
                            post.visibility = results[i].visibility
                        var postimage_withpost_Id = 'SELECT * FROM post_image where post_id =' + results[i].post_id + '';
                        var postlike_withpost_Id = 'SELECT * FROM post_like where post_id =' + results[i].post_id + '';

                        post.postimages = await Query.postimage_withpost_Id(postimage_withpost_Id, mysqlConnection)
                        post.postlikes = await Query.postlike_withpost_Id(postlike_withpost_Id, mysqlConnection)
                        await new postSchema(post).save().then(res => {
                            --jobs;
                        }).catch(err=>{
                            console.log("nilesh",err ,post);
                        });
                    }

                } else {
                    resolve(null);
                }
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed done!!!');
                        resolve(null);

                    }
                }, 300);
            }
    }) 
})
}

const postCommentTableEvent = async function (mysqlConnection, tableName, mongoCollection) {
    var mongolastpost =await PostCommentSchema.find({}).sort({create_date:-1}).limit(1)
    if(mongolastpost.length){
        var  sql = 'SELECT * FROM ' + tableName + ' where post_comment_id >'+mongolastpost[0].post_comment_id+''
    }else{
        var sql = 'SELECT * FROM ' + tableName + ';';
    }
    var sql = 'SELECT * FROM ' + tableName + ';';
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, postComment, fields) {
            if (error) {
                reject(error);
            } else {
                var jobs = 0;
                if (postComment.length > 0) {
                    ++jobs;
                    for (var i = 0; i < postComment.length; i++) {
                        const postCommentLike_withC_Id = 'SELECT * FROM  post_comment_like where post_comment_id ='+postComment[i].post_comment_id+'';
                        postComment[i].postCommentLikes = await Query.postCommentLikes(postCommentLike_withC_Id, mysqlConnection)
                    }
                    
                    PostCommentSchema.insertMany(postComment, {}, function (error,res) {
                        if (error) {
                            console.log(error);
                        }  
                        --jobs
                    });
                } else {
                    resolve(null);
                }
    
                    
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed done!!!');
                        resolve(null);
                    }
                }, 300);
            }
        });
    }) 
}

const memberTableEvent=  async function (mysqlConnection, tableName, mongoCollection){
    var mongolastpost =await MemberSchema.find({}).sort({created_date:-1}).limit(1)
    if(mongolastpost.length){
        var ID =mongolastpost[0]._id
        ID = toString(ID)
        var  sql = 'SELECT * FROM ' + tableName + ' where member_id > "'+ID+'"'
    }else{
        var sql = 'SELECT * FROM ' + tableName + '   ;';
    }
    
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, members, fields) {
            if (error) {
                reject(error);
            } else {
                var jobs = 0;
                if (members.length > 0) {
                    ++jobs;
                    // allowedKeys = ['hoookedup', 'fillme', 'snapit', 'give','create','trade','opportunity','turnup','situation_room','good_deeds'];
                    for (var i = 0; i < members.length; i++) {
                       var  ActivePost=[]
                       members[i]._id =members[i].member_id
                        if(members[i].hoookedup){
                            ActivePost.push({
                                ModuleName:  'hoookedup',
                                status:members[i].hoookedup,
                                updated_date: members[i].updated_date
                            })
                        }
                        if(members[i].fillme){
                            ActivePost.push({
                                ModuleName:  'fillme',
                                status:members[i].fillme,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].snapit){
                            ActivePost.push({
                                ModuleName:  'snapit',
                                status:members[i].snapit,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].give){
                            ActivePost.push({
                                ModuleName:  'give',
                                status:members[i].give,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].create){
                            ActivePost.push({
                                ModuleName:  'create',
                                status:members[i].create,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].trade){
                            ActivePost.push({
                                ModuleName:  'trade',
                                status:members[i].trade,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].opportunity){
                            ActivePost.push({
                                ModuleName:  'opportunity',
                                status:members[i].opportunity,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].turnup){
                            ActivePost.push({
                                ModuleName:  'turnup',
                                status:members[i].turnup,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].situation_room){
                            ActivePost.push({
                                ModuleName:  'situation_room',
                                status:members[i].situation_room,
                                updated_date: members[i].updated_date
                            })
                        }
                         if(members[i].good_deeds){
                            ActivePost.push({
                                ModuleName:  'good_deeds',
                                status:members[i].good_deeds,
                                updated_date: members[i].updated_date
                            })
                        }
                        members[i].ActivePost=ActivePost
                    }
                    MemberSchema.insertMany(members, {}, function (error,res) {
                        if (error) return error  
                        --jobs
                    });
                } else {
                    resolve(null);
                }
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed done!!!');
                        resolve(null);
                    }
                }, 300);
            }
        });
    }) 
}

const ConnectionWithFollowFilterTableEvent = async function(mysqlConnection, tableName, mongoCollection){
    var mongolastpost =await ConnectionSchema.find({}).sort({connection_id:-1}).limit(1)
    if(mongolastpost.length){
        var  sql = 'SELECT * FROM ' + tableName + ' where connection_id > '+mongolastpost[0].connection_id+''
    }else{
        var sql = 'SELECT * FROM ' + tableName + ' ;';
    }
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, connections, fields) {
            if (error) {
                reject(error);
            } else {
                var jobs = 0;
                if (connections.length > 0) {
                    ++jobs;
                    // allowedKeys = ['hoookedup', 'fillme', 'snapit', 'give','create','trade','opportunity','turnup','situation_room','good_deeds'];
                    for (var i = 0; i < connections.length; i++) {
                        const followfilter_withC_Id = 'SELECT  DISTINCT post_type ,   follow_filter.status  FROM  follow_filter where follow_id='+connections[i].connection_id+'';
                        var followfilter  = await Query.follow_filter(followfilter_withC_Id, mysqlConnection)
                        if(followfilter.length){
                        var follow_filter =[]
                            followfilter.forEach(element => {
                                if(element.post_type != 'ask'){
                                    return  follow_filter.push(element)
                                }
                            });
                        }else{
                            follow_filter=[
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
                        }
                        console.log(follow_filter);

                        connections[i].follow_filter=follow_filter
                        
                }
                ConnectionSchema.insertMany(connections, {}, function (error,res) {
                        if (error) {
                            console.log(error);
                        }  
                        --jobs
                    });
                } else {
                    resolve(null);
                }
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed done!!!');
                        resolve(null);
                    }
                }, 300);
            }
        });
    }) 
}

 //Create an event handler:
var postupdatetableEventHandler = async function (mysqlConnection, tableName, mongoCollection) {
    var sql = 'SELECT * FROM ' + tableName + ';';
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, results, fields) {
            if (error) {
                    console.log(`${tableName} err`,err );
                reject(error);
            } else {
                var jobs = 0;
                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        
                        var postimage_withpost_Id = 'SELECT * FROM post_image where post_id =' + results[i].post_id + '';
                        var postimages = await Query.postimage_withpost_Id(postimage_withpost_Id, mysqlConnection)
                                    ++jobs;
                            postSchema.updateOne(
                                { post_id:results[i].post_id},
                                { $set: { "postimages":postimages}}).then((result) => {
                                    --jobs;
                            }).catch(err=>{
                            console.log("postimages",err);
                        });
                    }
                } else {
                    resolve(null);
                }
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed  !!!');
                         resolve(null);
                    }
                }, 300);
            }
    }) 
})
}

var memberupdatetableEventHandler = async function (mysqlConnection, tableName, mongoCollection) {
    var sql = 'SELECT * FROM ' + tableName + ';';
    return new Promise(function (resolve, reject) {
        mysqlConnection.query(sql, async function (error, results, fields) {
            if (error) {
                    console.log(`${tableName} err`,err );
                reject(error);
            } else {
                var jobs = 0;
                if (results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                                    ++jobs;
                        //     var profileupdate  = 'SELECT (SELECT image FROM  post_image where post.post_id = post_image.post_id and status="Active") as image FROM  post where post.post_type="Profile" and post.member_id ="' + results[i].member_id + '"  ORDER BY create_date DESC LIMIT 1 '
                        //     var postimages = await Query.profileupdateimage_withmember_id(profileupdate, mysqlConnection)

                        //     var profilecover  = 'SELECT (SELECT image FROM  post_image where post.post_id = post_image.post_id and status="Active") as coverimage FROM  post where post.post_type="Cover" and post.member_id ="' + results[i].member_id + '"  ORDER BY create_date DESC LIMIT 1 '
                        //     var profilecoverimage = await Query.coverupdateimage_withmember_id(profilecover, mysqlConnection)
                        //     const pimage =postimages.length ?postimages[0].image : null
                        //     const cimage =profilecoverimage.length ?profilecoverimage[0].coverimage : null
                        //     MemberSchema.updateOne(
                        //         { _id:results[i].member_id},
                        //         { $set: { profileimage:pimage,profilecover:cimage}}).then((result) => {
                        //             --jobs;
                        //     }).catch(err=>{
                        //     console.log("member",err);
                        // });
                        var login_type = results[i].login_type ?results[i].login_type:null
                            MemberSchema.updateOne(
                                { _id:results[i].member_id},
                                { $set: { login_type:login_type }}).then((result) => {
                                    --jobs;
                            }).catch(err=>{
                            console.log("member",err);
                        });
                    }
                } else {
                    resolve(null);
                }
                var interval = setInterval(function () {
                    if (jobs <= 0) {
                        clearInterval(interval);
                        console.log('' + tableName + ' executed  !!!');
                         resolve(null);
                    }
                }, 300);
            }
    }) 
})
}
//Assign the event handler to an event:
// eventEmitter.on('posttable', posttableEventHandler);
//Fire the 'scream' event:
// eventEmitter.emit('scream');



module.exports.posttableEventHandler = posttableEventHandler
module.exports.postupdatetableEventHandler = postupdatetableEventHandler
module.exports.postCommentTableEvent = postCommentTableEvent
module.exports.memberTableEvent = memberTableEvent
module.exports.ConnectionWithFollow = ConnectionWithFollowFilterTableEvent
module.exports.memberupdatetableEventHandler = memberupdatetableEventHandler


