const cateModel =require('../models/cateModel.js');

exports.getAllCate = (req,res)=>{
    cateModel.getAllCate((err,data)=>{
        console.log(data)
        if(err){
            res.json({code:400,msg: '操作失败'});
        }else{
            res.json({
                code : 200,
                msg : '操作成功',
                data : data
            })
        }
    })
}