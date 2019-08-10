const userModel = require('../models/userModel.js');

// 用户登录验证
exports.login = (req,res) =>{
    // req.body代表请求体
    var obj = req.body
    // 处理email的数据请求是否正确
    userModel.login(obj.email,(err,data)=>{
        // 如果数据错误,就返回错误信息
        if(err){
            // json可以将js对象转换为json格式字符串并返回
            res.json({code:400,msg:'服务器异常'});
        }else{
            // 如果正确在判断密码是否正确
            if(data){
                if(data.password == obj.password){
                    // 写入登录状态
                    req.session.isLogin = 'true';
                    // 将当前用户的对象存储到session
                    req.session.currentUser = data;
                    // console.log(req.session.currentUser,'================')
                    res.end(JSON.stringify({code:200,msg:'登陆成功'})) 
                }else{
                    res.json({code:400,msg:'密码错误'});
                }
            }else{
                res.json({code:400,msg:'邮箱错误'})
            }
        }
    })
}