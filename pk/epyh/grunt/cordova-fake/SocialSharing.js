/* v. 4.3.19  https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin */
/* MODIFICATA per farla funzionare con il nostro sistema

ELENCO MODIFICHE:
1 - commentato require prima linea
2 - commentata dichiarazione funzione install (fine file)
3 - comentata chiamata a addConstructor (fine file)
4 - aggiunta variabile SocialSharingPlugin che contiene il plugin
*/

//var cordova = require('cordova');

function SocialSharing() {
}

// Override this method (after deviceready) to set the location where you want the iPad popup arrow to appear.
// If not overridden with different values, the popup is not used. Example:
//
//   window.plugins.socialsharing.iPadPopupCoordinates = function() {
//     return "100,100,200,300";
//   };
SocialSharing.prototype.iPadPopupCoordinates = function () {
  // left,top,width,height
  return "-1,-1,-1,-1";
};

SocialSharing.prototype.setIPadPopupCoordinates = function (coords) {
    console.log('setIPadPopupCoordinates');
};

SocialSharing.prototype.available = function (callback) {
    console.log('available');
};

SocialSharing.prototype.share = function (message, subject, fileOrFileArray, url, successCallback, errorCallback) {
    console.log('share');
};

SocialSharing.prototype.shareViaTwitter = function (message, file /* multiple not allowed by twitter */, url, successCallback, errorCallback) {
    console.log('shareViaTwitter');
};

SocialSharing.prototype.shareViaFacebook = function (message, fileOrFileArray, url, successCallback, errorCallback) {
    console.log('shareViaFacebook');
    successCallback();
};

SocialSharing.prototype.shareViaFacebookWithPasteMessageHint = function (message, fileOrFileArray, url, pasteMessageHint, successCallback, errorCallback) {
    console.log('shareViaFacebookWithPasteMessageHint');
};

SocialSharing.prototype.shareViaWhatsApp = function (message, fileOrFileArray, url, successCallback, errorCallback) {
    console.log('shareViaWhatsApp');
};

SocialSharing.prototype.shareViaSMS = function (options, phonenumbers, successCallback, errorCallback) {
    console.log('shareViaSMS');
};

SocialSharing.prototype.shareViaEmail = function (message, subject, toArray, ccArray, bccArray, fileOrFileArray, successCallback, errorCallback) {
    console.log('shareViaEmail');
};

SocialSharing.prototype.canShareVia = function (via, message, subject, fileOrFileArray, url, successCallback, errorCallback) {
    console.log('canShareVia');
};

SocialSharing.prototype.canShareViaEmail = function (successCallback, errorCallback) {
    console.log('canShareViaEmail');
};

SocialSharing.prototype.shareVia = function (via, message, subject, fileOrFileArray, url, successCallback, errorCallback) {
    console.log('shareVia');
};

SocialSharing.prototype.saveToPhotoAlbum = function (fileOrFileArray, successCallback, errorCallback) {
    console.log('saveToPhotoAlbum');
};

SocialSharing.prototype._asArray = function (param) {
  if (param == null) {
    param = [];
  } else if (typeof param === 'string') {
    param = new Array(param);
  }
  return param;
};

SocialSharing.prototype._getErrorCallback = function (ecb, functionName) {
  if (typeof ecb === 'function') {
    return ecb;
  } else {
    return function (result) {
      console.log("The injected error callback of '" + functionName + "' received: " + JSON.stringify(result));
    }
  }
};

var SocialSharingPlugin = new SocialSharing();
/*
SocialSharing.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.socialsharing = new SocialSharing();
  return window.plugins.socialsharing;
};

cordova.addConstructor(SocialSharing.install);
*/
