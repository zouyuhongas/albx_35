const conn = require('../utils/myconn.js');

// 获取所有文章数据
// obj是分页查询参数对象
// 里面必须包含这两个成员
// obj.pageNum:当前页码--必需
// obj.pageSize:每页显示的记录数--必需
// obj.cate:分类id
// obj.stauts:状态
exports.getAllPost = (obj, callback) => {
    var sql = `select posts.*,users.nickname,categories.name
                from posts
                join users on posts.user_id = users.id
                join categories on posts.category_id = categories.id
                where 1=1 ` 
                 //添加恒成立,这样有一个好处: 后面进行的语句拼接的时候,不用考虑拼接where还是拼and,我们可以统一拼接and
    if (obj.cate && obj.cate != 'all') {
        sql += ` and  category_id = ${obj.cate}`
    }
    if (obj.status && obj.status != 'all') {
        sql += ` and post.status = '${obj.status}'`
    }
    sql += `  order by id desc  limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize};`


    conn.query(sql, (err, results) => {
        if (err) {
            callback(err);
        } else {
            sql = `select count(*) as cnt 
            from posts
            join users on posts.user_id = users.id
            join categories on posts.category_id = categories.id
            where 2=2 `
            // console.log(sql)
            conn.query(sql, (err2, res2) => {
               
                if (err2) {
                    callback(err2)
                } else {
                    callback(null, { data: results, total: res2[0].cnt })
                    
                }
            })
        }
    })
}

// 文章新增
exports.addPost = (obj,callback)=>{
    // 他会根据数据对象中的属性名称自动创建sql语句,语句中修改的字段名称就是数据对象的属性名称
    let sql =  `insert into posts values(null,'${obj.slug}','${obj.title}','${obj.feature}','${obj.created}','${obj.content}','${obj.views}','${obj.likes}','${obj.status}','${obj.user_id}','${obj.category_id}')`
    // 这里直接传入对象,不用再添加[]
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err);
        }else{
            callback(null)
        }
    })
}

// 根据id获取文章的详细数据
exports.getpostById = (id,callback)=>{
    var sql = `select * from posts where id =` +id;
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results[0])
        }
    })
}

// 根据id实现文章的编辑
exports.editPostById = (obj,callback)=>{
    var sql = `update posts set ? where id = ?`;
    // 使用时间委托来吧动态生成的结构进行编辑
    conn.query(sql,[obj,obj.id],(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null);
            // console.log()
        }
    })
}

// 根据文章的id实现文章删除
exports.delPostById = (id,callback)=>{
    var sql = 'delete from posts where id = ?';
    conn.query(sql,[id],(err)=>{
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}