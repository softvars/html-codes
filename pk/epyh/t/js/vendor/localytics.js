+function(l,y,t,i,c,s) {
    l['LocalyticsGlobal'] = i;
    l[i] = function() { (l[i].q = l[i].q || []).push(arguments) };
    l[i].t = +new Date;
    (s = y.createElement(t)).type = 'text/javascript';
    s.src = '//web.localytics.com/v3/localytics.min.js';
    (c = y.getElementsByTagName(t)[0]).parentNode.insertBefore(s, c);
    
    define('localytics', function(){ return ll; });
    
}(window, document, 'script', 'll');