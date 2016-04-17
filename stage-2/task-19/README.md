## task-19  基础JavaScript练习（二）

 * [任务说明](http://ife.baidu.com/task/detail?taskId=19)
 * [在线demo](http://hisimmer.com/IFE-2016/stage-2/task-19/)

## 说明

 * 通过modernizr检测是否支持flex 如果不支持根据html标签上的no-flexbox 来编写兼容样式，使得可视化区域内的柱状图不会换行
 * 构建了一个构造起`Chart` 可以传入多种相应的参数 包括改变渲染间隔 渲染柱状图颜色 等可以自定义
 * 通过`innerHTML`来强制reRender 这个做法会相应影响浏览器性能 
 * 在`Chart.prototype.insertSort`排序算法中 通过巧妙使用`arguments.call`和 `setTimeout`来展现 算法排序的过程(间隔渲染算法实现的每一步)
 * 通过`Chart.prototype.init`初始化，包括绑定各种按钮回调事件和柱状图父盒的点击代理事件
 * 通过`Chart.prototype.validator` 来对包括判断当前是否正在渲染、input框的值 和 当前队列的数量进行验证
 * 设置了2个标志位 `isBusy`和`dataChange`来判断当前是否正在渲染和当前数据是否改变(防止无意义的重复渲染)
 * `Chart.prototype.randoms`可以深度定制的生成一组制定范围内包含指定个数的数组

## 总结

 * 每一个柱状图的点击删除事件不仅要删除DOM，还得删除相对应的data数组，这里删除相对应的data数组中的项使用的是：通过遍历`parentNode.childNodes`中是否包含和点击事件相同的dom元素 `parentNode.childNodes[i] === e` 则保存i值，执行`this.data.splice(i,1)`
 * 尽可能提炼函数，让代码有较好的可读性
 * 很多时候，你一下没法想出所有的架构的，所以你的先相处大概的方向，然后再一步步的具体实现，然后就对可以优化的地方来进行进一步优化，写下总结，这种学习的感觉就很充实

经过此次对于排序算法实现及相应的数据可视化实现，对于可视化方面和javascript的基础更加的了解。

