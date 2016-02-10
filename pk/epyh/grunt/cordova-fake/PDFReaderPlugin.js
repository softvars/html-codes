var PDFReaderPlugin = {
    openLink: function (success, fail, resultType) { 
      return true;
    },    
    destroyCookies: function (success, fail, resultType) {
    	return true;
    },
	openPDF: function (success, fail, resultType) { 
      return cordova.exec( success, fail,"PDFReaderPlugin","openPDF", [resultType]);
    },  
	hasPDF: function (success, fail, resultType) {
				success();
	}
};