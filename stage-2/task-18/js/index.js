window.onload = function( ) {
    var validate = function( ) {
        var val = document.getElementById('input').value;
        var reg = /\D+/g;
        if(val&&!reg.test(val)) {
            return val;
        } else {
            alert('请输入有效的数值！');
            return false;
        }
    }
    //create Item
    var createItemm = (function( ) {
        var resultBox = document.getElementById('result-box');
        return function () {
            var e = document.createElement('span');
            e.className = 'item';
            e.innerText = arguments[0];
            return e;
        }
    }());

    window.list = {
        cache: document.getElementById('result-box'),
        leftIn: function(e) {
            var val = validate() 
            if(val) {
                var e = createItemm(val);
                this.cache.insertBefore(e, this.cache.firstChild); // 要插入的节点 和 参照节点
            }
            
        },
        rightIn: function(e) {
            var val = validate() 
            if(val) {
                var e = createItemm(val);
                this.cache.appendChild(e);
            }
        },
        leftOut: function(e) {
            var cache = this.cache;
            if(cache.childNodes) {
                var firstChild = cache.firstChild;
                alert('remove: '+ firstChild.innerHTML);
                cache.removeChild(cache.firstChild);
            } 
        },
        rightOut: function(e) {
            var cache = this.cache;
            if(cache.childNodes) {
                var lastChild = cache.lastChild
                alert('remove: '+ lastChild.innerHTML);
                cache.removeChild(lastChild);
            }
        }
    };
    // event delegate
    window.$.eventUtil.delegate('span', document.getElementById('result-box'), 'click', function (e) {
        var element = e.target || e.srcElement;
        alert('remove: ' + element.innerText)
        window.list.cache.removeChild(element);
    });
};