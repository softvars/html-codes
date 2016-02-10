var SendEmailPlugin = { 
    sendMail: function (success, fail, resultType) { 
		var rt = eval("("+resultType+")");
    	window.open("mailto:"+encodeURIComponent(rt.to)+"?subject="+encodeURIComponent(rt.subject)+"&body="+encodeURIComponent(rt.body));
    	success();
    	return "";
    },
    sendReport: function (success, fail, resultType) {
        console.log('chiamato sendreport');
		success();
    	return "";
    }
};