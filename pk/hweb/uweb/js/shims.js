//'use strict';

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {}); // Using `this` for web workers.

// Make it safe to do Object.create() always.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}

/* Resolving underscore templates and Java JSTL conflict */
if(typeof _ !== "undefined") {
    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim,
        escape: /\<\@\-(.+?)\@\>/gim
    };
}
else {
    console.log("Underscore JS is not included.");
}

if(typeof $ !== "undefined") {
	/* To disable caching globally for AJAX responses. */
	if($.ajaxSetup) {
		$.ajaxSetup({ cache: false });
	}

	/* To disable right click context menu and middle button click globally. */
	var $document = $(document);
	$document.on("contextmenu", function(e){
		if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {
			e.preventDefault();
		}
	});
	$document.on("click", function(e) {
		if(e.which === 2) {
			e.preventDefault();
		}
	});
}