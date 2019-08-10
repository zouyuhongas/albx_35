// 这个模块用来专门上传文件的
const formidable = require('formidable');

var path = require('path');

exports.uploadFile =(req,res) =>{
    // 使用formidable来实现文件上传
    // 声明一个变量来装文件
    var form = new formidable.IncomingForm();
    // 设置编码,这个编码的设置与文件上传没有本质关系,支部过formibable可以传递普通的键值对,所以需要设置这些参数的编码
    form.encoding = 'utf-8';
    // 设置文件存储的目录
    form.uploadDir = __dirname + '/../uploads';
//  设置保留文件的扩展名
   form.keepExtensions = true;
//    调用方法实现文件上传
    // req:请求报文 
    // err:错误信息
    // Fields：普通键值对
    // files: 文件上传完成之后的相关信息,主要存储上传成功之后的信息
    form.parse(req,(err,fields,files)=>{
        if(err){ 
            res.json({
                code: 400,
                msg : '文件上传失败'
            })
        }else{
            var imgname = path.basename(files.img.path)
            res.json({
                code : 200,
                msg : '文件上传成功',
                img: imgname
            })
        }
    })
}