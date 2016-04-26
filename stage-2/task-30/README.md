## task-29  表单（二）多个表单项的动态校验

 * [任务说明](http://ife.baidu.com/task/detail?taskId=30)
 * [在线demo](http://hisimmer.com/IFE-2016/stage-2/task-30/)

## 小结

 * 使用策略类完成题目要求，调用简单。
 * onblur事件，在chrome等浏览器中并不会发生事件冒泡，但是可以通过事件捕获来实现事件代理，只要显示的在`addEventListener`中将第三个参数改为`true`即可。
 * 在动手之前多考虑改使用哪一种方法，并且在HTML结构合理标签使用要结合语义。
 * 为了防止浏览器的大量重排/重绘 对于校验提醒最好事先就先定义好位置。
 * 不要通过js直接操作css而是应该通过给element动态添加类名的方式。
 * 注意一些浏览器自带的默认行为，要通过`preventDefault`或者`returnValue`的形式来阻止浏览器的默认行为。
 * 函数运行在它所定义的环境，在多次运行同一个函数的时候，要保证不修改引用类型。像我实现的`validator.add`函数里面的`cache[name].push(function() {})` 这里的匿名函数有引用外层作用域的变量，但是注意在这个匿名函数内部对外层作用域变量的修改。