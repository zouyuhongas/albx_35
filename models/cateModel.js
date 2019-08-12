
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

// 分类数据的编辑
exports.editCate = (obj,callback)=>{
    console.log(obj)
    var sql =  'update categories set ? where id = ?'
    conn.query(sql,[obj,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 分类数据的添加
exports.addCate =(obj,callback)=>{
    var sql = `insert into categories set ?`
    conn.query(sql,obj,(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现分类数据的删除
exports.delCateById = (ids,callback) =>{
    var sql =`delete from categories where id in (${ids})`
    conn.query(sql,(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}