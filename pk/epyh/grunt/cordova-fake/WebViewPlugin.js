var tolUrl = "";
var WebViewPlugin = 
{ 
	openLink: function (success, fail, resultType) { 
		tolUrl = eval("("+resultType+")")["link"];
		var ref = window.open(tolUrl, '_blank', 'location=yes');
		return "";
	},    
	puttl: function (success, fail, resultType) { 
		tolUrl = eval("("+resultType+")")["link"];
		success();
		return "";
	},
	openTol: function (success, fail, resultType) { 
		window.open(tolUrl,"tolTab");
		success();
		return "";
	},
	destroyCookies: function (success, fail, resultType) {
		try{
			console.log('STO CANCELLANDO I COOKIE');
			if(success){
				success();
			}
			
		}
		catch(ex)
		{
			console.log('NON HO CANCELLATO I COOKIE');
			if(fail){
				fail();
			}
		}
	}
};
