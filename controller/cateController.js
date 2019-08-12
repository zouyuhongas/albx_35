const cateModel =require('../models/cateModel.js');

exports.getAllCate = (req,res)=>{
    cateModel.getAllCate((err,data)=>{
        // console.log(data)
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

// 实现分类数据的编辑
exports.editCate = (req,res)=>{
    var obj = req.body;
    // console.log(obj)
    cateModel.editCate(obj,(err)=>{
        if(err){
            res.json({code:400,msg : '数据编辑失败'})
        }else{
            res.json({
                code : 200,
                msg : '数据编辑成功'
            })
        }
    })
}

// 分类数据的添加
exports.addCate = (req,res) =>{
    var obj = req.body;
    obj.id = null;
    cateModel.addCate(obj,(err)=>{
        if(err){
            res.json({code:400,msg:'数据添加失败'})
        }else{
            res.json({
                code : 200,
                msg : '数据添加成功'
            })
        }
    })
}

// 分类数据的删除
exports.delCateById = (req,res)=>{
    var id = req.query.id;
    cateModel.delCateById(id,(err)=>{
        if(err){
            res.json({code:400,msg: '数据删除失败'})
        }else{
            res.json({
                code : 200,
                msg : '数据删除成功'
            })
        }
    })
}