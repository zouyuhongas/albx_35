$(function(){
    $('.btnLogin').on('click',function(){
        $.ajax({
            type : 'post',
            url : '/login',
            dataType: 'json',
            data : $('form').serialize(),//serialize可以获取制定表单里的那么属性的表单元素的value值
            success : function(res){
                    if(res.code ==400){
                        // 如果错误显示错误信息
                        $('.alert-danger > span').text(res.msg);
                        // 淡入淡出的效果
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }else{
                        location.href = '/admin/index';

                    }
            }
        })
    })
})
