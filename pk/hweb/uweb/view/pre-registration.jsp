<html>
<head>
<title>Pre Registration Page</title>
<style type="text/css">
.form-style-7 {
	max-width: 400px;
	margin: 50px auto;
	background: #fff;
	border-radius: 2px;
	padding: 20px;
	font-family: Georgia, "Times New Roman", Times, serif;
}

.form-style-7 h1 {
	display: block;
	text-align: center;
	padding: 0;
	margin: 0px 0px 20px 0px;
	color: #5C5C5C;
	font-size: x-large;
}

.form-style-7 ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.form-style-7 li {
	display: block;
	padding: 9px;
	border: 1px solid #DDDDDD;
	margin-bottom: 30px;
	border-radius: 3px;
}

.form-style-7 li:last-child {
	border: none;
	margin-bottom: 0px;
	text-align: center;
}

.form-style-7 li>label {
	display: block;
	float: left;
	margin-top: -19px;
	background: #FFFFFF;
	height: 14px;
	padding: 2px 5px 2px 5px;
	color: #B9B9B9;
	font-size: 14px;
	overflow: hidden;
	font-family: Arial, Helvetica, sans-serif;
}

.form-style-7 input[type="text"],.form-style-7 input[type="date"],.form-style-7 input[type="datetime"],.form-style-7 input[type="email"],.form-style-7 input[type="number"],.form-style-7 input[type="search"],.form-style-7 input[type="time"],.form-style-7 input[type="url"],.form-style-7 input[type="password"],.form-style-7 textarea,.form-style-7 select
	{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	display: block;
	outline: none;
	border: none;
	height: 25px;
	line-height: 25px;
	font-size: 16px;
	padding: 0;
	font-family: Georgia, "Times New Roman", Times, serif;
}

.form-style-7 input[type="text"]:focus,.form-style-7 input[type="date"]:focus,.form-style-7 input[type="datetime"]:focus,.form-style-7 input[type="email"]:focus,.form-style-7 input[type="number"]:focus,.form-style-7 input[type="search"]:focus,.form-style-7 input[type="time"]:focus,.form-style-7 input[type="url"]:focus,.form-style-7 input[type="password"]:focus,.form-style-7 textarea:focus,.form-style-7 select:focus
	{
	
}

.form-style-7 li>span {
	background: #F3F3F3;
	display: block;
	padding: 3px;
	margin: 0 -9px -9px -9px;
	text-align: center;
	color: #C0C0C0;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 11px;
}

.form-style-7 textarea {
	resize: none;
}

.form-style-7 input[type="submit"],.form-style-7 input[type="button"] {
	background: #2471FF;
	border: none;
	padding: 10px 20px 10px 20px;
	border-bottom: 3px solid #5994FF;
	border-radius: 3px;
	color: #D2E2FF;
}

.form-style-7 input[type="submit"]:hover,.form-style-7 input[type="button"]:hover
	{
	background: #6B9FFF;
	color: #fff;
}
</style>
    <script  type="text/javascript" src="/upweb/resources/lib/jquery-1.11.1.min.js"></script>
    <script  type="text/javascript" src="/upweb/resources/lib/jquery.placeholder.min.js"></script>
    <script>
	    var secrandid = "${secrandid}";
	    var appendSecrandidParam = function(url){
	        var hash = '';
	        var url_ = url.indexOf('#') > -1 ? url.split('#') : url;
	        if(url.indexOf('#') > -1) {
	            hash = url_[1] && "#"+url_[1] || '' ;
	            url_ = url_[0];
	        }
	        //var secrandid = $("#secrandid-container #secrandid").val();
	        url_ += (url_.indexOf('?') > -1 ? "&" : "?");
	        url_ += "secrandid=" + secrandid + hash; 
	        return url_;
	    };

        $(function(){
            console.log("DOM ready");
           $('#pre_reg_submit').on('click', function(e){
               console.log("Clicked");
               var jsonDATA = {};
               jsonDATA.name = $('input[id="name"]').val();
               jsonDATA.shopLogin = $('input[id="shopLogin"]').val();
               jsonDATA.shopTransactionID = $('input[id="shopTransactionID"]').val();
               jsonDATA.bankTransactionID = $('input[id="bankTransactionID"]').val();
               jsonDATA.email = $('input[id="email"]').val();
               jsonDATA.cardNumber = $('input[id="cardNumber"]').val();
               jsonDATA.cardType = $('input[id="cardType"]').val();
               jsonDATA.idTransaction = $('input[id="idTransaction"]').val();
               jsonDATA.vbvEnabledCard = $('input[id="vbvEnabledCard"]').val();
               jsonDATA.vbvEnabledTrx = $('input[id="vbvEnabledTrx"]').val();

              var req = $.ajax({
                  type: "POST", 
                  url: appendSecrandidParam($('input[id="URL"]').val()),
                  data: JSON.stringify(jsonDATA),
                  contentType: 'application/json',
                  dataType: 'json',
                  processdata: true,
                   async: false,
                  success : function(text)
                  {
                     console.log("Success: " +JSON.stringify(text));
                  }

             
              }) ;
               
               req.done(function(status){
                   console.log("Success: " );
                   var resp=req.responseJSON;
                    $('input[id="url"]').val(resp.data);
                    $('#response').html('Status:'+resp.statusMsg +',Desc:'+resp.description );
                   
               });
               req.fail(function(status){
                   console.log("Failed: " );
               });
              return false; 
           });
           
        });

    
    </script>
</head>
<body>
	<div align="center">
		<h1>PRE REGISTER USER FROM PAGAM</h1>
	</div>
	<form class="form-style-7">
		<ul>
			<li><label for="shopLogin">ShopLogin</label> <input type="text"
				id="shopLogin" name="shopLogin" maxlength="100"> <span>Enter
					ShopLogin here</span></li>
			<li><label for="shopTransactionID">ShopTransactionID</label> <input
				type="text" id="shopTransactionID" name="shopTransactionID"
				maxlength="100"> <span>Enter ShopTransactionID here</span></li>
			<li><label for="bankTransactionID">BankTransactionID</label> <input
				type="text" id="bankTransactionID" name="bankTransactionID"
				maxlength="100"> <span>Enter BankTransactionID here</span></li>
			<li><label for="name">Name</label> <input type="text" id="name"
				name="name" maxlength="100"> <span>Enter your name
					here</span></li>
			<li><label for="cardNumber">Card Number</label> <input
				type="text" id="cardNumber" name="cardNumber" maxlength="100">
				<span>Enter Card Number here</span></li>
			<li><label for="cardType">Card Type</label> <input type="text"
				id="cardType" name="cardType" maxlength="100"> <span>Enter
					card type here</span></li>
			<li><label for="idTransaction">IdTransaction</label> <input
				type="text" id="idTransaction" name="idTransaction" maxlength="100">
				<span>Enter idTransaction here</span></li>
			<li><label for="vbvEnabledCard">vbvEnabledCard</label> <input
				type="text" id="vbvEnabledCard" name="vbvEnabledCard"
				maxlength="100"> <span>vbvEnabledCard</span></li>
			<li><label for="vbvEnabledTrx">vbvEnabledTrx</label> <input
				type="text" id="vbvEnabledTrx" name="vbvEnabledTrx" maxlength="100">
				<span>vbvEnabledTrx</span></li>
			<li><label for="URL">URL</label> <input type="text" id="URL"
				name="URL" maxlength="100"> <span>URL</span></li>

			<li><label for="email">Email</label> <input type="email"
				id="email" name="email" maxlength="100"> <span>Enter
					a valid email address</span></li>
			<li><label for="url">Registration Link</label> <input type="url"
				id="url" name="url"> <span>use this link to enroll user</span></li>
		</ul>
		<div align="center"><input type="submit" id="pre_reg_submit" value="Send This"></div>
		<div id="response"></div>
	</form>
</body>
</html>