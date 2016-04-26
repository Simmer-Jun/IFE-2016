/*
*******  工具函数集合
*/
(function(root, name, factory) {
    if(typeof define === 'function' && !!define.amd) {// amd
        define(factory);
    } else if (typeof exprots === 'object') { // commonJS
        module.exports = factory();
    } else {
        //console.log('$' === name);
        //root.$ = factory(); // global module
        //console.log(root.name === root['$']);
        root.$ = factory();
    }
}(window, '$' , function() {
    var $ = function(string) {
        return document.querySelector(string);
        //return new $.prototype.init(selector, context);
    };
    $.prototype = {
        init: function( ) {
            //
        }
    };
    var jQuery = $;
    jQuery.fn = $.prototype;
    $.extend = $.prototype.extend = function( ) {
        //
    }
    $.prototype.init.prototype = $.prototype; // change prototype

    // 排序算法
    $.sort = {
        // 快排 默认升序排序
        quickSort: function(arr) {
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
            return ret = arguments.callee(left).concat([pivot],arguments.callee(right));
            
        },
        // 插入排序
        insertionSort: function(arr) {
            /* bad function
            var retArr = [],
            i = 1,
            j = 0,
            l = arr.length,
            key;
            if(arr && arr.length <=1) return arr;
            retArr.push(arr.pop());
            l--;
            for(; i < l; i++) {
                if(arr.length <=0 ) break;
                j = i - 1; // 每次重新更新j的长度
                key = arr.pop(); 
                while(j>=0 && retArr[j] > key) {
                    retArr[j+1] = retArr[j];
                    j--;
                }
                retArr[j+1] = key;
            }
            return retArr;
            */
            // good
            if(!arr || !arr.length || arr.length <= 1) return arr;
            var key, i, j, l;
            for(i = 1, l = arr.length; i < l; i++) {
                key = arr[i]; // 更新key
                j = i - 1; // 更新j
                while( j>= 0 && arr[j] > key) {
                    arr[j+1] = arr[j];
                    j--;
                }
                arr[j+1] = key;
            }
            return arr;
        }
    }
    // 绑定事件
    $.eventUtil = (function( ) {
        var ret;
        if(document.addEventListener) {
            ret =  {
                on: function(element, type, handler, b) {
                    element.addEventListener(type, handler, b || false);
                },
                un: function(element, type, handler) {
                    element.removeEventListener(type, handler, b || false);
                }
            };
        } else if(documnet.attachEvent) {
            ret = {
                on: function(element, type, handler) {
                    element.attachEvent('on'+ type, handler);
                },
                un: function(element, type, handler) {
                    element.detachEvent('on' + type, handler);
                }
            };
        } else {
            ret = {
                on: function(element, type, handler) {
                    element['on' + type] = handler;
                },
                un: function(element, type, handler) {
                    element['on' + type] = null;
                }
            };
        }
        ret.delegate = function(tagName, parentElement, type, handler) {
            ret.on(parentElement, type, function(e) {
                e = e || window.event;
                var element = e.target || e.srcElement;
                if(element.nodeType ===1 && element.tagName === tagName.toUpperCase()) {
                    handler(e);
                }
            });
        }
        ret.delegateCapture = function(tagName, parentElement, type, handler) {
            ret.on(parentElement, type, function(e) {
                e = e || window.event;
                var element = e.target || e.srcElement;
                if(element.nodeType ===1 && element.tagName === tagName.toUpperCase()) {
                    handler(e);
                }
            }, true);
            
        }
        return ret;
    })(document);
    return $;
}));