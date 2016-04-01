## Stage-1 task-12

 * [题目](http://ife.baidu.com/task/detail?taskId=12)
 * [需要实现的效果图](task_1_12_1.jpg)
 * [在线demo](http://hisimmer.com/IFE-2016/stage-1/task-12/)

### 小结 
4月1日更新

#### CSS3选择器

 * 巧妙的使用了css3 :target 选择器来实现点击效果
 * 使用CSS3 animation 来实现轮播图的自动播放
 * 注意结合CSS3伪类选择器和HTML的结构特性
 * 注意兼容性/添加浏览器前缀
 * :nth-child :nth-last-child :nth-type-of-child等CSS3选择器的区别
 * CSS注释 是 /* 这里是描述文字 */  而不是 // 
 * animation的timing-function是作用于每2个关键帧的，而不是整个过程
 * animation 和 transition的区别就是前者提供了一个动画的更多细节(通过制定关键帧来实现)


#### 额外收获
 * 当设置margin/padding的值为百分比时，其实都是相对于父元素的宽度值来计算的
 * 盒模型的水平/垂直格式化 margin/width/height 可以为auto  只有margin可以为负值
 * BFC/IE-Layout z-index的恩怨情仇

### 学习资料

 * [W3School - css选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)
 * [阮一峰－CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)