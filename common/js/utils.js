/*
*******  工具函数集合
*/
(function(name, factory) {
    if(typeof define === 'function' && !!define.amd) {// amd
        define(factory);
    } else if (typeof exprots === 'object') { // commonJS
        module.exports = factory();
    } else {
        window && window[name] = factory(); // global module
    }
}('$', function() {
    var $ = function() {
        return new $.prototype.init(argumnets);
    };
    $.prototype = {
        init: function( ) {
        }
    };
    return $;
}));