// 获取文章列表数据
const postAllModel = require('../models/postModel');
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