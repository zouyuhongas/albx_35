
var conn = require('../utils/myconn.js');

exports.getAllCate = (callback)=>{
    var sql = `select * from categories`;
    conn.query(sql,(err,data)=>{
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
    })

}