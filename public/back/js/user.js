$(function () {
    var currentPage = 1 //当前页
    var pageSize = 5
    var currentId //当前修改的用户id
    var isDelete //

    //一进入页面,发送ajax请求,请求数据,通过模板引擎完成渲染
    render()

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pagesize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info)
                // template(模板id,数据对象) 在模板中可以任意使用数据对象的所有属性
                var htmlstr = template('tpl', info)
                $('tbody').html(htmlstr)

                //根据返回的数据,实现动态渲染分页插件
                $('#pagintor').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    onPageClicked: function (a, b, c, page) {
                        //为页码绑定点击事件 page:当前点击的按钮值
                        console.log(page)
                        //更新当前页
                        currentPage = page
                        //重新渲染
                        render()
                    }
                })
            }
        })
    }
    //给所以的按钮,添加点击事件(通过事件委托注册)
    $('tbody').on('click', '.btn', function () {
        //点击显示模态框
        $('#userModal').modal('show')

        //获取存储的id
        currentId = $(this)
            .parent()
            .data('id')

        //1启用 0禁用,给后台传几 就是将用户改成对应状态
        //禁用按钮？0:1
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1

    })
    //点击模态框确认按钮,发送请求,完成启用禁用功能
    $('#submitBtn').click(function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    //修改成功
                    //关闭模态框
                    $('#userModal').modal('hide');
                    //重新渲染页面
                    render();
                }
            }
        })
    })
})