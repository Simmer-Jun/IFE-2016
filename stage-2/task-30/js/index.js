window.onload = function() {
    var $ = window.$; // 添加对工具函数引用 减少作用域查找 $不是jQuery
    // 策略模式
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
                if(char <1110 || char > 127 ) {
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
     
        },
        confirm: function(value, valueCompare, errorMsg) {
            if(value !== valueCompare) {
                return errorMsg;
            }
        },
        isPhone: function(value, errorMsg) {
            if(!/^1\d{10}$/g.test(value)) {
                return errorMsg;
            }
        },
        isEmail: function(value, errorMsg) {
            if(!/.*@{1}.*\.{1}.*$/g.test(value)) {
                return errorMsg;
            }
        }
    };
    var validator = {
        cache: {}, // 保存验证函数的缓存空间
        add: function(name, dom, rules) {
            var self = validator; // 保存引用
            if(!self.cache[name]) self.cache[name] = []; // 如果cache下命名空间无name 
            for(var i = 0, rule; rule = rules[i++];) {
                (function (rule){
                    var strategyArr = rule.strategy.split(':');
                    var errorMsg = rule.errorMsg;
                    self.cache[name].push(function() {
                        var strategy = strategyArr[0];
                        var arr = strategyArr.slice(1); // 注意这里之所以设置数组的原因是因为
                        if(strategy === "confirm") { // hook
                            arr.push(document.getElementById('password').value);
                        }
                        arr.unshift(dom.value);
                        arr.push(errorMsg);
                        return strategies[strategy].apply(dom, arr);
                    });
                })(rule);
            }
        },
        start: function(name) {
            var i, fn, ret, cache;
            cache = validator.cache;
            if(name) {
                var cacheArr = cache[name];
                // 如果name空间下没有函数
                if(!cacheArr) return ret = false;
                for(i = 0, fn ; fn = cacheArr[i++]; ) {
                    ret = fn(); // run function
                    if(ret) { // 如果有返回值则代表验证没有通过
                        return ret;
                    }
                }
            } else {
                for(i in cache) {
                    var arr = cache[i];
                    for(var j =0, fn; fn = arr[j++]; ) {
                        ret = fn();
                        if(ret) {
                            return ret;
                        }
                    }
                }
            }
        }
    }
    var formDOM = document.getElementById('myform')
    // 添加校验规则
    validator.add('name', formDOM.name,[{
        strategy: 'isEmpty',
        errorMsg: '值不能为空'
    },{
        strategy: 'minLength:4',
        errorMsg: '最小4位'
    },{
        strategy: 'maxLength:12',
        errorMsg: '最多12位'
    }]);
    validator.add('password', formDOM.password,[{
        strategy: 'isEmpty',
        errorMsg: '值不能为空'
    },{
        strategy: 'minLength:4',
        errorMsg: '最小4位'
    },{
        strategy: 'maxLength:12',
        errorMsg: '最多12位'
    }]);
    validator.add('confirmPass', formDOM.confirmPass,[{
        strategy: 'isEmpty',
        errorMsg: '值不能为空'
    },{
        strategy: 'confirm',
        errorMsg: '两次密码不一致'
    }]);
    validator.add('email', formDOM.email,[{
        strategy: 'isEmpty',
        errorMsg: '值不能为空'
    },{
        strategy: 'isEmail',
        errorMsg: '请输入正确的Email地址'
    }]);
    validator.add('phone', formDOM.phone,[{
        strategy: 'isEmpty',
        errorMsg: '值不能为空'
    },{
        strategy: 'isPhone',
        errorMsg: '请输入11位的合法手机号'
    }]);
    var tips = document.getElementsByClassName('tips');
    // 事件代理 ==> 事件捕获来处理 onblur事件
    $.eventUtil.delegateCapture('input',formDOM , 'blur', function(e) {
        var element = e.srcElement || e.target;
        var arr = element.getAttribute('data-name').split(':');
        var ret = validator.start(arr[0]);
        if(ret) {
            tips[arr[1]].innerHTML = ret;
            tips[arr[1]].className = 'tips tips-error';
            element.className = "input-error";
        } else {
            tips[arr[1]].innerHTML = '校验通过';
            tips[arr[1]].className = 'tips tips-success';
            element.className = "input-success";
        }

    }, true);

    // button 点击
    var btn = document.getElementById('btn');
    $.eventUtil.on(btn, 'click', function(e){
        e = e || window.even;
        // 阻止默认行为
        e.preventDefault();
        e.returnValue = false;
        var ret = validator.start(); // 不加参数则进行全局校验
        if(ret) {
            alert('校验不通过!');
        } else {
            alert('校验通过!');
        }
    })

}