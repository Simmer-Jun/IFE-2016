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
    var $ = function() {
        return new $.prototype.init(selector, context);
    };
    $.prototype = {
        init: function( ) {
            //if()
        }
    };
    var jQuery = $;
    jQuery.fn = $.prototype;
    $.extend = $.prototype.extend = function( ) {
        //
    }
    $.prototype.init.prototype = $.prototype; // change prototype
    

    $.eventUtil = (function(element) {
        var ret;
        if(element.addEventListener) {
            ret =  {
                on: function(element, type, handler) {
                    element.addEventListener(type, handler, false);
                },
                un: function(element, type, handler) {
                    element.removeEventListener(type, handler, false);
                }
            };
        } else if(element.attachEvent) {
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
        return ret;
    })(document);
    return $;
}));