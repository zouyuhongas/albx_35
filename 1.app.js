
// 引入模块
const express = require('express');
// 创建服务器
const app = express();
const router = require('./2.router');

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
app.set('/views',__dirname+'views');


app.use(router);
