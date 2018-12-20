$(function () {
    var currentPage = 1; //当前页
    var pageSize = 5; //当前条数

    //1.一进入页面,发送ajax请求,完成渲染
    render();

    function render() {

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('firstTpl', info);
                $('tbody').html(htmlstr);

                //根据返回数据,完成初始化
                $('#pagintor').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })
            }
        })
    }

    //2.给添加按钮注册点击事件 显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show');

    })

    //3.调用表单校验插件,完成校验
    $('#form').bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //检验字段
        fields: {
            //校验用户名，对应input表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        //提示信息
                        message: '请输入一级分类名称'
                    },

                }
            },
        }
    })

    //4.阻止默认的提交,通过ajax提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        //阻止默认提交 

        //发送ajax提交
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(), //表单序列化
            dataType: 'json',
            success: function (info) {
                console.log(info);

                if (info.success) {
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重新渲染第一页
                    currentPage = 1;
                    render();

                    //重置表单内容
                    //resetForm(true) 表示内容和状态都重置
                    //resetForm()  不传参只重置状态
                    $("#form").data('bootstrapValidator').resetForm(true); //获取表单校验实例
                }
            }
        })

    })

})