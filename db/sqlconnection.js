 
var mysql = require('mysql');

var MysqlCon = mysql.createConnection({
//    host:'hoookedup-development.c6kl1j7ko5en.us-east-1.rds.amazonaws.com',
//    user:'Administrator',
//    password:'4Vf^A+k8KcN?h-]v',
//    database:'hookedup_production',
//    charset:'utf8mb4',
//    debug    :  false

    host:'hoookedup-production.c6kl1j7ko5en.us-east-1.rds.amazonaws.com',
    user:'Administrator',
    password:'4Vf^A+k8KcN?h-]v',
    database:'hookedup_production',
    charset:'utf8mb4',
    debug    :  false
   });
   
   MysqlCon.connect(function(err) {
       if (err) throw err;
       console.log("Connected! Mysql  ");
   })
module.exports= MysqlCon
