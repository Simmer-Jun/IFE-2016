### Stage-1 task-8

 * [题目说明](http://ife.baidu.com/task/detail?taskId=8)
 * [在线demo](http://hisimmer.com/IFE-2016/stage-1/task-8/)

## 小结 
3月30更新

 * CSS3 `box-sizing` 有4个取值 分别是: `content-box`、 `border-box`、`inherit`、`initial` 其中`content-box`为CSS2.1属性  CSS3新增的`border-box`十分适合栅格布局，它代表着当一个块级元素设置了`box-sizing: border-box`，并且元素设置了百分比宽度(比如30%)的时候，能够保证元素的宽度为我们想要的值，不会发生溢出父容器的情况(当改元素显示的设置了paddign的时候其实是会将元素的content减少来使得元素的content+padding = 父元素宽度*30%)
 * 这里要注意`box-sizing`的兼容性  IE8+ 兼容IE8及以上 为了兼容更多的浏览器 最好带上相应的浏览器私有前缀
 * `visibility: hidden` 和 `display: none` 区别  前者只是视觉上的不现实，但是还会占用空间，后者浏览器不会对其进行渲染(不占用空间)
 * bootstrap的栅格布局考虑的更为周到具体包括
   * 外层容器的考虑，固定宽带的`container` 还是宽度不固定的`.container-fluid`
   * 指定行容器`.row` 这个与不指定行容器的栅格布局当然有区别，由于每一个列`col-*`都是浮动布局的，有了`.row`行容器能保证在这一行的开头和末尾都显示的换行（`.row`是一个块级元素）
   * 断点的多样化，使得我们的布局的只需要显示的在`layout`元素上添加相应的类名记忆能实现在不同的屏幕尺寸下的多样化布局。
   * 考虑到了留白只需要简单的添加类似`col-md-offset-2`就能在元素的左边添加外边距
   * 因为使用到了百分比宽度，所以可以很简单的实现栅格布局的嵌套
   * 更多的知识移步[这里](http://v4-alpha.getbootstrap.com/layout/grid/#how-it-works)
