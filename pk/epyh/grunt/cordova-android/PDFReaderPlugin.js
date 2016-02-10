var PDFReaderPlugin = {
    openPDF: function (success, fail, resultType) {
        return cordova.exec(success, fail, "PDFReaderPlugin", "openPDF", [resultType]);
    },
    openSimplePDF: function (success, fail, resultType) {
        return cordova.exec(success, fail, "PDFReaderPlugin", "openSimplePDF", [resultType]);
    },
    hasPDF: function (success, fail, resultType) {
        cordova.exec(success, fail, "PDFReaderPlugin", "hasPDF", [resultType]);
    },
    destroyCookies: function (success, fail, resultType) {
        return cordova.exec(success, fail, "PDFReaderPlugin", "destroyCookies", [resultType]);
    }
};