window.onload = function() {
    var $ = window.$; // 减少作用域查找
    /*
    * @ Constructor Chart  构造器
    */
    var Chart = function(options) {
        options = options || {};
        // 按钮
        this.leftIn = $(options.leftIn || '#left-in');
        this.leftOut = $(options.leftOut || '#left-out');
        this.rightIn = $(options.rightIn || '#right-in');
        this.rightOut = $(options.rightOut || '#right-out');
        this.sortBtn = $(options.sortBtn || '#sort-btn'); // 排序种类按钮
        // 输入框
        this.inputDom = $(options.input || '#input');
        // random btn
        this.randomBtn = $(options.randomBtn || '#random');

        // 其他配置项初始化
        this.data = this.randoms({length: 30});
        this.char = $(options.char || '.char'); // 表格父类
        this.colors = options.colors || ['#ff7073', '#4fb3a4', '#fff094']; // 颜色
        this.heightBase = 3; // 柱状图基础高度为10
        this.interval = options.interval || 100; // 渲染间隔
        this.isBusy = false; // 忙标记
        this.dataChange = true;

        this.init(); // 初始化
    };
    Chart.prototype.init = function() {
        /* 
        * init函数职责：
        *    1 绑定按钮点击事件
        *    2 绑定删除item的事件代理
        *    3 定义了2个工具函数，功能是判断当前是否在渲染和当前队列是否满员
        */
        //绑定事件
        var self = this; // save this important 事件中this不会执行当前作用域的this
        $.eventUtil.on(this.leftIn, 'click', function() { // 左进
            var item ;
            if(self.validator('inStack')) {
                item = self.inputDom.value;
                self.data.unshift(item);
                self.render(self.data);
                self.dataChange = true;
            };
        });
        $.eventUtil.on(this.leftOut, 'click', function() { // 左出
            if(self.validator('outStack')) {
                var value = self.data.shift();
                alert('移除:' + value);
                self.render(self.data);
            }
            
        });
        $.eventUtil.on(this.rightIn, 'click', function() { //  右进
            var item;
            if(self.validator('inStack')) {
                item = self.inputDom.value;
                self.data.push(item);
                self.render(self.data);
                self.dataChange = true;
            }; 
        });
        $.eventUtil.on(this.rightOut, 'click', function() { // 右出
            if(self.validator('outStack')) {
                var value = self.data.pop();
                alert('移除:' + value);
                self.render(self.data);
            }    
        });
        $.eventUtil.on(this.randomBtn, 'click', function() { // 随机按钮点击
            if(isRendering()) return;
            self.data = self.randoms();
            self.render(self.data); // 初始化渲染
            self.dataChange = true; // 数据改变
        });
        $.eventUtil.on(this.sortBtn, 'click', function() { // 插入排序开始按钮
            if(!self.dataChange) {
                alert('数据没有变化，无需重复渲染~');
                return;
            };
            self.isBusy = true; // 开始排序渲染 标记正忙 
            self.insertSort(self.data); // 开始插入排序
        });
        $.eventUtil.delegate('SPAN', self.char,'click', function(e) {// 事件代理
            e = e.srcElement || e.target;
            var parent = e.parentNode;
            var list = parent.childNodes; // 缓存
            for(var i = 0,l = list.length; i < l; i++) {
                if(list[i] === e) {
                    fn(e,i);
                    return;
                }
            }
            /*
            * @para ele  {DOM element}
            * @para index  {number}
            */
            function fn(ele,index) {
                var value = ele.getAttribute('data-value');
                alert('移除:' + value);
                self.data.splice(index, 1); // 删除data 项
                ele.parentNode.removeChild(e); // 移除DOM 
            }
        });
        /*
        * 判断当前是否正在渲染
        */
        function isRendering() {
            if(self.isBusy) {
                alert('正在渲染表格，请稍候再试～');
                return true;
            }
            return false;
        }
        this.render(this.data);
    }
    // 渲染图表 接收一组数组并将它的值渲染到相应的dom中
    Chart.prototype.render = function(arr) {
        //alert('run');
        var ret = '';
        var colors = this.colors;
        for(var i =0, l = arr.length; i < l; i++) {
            var color = chooseColors(arr[i]);
            ret += '<span style="height: ' + arr[i] * this.heightBase + 'px;background-color:' + color + '" data-value= '+ arr[i] + '>' + '</span>';
        }
        this.char.innerHTML = ret;
        // 选择当前div背景颜色
        function chooseColors(i) {
            if(i <= 40) return colors[0];
            if(i <= 70) return colors[1];
            if(i <= 100) return colors[2];
        }
    }
    // 快速排序 如何实现实时渲染？
    Chart.prototype.quickSort = function (arr) {
        var left,right;
        if(arr.length <= 1) return arr;
            left = [];
            right = [];
        var pivotIndex = Math.floor(arr.length/2);
        var pivot = arr.splice(pivotIndex, 1)[0]; // return arr
        var left = [];
        var right = [];
        for(var i = 0, l = arr.length; i < l ; i++) {
            if(arr[i] > pivot) {
                right.push(arr[i]);
            } else {
                left.push(arr[i])
            }
        }
        // 递归调用
        ret = arguments.callee(left).concat([pivot],arguments.callee(right));
    }
    /*
    *  插入排序函数职责：
    *     1 将传入的数组进行插入法排序
    *     2 利用函数ret封装一次插入法排序逻辑 
    *     3 在ret函数中调用渲染函数render 并使用setTimeout 递归调用ret函数
    *     4 在ret函数内部 当判断排序完成之后 标记当前处于空闲状态
    */
    Chart.prototype.insertSort = function(arr) {
        var self = this; // save this value
        if(!arr || !arr.length || arr.length <= 1) return arr;
        var i, j, l, key, self, clock;
        self = this; // save this value
        i = 1;
        l = arr.length;
        var ret = function() { // ret 函数内部无变量定义
            if(i >= l) {
                clearTimeout(clock);
                self.isBusy = false; // 标记空闲
                self.dataChange = false; // 数据没有改变
                clearTimeout(clock); // clear setTimeout
                return arr; // sort done
            }
            key = arr[i];
            j = i -1;
            while(j>=0 && arr[j] > key) {
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = key;
            self.render(arr); // 渲染
            i++; // !important
            clock = window.setTimeout(arguments.callee, self.interval);
        };
        ret(); // run ret
    }
    /*
    *   randoms 函数功能
    *       1 随机生成n个在相应范围内的数字 @para options {object}
    *       2 通过start 和end设定边界 length  = end - start;
    */
    Chart.prototype.randoms = function(options) {
        options = options || {};
        var start = options.start || 10;
        var end = options.end || 100;
        var length = options.length || 60; // 长度
        var ret = [];
        for(var i = 0; i < length; i++ ) {
            ret.push(Math.floor(Math.random() * (end - start) + start));
        };
        return ret;
    }
    /*
    *  validator 验证器 @para type {string} 根据类型来进行验证
    *  里面包括验证当前是否正在渲染、input value值是否合理和队列个数是否满足要求
    */
    Chart.prototype.validator = function(type) {
        // 无论怎样都要先验证是否当前正在渲染
        var self = this; // save this
        if(isRendering()) { return false};
        // 入队列
        if(type === 'inStack') {
            if(!isMemberSuit()) return false;
            if(!valueIsOk()) return false;
            return true;

        }
        // 出队列
        if(type === 'outStack') {
            if(!isMemberSuit()) return false;
            return true;
        }
        return false;

        /*
        * 验证value
        */
        function valueIsOk() {
            var value = self.inputDom.value;
            var reg = /\D+/g;
            if(!value || reg.test(value) || value<10 || value >100) {
                alert('请输入10~100的整数');
                return false;
            }
            return true;
        }
        /*
        * 判断当前是否正在渲染
        */
        function isRendering() {
            if(self.isBusy) {
                alert('正在渲染表格，请稍候再试～');
                return true;
            }
            return false;
        }
        /*
        * 判断当前是否已经满员 或是否已经没有item
        */
        function isMemberSuit() {
            if(self.data.length >= 60) {
                alert('抱歉，已经满员啦～请删掉一些后再添加吧!');
                return false;
            }
            if(self.data.length <=0 ) {
                alert('抱歉，已经没有项目可以删除了，添加一些再删除吧!');
                return false;
            }
            return true;
        }
    }
    // 新建一个实例 可以传入各种参数
    var char = new Chart({
        interval: 30 // 改变默认的渲染间隔
    });
}