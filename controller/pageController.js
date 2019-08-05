// 前端页面
exports.getListPage = (req,res)=>{
    res.render('/list.ejs');
}
exports.getDetailPage = (req,res)=>{
    res.render('/detail.ejs');
}
exports.getIndexPage = (req,res)=>{
    res.render('/index.ejs');
}
// 后端管理页面
exports.getAdminIndexPage = (req,res)=>{

    if(req.session.isLogin && req.session.isLogin == 'true'){
        res.render('admin/index.ejs')
    }else{
        // 重定向 : 以响应头的方式来实现
        // 重定向: 让url重新指向一个新的值,本质上让url或者路由有一个变化
        res.writeHead(301,{
            'Location' : '/admin/login'
        })
        res.end();
    }

}
exports.getAdminCategoriesPage = (req,res)=>{
    res.render('admin/categories.ejs');
}
exports.getAdminCommentsPage = (req,res)=>{
    res.render('admin/comments.ejs');
}
exports.getAdminLoginPage = (req,res)=>{
    res.render('admin/login.ejs');
}
exports.getAdminNavMenusPage = (req,res)=>{
    res.render('admin/nav-menus.ejs');
}
exports.getAdminpasswordResetPage = (req,res)=>{
    res.render('admin/password-reset.ejs');
}
exports.getAdminPostAddPage = (req,res)=>{
    res.render('admin/post-add.ejs');
}
exports.getAdminPostsPage = (req,res)=>{
    res.render('admin/posts.ejs');
}
exports.getAdminProfilePage = (req,res)=>{
    res.render('admin/profile.ejs');
}
exports.getAdminSettingsPage = (req,res)=>{
    res.render('admin/settings.ejs');
}
exports.getAdminSlidesPage = (req,res)=>{
    res.render('admin/slides.ejs');
}
exports.getAdminUsersPage = (req,res)=>{
    res.render('admin/users.ejs');
}






