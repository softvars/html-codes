
var PassengerRegex = new RegExp("^([\\s\\w]+)\\+?([\\d]*)", "i");

var tkt_keys = ['pnr','train','doj','class','stations','dep','passenger', 'seat','fare','sc'];
var tkt_cancel_keys = ['cancelled','pnr','amount'];
var tkt_key_lbl_map = {
	'pnr': 'PNR Number',
	'train': 'Train Number',
	'doj': 'Date of Journey',
	'class': 'Class',
	'stations': 'Codes of Origin and Destination Stations',
	'dep': 'Departure Time',
	'passenger': 'Name of First Passenger',
	'seat': 'Coach and Seat Numbers',
	'fare': 'Fare',
	'sc': 'Booking Charges'
};
var extractRest = function(val, key) {
    var rg = new RegExp("^"+key+":([\\-\\d\\w\\.\\:]+)", "i"); 
    var parsedVal = rg.exec(val);
    parsedVal = parsedVal && parsedVal.length > 1 && parsedVal[1] || "";
    return parsedVal;
};
    
var func = {
	'pnr': function(val) {
        return extractRest(val, 'pnr');
    },
	'train': function(val) {
        return extractRest(val, 'train');
    },
	'doj': function(val) {
        return extractRest(val, 'doj');
    },
	'class':  function(val) {
        return val;
    },
	'stations': function(val) {
        return val;
    },
	'dep': function(val) {
        return extractRest(val, 'dep');
    },
	'passenger': function(val) {
        var parsedVal = PassengerRegex.exec(val);
        if(parsedVal && parsedVal.length > 2) {
            val = {
                name :  parsedVal[1],
                count :  parseInt(parsedVal[2])
            };
        }
        return val;
    },
	'seat': function(val) {
        return [val];
    },
	'fare': function(val) {
        return extractRest(val, 'fare');
    },
	'sc': function(val) {
        return extractRest(val, 'sc');
    }
};

function parseTkt(tkt) {
	tkt = tkt || "PNR:4207642135,TRAIN:22651,DOJ:31-07-15,SL,MAS-PLNI,Dep:N.A.,\n" +
		"PRAKASH S+2,S5 17,S5 20,S11 24,\n" + 
		"Fare:690,SC:22.47+PG CHGS";

	var tkt_info_raw = tkt.replace(/\n/g,'').split(',');
	var t_ = ["PNR:4207642135", "TRAIN:22651", "DOJ:31-07-15", "SL", "MAS-PLNI", "Dep:N.A.", "PRAKASH S+1", "S5 17", "S5 20", "Fare:690", "SC:22.47+PG CHGS"];
    //PNR:4207642135,TRAIN:22651,DOJ:31-07-15,SL,MAS-PLNI,Dep:N.A.,PRAKASH S+1,S5 17,S5 20,Fare:690,SC:22.47+PG CHGS
	console.log("::"+tkt_info_raw)
    var output = {};
    var tktObj = {};
    _(tkt_info_raw).forEach(function(val, idx, arr) {
        var lbl = tkt_keys[idx];
        var fn = func[lbl];
        if(lbl && fn) {
            var val_ = fn(val);
            if(lbl == 'fare' && (!(val_)) ) {
                var passenger = tktObj['passenger'];
                console.log("passenger:" + passenger);
                var c = passenger.count;
                if(c) {
                    for(var i=0,j=idx;i < c;i++,j++) {
                        val_ = arr[j];
                        tktObj['seat'].push(val_);
                    }
                }
                val_ = extractRest(arr[idx + c], 'fare')
                /*if(fareVal) {
                    tktObj['fare'].push();
                }*/
                
            }
            if(lbl == 'sc' && (!(val_)) ) {
                var passenger = tktObj['passenger'];
                console.log("passenger:" + passenger);
                var c = passenger.count;
                val_ = extractRest(arr[idx + c], 'sc')
            }
            tktObj[lbl] = val_;
            
            console.log(val);
        }
        else console.log(lbl +":::"+fn);
        //console.log(tkt_key_lbl_map[val]);
    });
    //console.log(_.toPlainObject(tktObj));
    return tktObj;
    
}

var temp = {
	4207642135: {
		train: 22651,
		doj	 : "31-07-15",
		class: "SL",
		stations: "MAS-PLNI",
		Dep  : "N.A.",
		passenger: "PRAKASH S+1",
		seat : ['S5 17', 'S5 20'],
		Fare : 690,
		SC   : 22.47
	}
};

//parseTkt();
/*if(typeof sampleTkt != undefined) {
    var html = "";
    _(sampleTkt).forEach(function(val, idx, arr) {
        var tkt = parseTkt(val);
        var compiled = _.template('<% _.forEach(tkt, function(val, key) { %><li><span><%- key %></span>:<span><%- val %></span></li><% }); %>');
        compiled({tkt: tkt});
    });
}*/

if(typeof sampleTkt != undefined) {
    var html = "", parsedArr = [];
    _(sampleTkt).forEach(function(val, idx, arr) {
        var tkt = parseTkt(val);
        //var compiled = _.template('<% _.forEach(tkt, function(val, key) { %><li><span><%- key %></span>:<span><%- val %></span></li><% }); %>');
        //compiled({tkt: tkt});
        parsedArr.push(tkt);
        
    });
    console.log('parsedArr:' + parsedArr );
}