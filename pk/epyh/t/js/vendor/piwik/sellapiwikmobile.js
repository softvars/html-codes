var _sat = (function() {

// FLAG USED for the control of piwik server available or unavaibale.  
var _paqAvailable = false;
 
//FLAG USED for OPEN CLOSE from the server side
var _paqClose = false;
    
 /**
 * @param mixed object 
 * returns true when it is an object with the function "push"
 */
 var isObjectWithPush = function (a) {
     return a && Object.prototype.toString.call(a) === '[object Object]' && typeof a.push  === 'function';  
 };
 
 /**
 * retun true when tracker server is ON
 */
 var isTrackAvail =  function () { return _paqAvailable; };

 /**
 * retun true when tracker is OPEN
 */
 var isTrackOpen = function() { return !(_paqClose && _paqClose == true)};
 
/**
 * 
 * initialise the piwik tracker
 * @param string tracker url
 * @param string site id of tracker url 
 */

var initPiwik = function(u,siteId) {
  window._paq =  window._paq || [];
  _paq.push([ 'setTrackerUrl', u + 'piwik.php' ]);
  _paq.push([ 'setSiteId', siteId]);
  _paqAvailable = true;
 };
 var genUrlWithProtocol = function(u) {
  return (("https:" == document.location.protocol) ? "https" : "http") + "://" + u;
 };

/**
 * initialise the piwik tracker
 * @param string tracker url
 * @param string site id of tracker url 
 * @param boolean trackclose true when we need to close the tracker. 
 */
 var initPiwikAlways = function (u,siteId,trackClose) {
    _paqClose = (trackClose && trackClose.toLowerCase() == "true");
    if(isTrackOpen()) {
        var url = genUrlWithProtocol(u);
        initPiwik(url,siteId);
    }
 };

/**
 * mute the tracker on error
 * @param event error
 */
 var closePaqOnError = function(e) { 
    _paqAvailable = false; 
 };
 
/**
 * track will be closed event the tracker server is on
 */
  var closeTrack = function() {
   _paqClose = true;     
 }

 var trackApiWithErr = { 'trackPageViewWithE' : closePaqOnError,  'trackEventWithE' : closePaqOnError };
    
 return {
   /**
    * initialize the piwik tracker only when options[2] (isTrackClose) is false or undefined
    * @param options [url,siteId,isTrackclose (optional default=false)]
    */
   init : function(options) {
    if(options[2]){
     closeTrack();  
    } else {
      initPiwikAlways(options[0],options[1],options[2]);
    }
   },

  /**
    * delegate to the tracker api only when track is open & track server is avaialble for tracking.
    * @param array of the tracker api method name and reqired params
  */
   push: function(a) {
      var onTrackErr  = trackApiWithErr[a[0]];
      if(onTrackErr){
          a.push(this.closePaqOnError);
      }
      
      if(isTrackOpen()){
        if(isTrackAvail()){
            if(!window._paq)  {
              window._paq =  [];  
            }
            window._paq.push(a);
        } else if(!window._paq || isObjectWithPush(window._paq)) {
           window._paq = [];
           window._paq.push(a);
        } else {
           window._paq.push(a);
        }      
      }     
   },

   /**
   * make tracker unavailable on Error.
   */
   closePaqOnError: function(e) {
       closePaqOnError(e); 
   }, 

   /**
   * returns true when tracked open
   */
   isTrackOpen : function() {
        return isTrackOpen();
   }, 

   /**
   * returns true when tracke server available.
   */
   isTrackAvailable : function() {
        return isTrackAvail();
   }
 }
})();
