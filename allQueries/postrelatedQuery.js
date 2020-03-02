var data={
    postimage_withpost_Id:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
    postlike_withpost_Id:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
    postCommentLikes:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
    follow_filter:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
     
    profileupdateimage_withmember_id:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
    coverupdateimage_withmember_id:function(sql,db,callback){
        return new Promise((resolve,reject) => {
            db.query(sql,function (err,result){
                if(err){ reject(err); return;}
                resolve(result.length ? result :[]);
            });
        })
    },
}
module.exports=data;