;(function(){
var lblMap = 
{
'pnr': 'PNR Number',
'train': 'Train Number',
'doj': 'Date of Journey',
'class': 'Departure Time',
'stations': 'Class',
'dep': 'Codes of Origin and Destination Stations',
'passenger': 'Name of First Passenger',
'seat': 'Coach and Seat Numbers',
'fare': 'Fare',
'sc': 'Booking charges'
}

var tkt = "PNR:4207642135,TRAIN:22651,DOJ:31-07-15,SL,MAS-PLNI,Dep:N.A.,\n" +
"PRAKASH S+1,S5 17,S5 20,\n" + 
"Fare:690,SC:22.47+PG CHGS"

var tkt_tokens = tkt.replace(/\n/g,'').split(',');


/* ["PNR:4207642135", "TRAIN:22651", "DOJ:31-07-15", "SL", "MAS-PLNI", "Dep:N.A.", "PRAKASH S+1", "S5 17", "S5 20", "Fare:690", "SC:22.47+PG CHGS"] */

/*
['train','doj','class','stations','dep','passenger', 'seat','fare','sc']
*/


var lbl_keys = ['pnr', 'train','doj','class','stations','dep','passenger', 'seat','fare','sc']


8.
{
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
}

})();