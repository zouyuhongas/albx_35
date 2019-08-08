
$(function(){
    // 获取元素
    let menuPosts = $('#menu-posts');
    let menuSettings = $('#menu-settings');

// 获取路由名称
let routerName = kenghuo.getRouterName(location.href)
// 判断条件是否满足
if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
    // 实现展开
    menuPosts.addClass('in').attr('aria-expanded',true);
    menuPosts.parent().find('.collapsed').removeClass('collapsed')
}
if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
    menuSettings.addClass('in').attr('aria-expanded',true);
}
$('#'+routerName).addClass('active')
})