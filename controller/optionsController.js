const optionsModel = require('../models/optionsModel');


exports.addMenu = (req,res)=>{
var obj = req.body;
obj.icon = 'fa fa-glass'
optionsModel.addMenu(obj,(err)=>{
    if(err){
        res.json({
            code : 400,
            msg : '数据新增失败'
        })
    }else{
        res.json({
            code : 200,
            msg : '数据新增成功'
        })
    }
})
}

