## task-29  表单（一）单个表单项的检验

 * [任务说明](http://ife.baidu.com/task/detail?taskId=29)
 * [在线demo](http://hisimmer.com/IFE-2016/stage-2/task-29/)

## 小结

 * input的autofocus属性可以自动获得当前的焦点
 * 通过为表单元素设置name熟悉可以通过表单DOM.name的形式来获得input等dom对象
 * 在字符串的判断上，通过使用`charCodeAt()`来判断当前字符是否是中文字符从而得到当前输入值的真实字符长度，直接访问string.length得到的是字符的个数 例如 `"你好".length === 2`   charCode 的值在0~127之间为英文字符
 * 表单中的`button`验证按钮有默认的提交行为，这个时候需要在`button`的点击回调函数中显示的阻止这个默认行为。
 * 通过策略模式来实现，好处是利于代码复用，调用的逻辑清晰简单。

