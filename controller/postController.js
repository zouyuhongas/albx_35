// 获取文章列表数据
const postAllModel = require('../models/postModel');
// 时间格式的中间件
const moment = require('moment');

exports.getAllPost = (req,res) =>{
    // 获取用户的参数
    var obj = req.query;
    // 调用数据模块
    postAllModel.getAllPost(obj,(err,data)=>{
        if(err){
            res.json({code : 400,msg : '操作失败'});
        }else{
            for(var i =0; i < data.length;i++){
                // 转换时间的格式data数组里面中的created是数据库里的id名
                data[i].created = moment(data[i].created).format('YYY-MM-DD HH-mm-ss');
            }
            res.json({
                code : 200,
                msg : '操作成功',
                data : data
            })
        }
    })
}

exports.addPost = (req,res) =>{
    console.log(req,'??????????????')
    // 接收参数
    var obj = req.body;
    // 添加数据库所需要的三个字段的数据
    obj.views = 0;
    obj.likes = 0;
    obj.user_id = req.session.currentUser.id
    // 调用数据模块中的方法
    postAllModel.addPost(obj,(err)=>{
        if(err){
            console.log(err);
            res.json({code : 400,msg : '数据新增失败'})
        }else{
            res.json({
                code : 200,
                msg: '数据新增成功'
            })
        }
    })
}