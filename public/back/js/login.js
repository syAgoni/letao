$(function() {
  //1.进行表单校验规则
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
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须是2-6位'
          },
          //callback 专门用来定制回调的提示内容的
          callback: {
            message: '用户名不存在'
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
            message: '密码长度必须是6-12位'
          },
          //callback 专门用来定制回调的提示内容的
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })

  // 2.注册表单校验成功事件,在校验成功时,会触发在事件中阻止默认的提交(会跳转),通过ajax进行提交(异步)
  $('#form').on('success.form.bv', function(e) {
    // 阻止默认提交
    e.preventDefault()
    console.log($('#form').serialize())

    // 通过ajax提交
    $.ajax({
      type: 'POST',
      url: '/employee/employeeLogin',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(info) {
        console.log(info.error)

        if (info.success) {
          //alert('登录成功')跳转页面
          location.href = 'index.html'
        }
        if (info.error === 1000) {
          //alert('用户名不存在')
          // 调用实例的更新校验方法  updateStatus 将校验状态更新失败
          //  参数1:字段名称(username)
          // 参数2：校验状态 NOT_VALIDATED：未校验的  VALIDATING：校验中的  INVALID ：校验失败的   VALID：校验成功的
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('username', 'INVALID', 'callback')
        }
        if (info.error === 1001) {
          //alert('密码错误')
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('password', 'INVALID', 'callback')
        }
      }
    })
  })

  //3.重置功能实现
  $('[type="reset"]').click(function() {
    console.log(111)
    //除了重置文本,还要重置校验状态
    $('#form')
      .data('bootstrapValidator')
      .resetForm()
  })
})
