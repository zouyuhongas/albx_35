$(function () {
    function init() {
        $.ajax({
            url: '/getAllCate',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('tempLate', res))
            }
        })
    }
    init();
    // 添加编辑按钮的的委托事件
    $('tbody').on('click', '.btnedit', function () {
        // 使用自定义属性的意义在于获取数据的时候可以直接获取到对象
        var obj = $(this).data();
        // console.log(obj);
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#slug').val(obj.slug);
        $('.optinfo').text('编辑分类数据');
        $('.btnAdd').hide();
        $('.btnEdit').show();
    })

    $('.btnEdit').on('click', function () {
        console.log($('form').serialize())
        $.ajax({
            type: 'post',
            url: '/editCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)
                    $('.optinfo').text('添加分类数据')
                    $('.btnAdd').show()
                    $('.btnEdit').hide()
                    $('[name="id"]').val()
                    $('[name="name"]').val()
                    $('[name="slug"]').val()
                    init();
                }
            }
        })
    })

    // 分类数据的添加
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)

                    $('[name="name"]').val('');
                    $('[name="slug"]').val('');
                    init();
                }
            }


        })
    })

    // 分页数据的删除
    $('tbody').on('click', '.btndel', function () {
        if (confirm('你确定真的删除吗?')) {
            let id = $(this).data('id');
            console.log(id);
            $.ajax({
                url: '/delCateById?id=' + id,
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        $('alert-danger > span').text(res.msg)
                        $('alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                        init()
                    }
                }
            })
        }
    })

    // 添加全选全不选的
    $('.chkAll').on('click', function () {
        // 获取当前全选复选框的checked状态值
        let status = $('.chkAll').prop('checked');
        // 使用这个值给tbody的所有复选框的checked属性赋值
        $('tbody .chkSingle').prop('checked', status)
        // 判断tbody中被选中的复选框数,超过1,则显示批量删除 
        if ($('tbody .chkSingle:checked').length > 1) {
            $('.btndels').fadeIn(500)
        } else {
            $('.btndels').fadeOut(500)
        }
    })

    // 为tbody中的复选框加委托事件
    $('tbody').on('click', '.chkSingle', function () {
        // 1.获取所有被勾选到的复选框的数量
        let cnt = $('tbody .chkSingle:checked').length
        // 当前tbody中复选框中的数量
        let total = $('tbody .chkSingle').length;
        // 判断是否显示匹狼删除 
        if (cnt > 1) {
            $('.btndels').fadeIn(500)
        } else {
            $('.btndels').fadeOut(500)
        }
        // 3.判断是否让全选复选框也被选中
        if (cnt == total) {
            $('.chkAll').prop('checked', true);
        } else {
            $('.chkAll').prop('checked', false)
        }
    })

    $('.btndels').on('click',function(){
        if(confirm('是否刪除')){
            // 获取tboy复选框所有被选中的复选框
            var chks = $('tbody .chkSingle:checked')
            // 遍历所有复选框,获取复选框的对应id
            var ids =[];
            for(var i=0;i < chks.length;i++){
                ids.push(chks[i].dataset['id'])
            }
            // console.log(ids)
            // 发送ajax请求
            $.ajax({
                url :'/delCateById?id='+ids.join(','),
                dataType : 'json',
                success : function(res){
                    if(res.code ==200){
                        $('.alert-danger >span').text(res.msg)
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                        init();
                    }
                }
            })
        }
    })
})