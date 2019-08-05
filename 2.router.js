const express = require('express');

// 引入模块
const pagesController = require('./controller/pageController');
const userController = require('./controller/userController');
var router = express.Router();
// 添加静态页面
router.get('/admin/index',pagesController.getAdminIndexPage)
      .get('/index',pagesController.getIndexPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)
      .get('/admin/comments',pagesController.getAdminCommentsPage)
      .get('/admin/login',pagesController.getAdminLoginPage)
      .get('/admin/nav-menus',pagesController.getAdminNavMenusPage)
      .get('/admin/password-reset',pagesController.getAdminpasswordResetPage)
      .get('/admin/post-add',pagesController.getAdminPostAddPage)
      .get('/admin/posts',pagesController.getAdminPostsPage)
      .get('/admin/profile',pagesController.getAdminProfilePage)
      .get('/admin/settings',pagesController.getAdminSettingsPage)
      .get('/admin/slides',pagesController.getAdminSlidesPage)
      .get('/admin/users',pagesController.getAdminUsersPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/list',pagesController.getListPage)
      // 请求数据
      .post('/login',userController.login);
module.exports = router;
