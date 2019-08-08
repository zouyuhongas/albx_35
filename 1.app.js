
// 引入模块
const express = require('express');   
// 创建服务器
const app = express();
const router = require('./2.router.js');
const session = require('express-session');
const bodyParser = require('body-parser')
// 绑定端口和ip
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})

// app.get('/',(req,res)=>{
//     res.render('index.ejs');
// });
// 处理静态资源
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

// 设置默认模板
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
  // 加盐
  app.use(session({
    // 相当于一个加密秘钥,值可以是任意字符串
      secret: 'my_albx_35',
      // 强制session保存到session store中,不管Session有没有更新,都强制保存
      resave : false,
      // 强制没有'初始化'的session保存到storage中
      saveUninitialiazed: false
  }))
  // 处理post请求
  app.use(bodyParser.urlencoded({extended: false}))
  // 后期你可能会传递json格式字符串
  app.use(bodyParser.json())
  // 导航守卫
  // 重定向,有三种状态不用登陆
  // 1.登录页不用登陆
  // 2.登陆过的页面不用再登陆
  // 3.前面的3个页面不用登陆
app.use(function(req,res,next){
  if(req.session.isLogin && req.session.isLogin == 'true' || req.url =='/admin/login' || req.url.indexOf('/admin') == -1){
    next()
  }else{
    // 实现重定向
    res.redirect('/admin/login')
  }
})

app.use(router);
