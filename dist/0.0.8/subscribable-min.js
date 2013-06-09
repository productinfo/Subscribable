/*! subscribable 2013-06-09 */
!function(a,b){"undefined"!=typeof module&&module.exports?module.exports=b():"object"==typeof exports&&exports?exports.Subscribable=b():"function"==typeof define&&define.amd?define(b):a.Subscribable=b()}(this,function(){"use strict";function a(){}return a.prepareInstance=function(b){return b.__events={},b.__handlers=[],b.on=a.on,b.un=a.un,b.fire=a.fire,b.hasListener=a.hasListener,b},a.prototype.__events=null,a.prototype.__handlers=null,a.prototype.on=function(){return a.prepareInstance(this),this.on.apply(this,arguments)},a.prototype.un=function(){return this},a.prototype.fire=function(){return!0},a.prototype.hasListener=function(){return!1},a.fire=function(b){var c,d,e,f,g,h;if("object"==typeof b&&(f=[b],b=b.constructor.toString()),h=a._getHandlersList(this,b,!1),h&&h.length){for(f=f||Array.prototype.slice.call(arguments,1),c=0,d=h.length;d>c&&e!==!1;c++)(g=this.__handlers[h[c]])&&(e=g[0].apply(g[1],f));return e!==!1}return!0},a._getHandlersList=function(a,b,c){return b=(""+b).toLowerCase(),!a.__events[b]&&c&&(a.__events[b]=[]),a.__events[b]},a._saveHandler=function(a,b,c,d){var e=a.__handlers.length;return a.__handlers.push([b,c,e]),d.push(e),e},a.on=function(b,c,d){return a._saveHandler(this,c,d,a._getHandlersList(this,b,!0))},a.un=function(b,c){var d=typeof b;switch(d){case"number":a.removeSingleEvent(this,b,c);break;case"string":case"function":b=(""+b).toLowerCase(),a.removeMultipleEvents(this,a._getHandlersList(this,b,!1),c),c&&a.consolidateEvents(this,b);break;default:b?(a.removeMultipleHandlers(this,this.__handlers,b||null),a.consolidateEvents(this)):(this.__handlers=[],this.__events={})}},a.consolidateEvents=function(b,c){if(!arguments.length)for(var c in b.__events)a.consolidateEvents(c);var d=b.__events[c];if(d&&d.length)for(var e=d.length-1;e>=0;e--)b.__handlers[d[e]]||d.splice(e,1);d&&!d.length&&delete b.__events[c]},a.removeMultipleEvents=function(b,c,d){for(var e=0,f=c.length;f>e;e++)a.removeSingleEvent(b,c[e],d)},a.removeMultipleHandlers=function(b,c,d){for(var e,f=0,g=c.length;g>f;f++)(e=c[f])&&a.removeSingleEvent(b,e[2],d)},a.removeSingleEvent=function(a,b,c){a.__handlers[b]&&(c&&a.__handlers[b][1]!==c||(a.__handlers[b]=null))},a.hasListener=function(a){var b,c,d,e;if(void 0===a){for(b=this.__handlers,d=0,e=b.length;e>d;d++)if(b[d])return!0}else if(c=this.__events[(""+a).toLowerCase()])for(d=0,e=c.length;e>d;d++)if(this.__handlers[c[d]])return!0;return!1},a});