$(function(){
    // 选择文件就开始文件的上传操作
    $('#feature').on('change',function(){
        // 经典: formdata + ajax
        // 使用formdata收集图片数据
        // 使用ajax发送请求
        // 1.获取文件对象
        var myfile = document.querySelector('#feature').files[0];
        // 创建formdata对象
        var formdata = new FormData();
        // 在formdata里面追加对象
        formdata.append('img',myfile);
        formdata.append('username',"名字叫：jackandrose")
        // 发起ajax请求
        $.ajax({
            type : 'post',
            url : '/uploadFile',
            data : formdata,
            contentType : false,
            processData : false,
            dataType : 'json',
            success : function(res){
                // console.log(res);
                if(res.code ==200){
                    $('.thumbnail').attr('src','/uploads/'+res.img).show();
                    $('[name="feature"]').val(res.img)
                }else{
                    $('.alert-danger > span').text(res.msg).fadeIn(500).delay(3000).fadeOut(500);
                }
            }
        })

    })

    // ajax请求
    $.ajax({
        type : 'get',
        url : '/getAllCate',
        dataType : 'json',
        success : function(res){
            // console.log(res);
            // 生成分类下拉列表动态结构
            var str = `<option value="all">所有分类</option>`;
            for(var i=0; i < res.data.length;i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('#category').html(str);
        }
    })

    // 创建ckeditor富文本框控件替换页面中的textarea
    // 他会创建一个富文本框对象
    CKEDITOR.replace('content');

    // 保存文件
    $('.btnsave').on('click',function(e){
        e.preventDefault()
        // 同步数据到textarea
        CKEDITOR.instances.content.updateElement();
        console.log($('form').serialize());
        $.ajax({
            type : 'post',
            url : '/addPost',
            data : $('form').serialize(),
            dataType : 'json',
            success : function(res){
                if(res.code ==200){
                    // 提示
                    //跳转
                    location.href = '/admin/posts'
                }else{
                    console.log(res.msg);
                }
            }
        })
    })


})