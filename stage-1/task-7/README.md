## Stage-1 task-07

 * 题目
 * 要求


### 第一次编写总结

 * 使用CSS雪碧图的时候要规划好整体的icon图标的位置，要易于background-position的计算(同一类的icon尽量放到同一个行)
 * 在动手之前要对PSD的整体有一个大致的了解，然后进行样式的规划。包括基本样式/布局样式/可复用的样式等
 * CSS2.1 ＋ 兄弟选择器，只能选择出现在后面的第一个元素
 * CSS3 ~ 选择器 选择出现在指定元素后面的元素
 * 兼容性的考据可以参考[Can I Use](http://caniuse.com/)
 * CSS3 box-sizing属性的兼容性 IE8+ 有border-box 和content-box的区别 但是firefox依旧支持呗废弃的padding-box
 * border-color的妙用 减少浏览器的重排 
 * background-size 兼容性IE9+ 不支持background缩写赋值
 * 面对对象的CSS 选择器和内容分类易于重复利用
 * 命名采用BEM block-element-modifier  分区块－元素－修饰
 * 在开始之前要花时间来思考如何编写才能使得css文件易于管理/维护/复用 针对具体的项目要有自己的见解

### 第一次编写暴露出的问题

 * inline-block这个属性还不是十分了解
 * 元素的行内框的细节部分
 * 常见的块级/行内块元素不是十分清楚
 * 应该合理运用CSS 确保最大的兼容性 比如CSS3属性添加浏览器私有前缀

