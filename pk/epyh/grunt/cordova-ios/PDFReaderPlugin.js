var PDFReaderPlugin = { 
    openPDF: function (success, fail, resultType) {
    	return cordova.exec( success, fail,"PDFReaderPlugin","openPDF", [resultType]);
    },
    openSimplePDF: function (success, fail, resultType) {
    	return cordova.exec( success, fail,"PDFReaderPlugin","openSimplePDF", [resultType]);
    },       
    hasPDF: function (success, fail, resultType) {
    	return true;   	
    },
    destroyCookies: function (success, fail, resultType) {
      return cordova.exec( success, fail,"PDFReaderPlugin","destroyCookies", [resultType]);
    }
};