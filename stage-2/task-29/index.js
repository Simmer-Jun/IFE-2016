window.onload = function() {
    // 使用策略模式来实现
    // 策略类
    var strategies = {
        isEmpty: function(value, errorMsg) {
            //console.log(value, errorMsg);
            if(!value.length) return errorMsg;
        },
        minLength: function(value, minLength, errorMsg) {
            var length = 0;
            for(var i = 0, l = value.length; i < l; i++) {
                var char = value.charCodeAt(i);
                if(char <0 || char > 127 ) {
                    length += 2;
                } else {
                    length +=1;
                }
            }
            if(length < minLength) {
                return errorMsg;
            }
        },
        maxLength: function(value, maxLength, errorMsg) {
            var length = 0;
            for(var i = 0, l = value.length; i < l; i++) {
                var char = value.charCodeAt(i);
                if(char <0 || char > 127 ) {
                    length += 2;
                } else {
                    length +=1;
                }
            }
            if(length > maxLength) {
                return errorMsg;
            }
        }
    };
    // validator 类
    var validator = {
        cache: [],
        add: function(strategies, dom, rules) {
            var self = validator;// 为了保证this的指向正确 请务必使用validator.add的形式来进行调用！
            for(var i = 0, rule;  rule = rules[i++]; ) {
                (function(rule) { // IIFE
                    var strategArr = rule.strategy.split(':'); // 用':'来区分策略类 和策略类参数
                    var errorMsg = rule.errorMsg;
                    self.cache.push(function() { // push 到cache中去 
                        var strategy = strategArr.shift(); // 策略类名
                        strategArr.push(errorMsg); // add error message
                        strategArr.unshift(dom.value); //将value添加到数组第一项
                        return strategies[strategy].apply(dom, strategArr); 
                    });
                })(rule)
            }
        },
        start: function() {
            var cache = validator.cache;
            var ret;
            for(var i = 0, l = cache.length; i < l; i++) {
                if(ret = cache[i]()) { // 如果有返回值 则证明校验没有通过
                   return ret;
                }
            }
        }
    }
    var handler = function(e) {
        // 阻止事件的默认行为
        e = e || wndow.even;
        e.preventDefault();
        e.returnValue = false;
        var dom = form.input;
        var ret
        validator.cache = []; // 清空cache
        validator.add(strategies, dom, [{
            strategy: 'isEmpty',
            errorMsg: '姓名不能为空!'
        },{
            strategy: 'minLength:4',
            errorMsg: '姓名长度不能小于4位'
        },{
            strategy: 'maxLength:16',
            errorMsg: '姓名长度不能大于16位'
        }]);
        ret = validator.start();
        if(ret) {
            tipsDom.innerHTML = ret;
            tipsDom.className = 'tips tips-error';
            dom.className = 'error';
        } else {
            tipsDom.innerHTML = '输入正确';
            tipsDom.className = 'tips tips-success';
            dom.className = 'success';
        }
    }
    var form = document.getElementById('my-form');
    var tipsDom = form.querySelector('.tips');
    var btn = document.getElementById('btn');
    var input = document.getElementById('input');
    // 绑定回调
    btn.onclick = handler;
    input.onblur = handler;



}