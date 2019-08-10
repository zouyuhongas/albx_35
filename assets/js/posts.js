$(function(){
var pageNum = 1;
var pageSize = 2;

    function init(search){
        $.ajax({
            url : '/getAllPost',
            type : 'get',
            data : {
                pageNum : pageNum,  //当前页数
                pageSize : pageSize, //当页最大显示条数
                ...search
            },
            success: function(result){
                // console.log(result)
                // 生成动态数据结构
                // 如果数组是对象,直接传递对象,如果数据是数组,就包装为对象
                var html = template('temp',result.data);
                // console.log(html)
                $('tbody').html(html)
                setPagenation(Math.ceil(result.data.total / pageSize))
            }
            
        })
    }
    init();

    // 实现分页的功能
    function setPagenation (total){
        // 初始化boot插件
        $('.pagination').bootstrapPaginator({
            // 配置声明
            bootstrapMajorVersion:3,
            currentPage : pageNum, //当前页码
            totalPages : total,  //总页数
            onPageClicked : function(even,originalEvent,type,page){
                // page就是你当前想要获取数据的页码
                // 修改全局的page
                pageNum = page
                // 重新调用加载数据的方法
                init();
            }
        })
    }

    // 加载分类数据
    $.ajax({
        type : 'get',
        url : '/getAllCate',
        dataType : 'json',
        success : function(res){
            // console.log(res);
            // 生成分类下拉列表动态结构
            var str = `<option value ="all">所有分类</option>`
            for(var i=0 ; i< res.data.length; i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('.cateSelector').html(str);
        }
    })
    // 实现筛选功能
    $('.btn-search').on('click',function(){
        var obj = {
            cate : $('.cateSelector').val(),
            status : $('.statuSelector').val()
        }
        console.log(obj)
        //    发起ajax请求
           init(obj);
    })


    // 实现文章删除
    $('tbody').on('click','.btnDel',function(){
        var id = $(this).data('id');
        console.log(111111111111)
        // 弹出确认框
        if(confirm('请问是否真的要删除')){
            $.ajax({
                url : '/delPostById?id='+id,
                type : 'get',
                dataType : 'json',
                success : function(res){
                    if(res.code ==200){
                        $('.alert-danger > span').text(res.msg)
                        $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)
                    }
                }
            })
        }
    })
})