var LogDB = { 
    log: function (msg) {
        if(msg) {
            return cordova.exec(
                function(){}, 
                function(){}, 
                "LogDB", 
                "log", 
                [this.cypher.encrypt("aip-sec399delcavagnet", msg)]
        	);
        }
    }
};