 
var mysql = require('mysql');

var MysqlCon = mysql.createConnection({
//    host: 
//    user: 
//    password: 
//    database
//    charset:
//    debug    :

    
   });
   
   MysqlCon.connect(function(err) {
       if (err) throw err;
       console.log("Connected! Mysql  ");
   })
module.exports= MysqlCon
