$(function () {
    //绘制柱状图
    // 基于准备好的dom，初始化echarts实例
    var eacharts_left = echarts.init(document.querySelector('.eacharts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        //大标题
        title: {
            //标题文本
            text: '2018年注册人数'
        },
        //提示框组件
        tooltip: {},
        //图例
        legend: {
            data: ['人数']
        },
        //X轴的数据
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        //y轴的数据 , y轴一般不配置,根据数据自动生成刻度
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar', // bar表示柱状图 line折线图 pie饼图
            data: [500, 400, 900, 200, 500, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    eacharts_left.setOption(option1);



    //绘制饼图
    // 基于准备好的dom，初始化echarts实例
    var eacharts_right = echarts.init(document.querySelector('.eacharts_right'));

    // 指定图表的配置项和数据
    var option2 = {
        //标题组件
        title: {
            //主标题文本
            text: '热门品牌销售',
            //副标题文本
            subtext: '2018年12月',
            //控制标题水平方向的位置
            x: 'center',
            //标题文本样式
            textStyle: {
                color: "red",
                fontSize: 20,
            }
        },
        //提示框组件
        tooltip: {
            trigger: 'item',
            //配置提示框的内容
            //{a}(系列名称), {b}(数据项名称) {c}(数值),{d}(百分比)
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例
        legend: {
            //设置对齐方式  horizontal 水平
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '新百伦', '李宁', '阿里王']
        },
        //系列列表
        series: [{
            name: '热门品牌',
            type: 'pie', //饼图
            radius: '55%', //圆的大小
            center: ['50%', '60%'], //圆心位置
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '新百伦'
                },
                {
                    value: 135,
                    name: '李宁'
                },
                {
                    value: 1548,
                    name: '阿里王'
                }
            ],
            //控制额外的阴影样式效果
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    eacharts_right.setOption(option2);
})