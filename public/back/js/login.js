$(function () {
    //进行表单校验规则
    // 1. 用户名不能为空 用户长度为6-12位
    // 2. 用户密码不能为空 用户密码长度为6-12位

    $('#form').bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove', //校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
        },

        // 配置校验字段:需要先给imput框配置name
        // fields：配置
        fields: {
            username: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        // 为空时显示的提示信息
                        message: "用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名必须是2-6位",

                    }
                }

            },
            password: {
                //配置校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    }
                }
            }
        }
    })
})