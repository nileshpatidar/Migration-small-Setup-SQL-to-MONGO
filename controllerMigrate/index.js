const MysqlCon = require('../db/sqlconnection');
const db = require('../db/index');
const postSchema = require('../db/models/PostSchema');
const { memberupdatetableEventHandler ,posttableEventHandler, postCommentTableEvent, memberTableEvent, ConnectionWithFollow, postupdatetableEventHandler } = require('./postmigrate');
const { mongoose } = require('../db/index')
var pluralize = require('pluralize')

module.exports.migrate = function (req, res) {
    if (req.query.code === '420') {
        MysqlCon.query("show full tables where Table_Type = 'BASE TABLE';", function (error, results, fields) {
            if (error) throw error;
            //   var tables = [];
            var jobs = 0;
            results.forEach(async function (row) {
                for (var key in row) {
                    if (row.hasOwnProperty(key)) {
                        if (key.startsWith('Tables_in')) {
                            ++jobs;
                            var collection = mongoose.connection.db.collection(row[key]);

                            if (row[key] === 'post') {
                                posttableEventHandler(MysqlCon, row[key], collection).then(res => {
                                    --jobs;
                                }).catch(error => {
                                    if (error) throw error;
                                })
                            } else if (row[key] === 'post_comment') {
                                postCommentTableEvent(MysqlCon, row[key], 'post_comments').then(res => {
                                    --jobs;
                                }).catch(error => {
                                    if (error) throw error;
                                })
                            } else if (row[key] === 'member') {
                                memberTableEvent(MysqlCon, row[key], 'members').then(res => {
                                    --jobs;
                                }).catch(error => {
                                    if (error) throw error;
                                })
                            } else
                                if (row[key] === 'connection') {
                                    ConnectionWithFollow(MysqlCon, row[key], 'connections').then(res => {
                                        --jobs;
                                    }).catch(error => {
                                        if (error) throw error;
                                    })
                                } else {
                                    if (row[key] === 'post_image' || row[key] === 'follow' || row[key] === 'follow_filter' || row[key] === 'follow_filter1' || row[key] === 'post_comment_like' || row[key] === 'post_image_comment' || row[key] === 'post_image_comment_like' || row[key] === 'post_image_like' || row[key] === 'post_like') {
                                        console.log('' + row[key] + ' executed done!!!');
                                        --jobs
                                    } else {
                                        mongoose.connection.db.collection(pluralize.plural(row[key]), function (err, collection) {
                                            var sql = 'SELECT * FROM ' + row[key] + ';';
                                            MysqlCon.query(sql, function (error, results, fields) {
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    if (results.length > 0) {
                                                        collection.insertMany(results, {}, function (error, res) {
                                                            if (error) {
                                                                console.log(error);
                                                            } else {
                                                                --jobs
                                                                console.log('' + sql + ' executed collection !!!');
                                                            }
                                                        });
                                                    } else {
                                                        --jobs
                                                        console.log('' + sql + ' executed collection!!!');
                                                    }
                                                }
                                            });

                                        });
                                    }
                                }
                        }
                    }
                }
            });
            var interval = setInterval(function () {
                if (jobs <= 0) {
                    clearInterval(interval);
                    console.log('done!');
                    db.close();
                    MysqlCon.end();
                }
            }, 300);
        })
    } else {
        return res.send("O... O .... Code shi Daal")
    }
}

module.exports.data = {
    postupdate: async function (req, res) {
        if (req.query.code === '420') {
            var collection = mongoose.connection.db.collection('post');
            postupdatetableEventHandler(MysqlCon, 'post',collection).then(r => {
                return res.status(200).send({ message:`post collection Updated` });
            }).catch(error => {
                if (error) throw error;
            })
        } else {
            return res.send("Ohh... Oooo .... Code shi Daal")
        }
    },
    memberupdate: async function (req, res) {
        if (req.query.code === '420') {
            var collection = mongoose.connection.db.collection('member');
            memberupdatetableEventHandler(MysqlCon, 'member',collection).then(r => {
                return res.status(200).send({ message:`member collection Updated` });
            }).catch(error => {
                if (error) throw error;
            })
        } else {
            return res.send("Ohh... Oooo .... Code shi Daal")
        }
    },
} 
  