$(function(){
    $.ajax({
        url : '/getAllCate',
        dataType : 'json',
        success : function(res){
            $('tbody').html(template('tempLate',res))
        }
    })
    // 添加编辑按钮的的委托事件
    $('tbody').on('click','.btnedit',function(){
        // 使用自定义属性的意义在于获取数据的时候可以直接获取到对象
        var obj = $(this).data();
        console.log(obj);
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#slug').val(obj.slug);
        $('.optinfo').text('编辑分类数据');
        $('.btnAdd').hide();
        $('.btnEdit').show();
    })
})