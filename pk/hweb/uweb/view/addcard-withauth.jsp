<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css"  href="<c:url value="/resources/css/hype-loading.css"/>" />
    <script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
	<script>
	    var encryptedCardvalue = '${encryptedCardvalue}';
	    var addcardURI = "/upweb/noauth/card/addcardwithauth";
	    var addCardFailedURI = "/upweb/noauth/card/addcardFailed";
	    
	    $(function(){
	        $.ajax({
	            url: addcardURI,
	            method : 'POST',
	            data : {encryptedCardvalue: encryptedCardvalue},
	        }).done(function (data) {
	            if(data && data.url && data.url.length) {
	                window.location.href = data.url;
	            }
	        }).fail(function(jqXHR, textStatus, errorThrown) {
	            console.log(errorThrown);
	            window.location.href = addCardFailedURI;
	        });
	    });
	 </script> 
</head>

<body class="">
    <div class="modal-dialog resume-dialog">
        <div class="backdrop"></div>
        <div class="overdrop">
            <div class="status">
                <div class="spinner"></div>
                <span>Attendi</span>
            </div>
        </div>
    </div>
</body>
</html>
