var jfoundnum = "";

var RequestHttpsPlugin = {
    doRequestHttps: function (success, fail, resultType) {
		//GBS02251
        //SellaRenderer.locking.lock();
        var data = eval("(" + resultType + ")");
		if(!data.async){
			SellaRenderer.locking.lock();
		}
        var http = new XMLHttpRequest();
        var postdata = null;
        var cookies = null;
        http.open("POST", data.url, true);
        if (!data.method || data.method == "POST") {
            postdata = "";
            for (var a in data.postparametes) {
                if (data.postparametes[a]) {
                    for (var b in data.postparametes[a]) {
                        postdata += b + "=" + (data.postparametes[a][b] === undefined ? "" : encodeURIComponent(data.postparametes[a][b])) + "&";
                    }
                }
            }
            postdata = postdata.substring(0, postdata.length - 1);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //imposta la versione dell'app usando il sistema già esistente del guscio
            Sella.deviceactions.getAppVersion(function(){});
            http.setRequestHeader("appversion", Sella.appVersion);
            http.setRequestHeader("jfound", jfoundnum);
        }
        http.onreadystatechange = function () {// Call a function when the state changes.			
            if (http.readyState == 4) {
                jfoundnum = http.getResponseHeader("jfound");
				if(!data.async){
					SellaRenderer.locking.unlock();
				}
                if ((http.fake || ((http.status == 200) || (http.status == 0)) && http.getAllResponseHeaders().length)) {
                    success("{\"responseText\":" + Sella.serialize(http.responseText) + "}"); //
                }
                else {
                    fail("{\"errorText\":" + Sella.serialize(http.responseText) + ", \"errorCode\":" + http.status + "}");
                }
            }
        }
        try {
            http.send(postdata);
        }
        catch (err) {
			if(!data.async){
				SellaRenderer.locking.unlock();
			}
        }
    },
    doDe: function (success, fail, resultType) {
        success(doExecDe());
        return "";
    }
};