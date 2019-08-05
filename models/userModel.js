var mysql = require('mysql');

var conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'baixiu'
})

exports.login = (email,callback)=>{
    // 创建mysql语句
    var sql = `select * from users where email = "${email}"`;
    // 调用mysql模块
    conn.query(sql,(err,results)=>{
        if(err){
            // 一把都先验证是否错误先
            callback(err);
        }else{
            // results一般返回的都是一个结果集(数组),如果有数据就只有一条数据
            callback(null,results[0]);
        }
    })
}