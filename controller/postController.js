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

// 根据Id获取文章的详细数据
exports.getpostById = (req,res) =>{
    var id = req.query.id;
    postAllModel.getpostById(id,(err,data)=>{
        if(err){
            res.json({code : 400, msg:'数据新增失败'})
        }else{
            data.created = moment(data.created).format('YYY-MM-DDTHH:mm')
            res.json({
                code : 200,
                msg: '数据新增成功',
                data : data
            })
        }
    })
}
// 实现文章的修改
exports.editPostById = (req,res)=>{
    var obj = req.body;
    postModel.editPostById(obj,(err,)=>{
        if(err){
            res.json({code:400,msg:'文章编辑失败'})
        }else{
            res.json({
                code: 200,
                msg : '文章编辑成功',
            })
        }
    })
}

// 实现文章删除
exports.delPostById = (req,res)=>{
    var id = req.query.id
    console.log(id,1111111111111111111111);
    postModel.delPostById(id,(err)=>{
        if(err){
            res.json({code:400,msg:'文章删除失败'})
        }else{
            res.json({
                code : 200,
                msg : '文章删除成功'
            })
        }
    }) 
}