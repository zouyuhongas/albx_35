const conn = require('../utils/myconn');
// 这个文件处理所有文章数据的操作

// 新增导航 菜单栏
exports.addMenu =(obj,callback)=>{
    // 查询所有menu的数据
    let sql = 'select value from `options` where id = 9'
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err)
        }else{
            let jsonStr = results[0].value
            // 将json格式字符串转换为json数组
            let arr = JSON.parse(jsonStr);
            // 将传入的数据对象添加到数组
            arr.push(obj)
            let  finalStr = JSON.stringify(arr)
            // 实现updata
            sql = 'updata option set value ? where id = 9'
            conn.query(sql,[finalStr],(err1)=>{
                if(err1){
                    callback(err1)
                }else{
                    callback(null)
                }
            })
        }
    })
}
