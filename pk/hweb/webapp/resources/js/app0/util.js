var isExist = function(obj) {
    return typeof obj !== "undefined" && obj !== void 0;
};

var isNotEmpty = function(obj) {
    return isExist(obj) && !(obj === null || obj === '' || obj.length === 0);
};

var getObject = getObject || function(obj, def) {
    return (!isExist(obj) || obj == null ) && isExist(def) ? def : obj;
};

var getUrlHash = function() {
	return window.location.hash.slice(1).toLowerCase();
};

var getUrlVariables = function() {
    var vars = [], hash;
    var search = window.location.search;
    if(!(search)) {
        return vars;
    }
    var hashes = search.slice(search.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

// Using JQuery and Underscore. For e.g. serializeObject('#formId')
var serializeObject = function(el, isStringify) {
    var data = {};
    if (el) {
        var $el = el.jquery ? el : $(el);
        var arr = $el.serializeArray();
        data = _(arr).reduce(function(object, field) {
          object[field.name] = field.value;
          return object;
        }, {});
    }
    delete data['fake_password'];
    return isStringify ? JSON.stringify(data) : data;
};

navigator.browserInfo = (function(){
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem= /\brv[ :]+(\d+)/g.exec(ua) || [];
        return ['IE', (tem[1] || '')];
    }
    if(M[1] === 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return [tem[1].replace('OPR', 'Opera'), tem[2]];
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M;
})();