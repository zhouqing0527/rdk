
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define(['echarts'], function(echarts) {

// data 是Graph的输入数据。
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是生成图形定义的辅助数据，默认值是应用的scope。
// 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
// 此时就需要用到这个对象来辅助

// GraphService 是一个函数集，主要提供了对二维数组的常用操作

// attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
return function(data, context, GraphService, attributes) {

return {
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            alignWithLabel:true,
            axisLabel:{ // 类轴刻度间隔
                interval:4
            },
            axisTick: {  //坐标轴刻度相关设置
              show:true,
              inside:true,
              interval:0,
              length:5,//刻度长短设置
              lineStyle:{
                     color:'#bbb',
               }

            },
            splitLine:{//网格线相关设置
               interval:0,//类目轴为true且为这个为0时才会显示
               lineStyle:{
                color:"#eee"
               }
            },
            data : data.header
        }
    ],
    yAxis : [
        {
            type:'value',
            max:3,
            axisTick:{
            show:false,
            },
            axisLine: {//轴线设置
                lineStyle: {
                    color: '#ccc'
                }
            },  
            min:0,
            axisLabel:{
              formatter: function(params){
                return  params.toFixed(1)=="0.0" ? "" : params.toFixed(1)+"%"
              }
            }
        }
    ],
    series : [
        {
            name: data.rowDescriptor[0],
            type:'line',
            connectNulls:true,
            smooth:true,
            symbolSize:[5,5],
            showAllSymbol:true,
            areaStyle: {normal: { color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ff7c24' // 0% 处的颜色
}, {
  offset: 1, color: '#fff' // 100% 处的颜色
}], false)}},
            data: data.data[0],
           
        }
    ]
};

}});