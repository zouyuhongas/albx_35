$(function(){
    $.ajax({
        url : '/getAllPost',
        type : 'get',
        data : {
            pageNum : 1,  //当前页数
            pageSize : 3 //当页最大显示条数
        },
        success: function(result){
            var html = template('temp',result);
            console.log(html)
            $('tbody').html(html)
        }
        
    })
})