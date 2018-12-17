//测试进度条方法
// NProgress.start(); //开启进度条

// setInterval(function () {
//     //结束进度条
//     NProgress.done();
// }, 2000)


// 需求:在第一个ajax发送的时候,开启进度条
//在全部的ajax回来的时候,关闭进度条

//ajax全局事件  
// .ajaxComplete() 当每个ajax完成时,调用 (不管成功还是失败)
// .ajaxError()    当ajax返回失败时调用
// .ajaxSuccess()  当ajax返回成功时调用
// .ajaxSend()     当ajax发送前调用

// .ajaxStart()    当第一个ajax发送时调用
// .ajaxStop()     当全部的ajax请求完成时调用

$(document).ajaxStart(function () {
    //第一个ajax发送时,开启进度条
    NProgress.start();
})

// 当全部的ajax请求完成时结束进度条
$(document).ajaxStop(function () {
    //模拟网络延迟
    setInterval(function () {
        //结束进度条
        NProgress.done();
    }, 2000)
})