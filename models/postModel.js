const conn = require('../utils/myconn.js');

exports.getAllPost = (obj, callback) => {
    var sql = `select posts.*,users.nickname,categories.name
                from posts
                join users on posts.user_id = users.id
                join categories on posts.category_id = categories.id
                where 1=1 ` 
                console.log(sql)  //添加恒成立,这样有一个好处: 后面进行的语句拼接的时候,不用考虑拼接where还是拼and,我们可以统一拼接and
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
            join categories on posts.category_id = categories.id`
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

