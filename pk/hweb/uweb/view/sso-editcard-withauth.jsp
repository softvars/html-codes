<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>HypeWallet Edit Card</title>
<script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/shims.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/util.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/common.js"/>"></script>

<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/project.css"/>" />

<script>
	var ssoToken = '${token}'; 
	var cardAlias = '${cardAlias}';
	var cardId = '${cardId}';
	var cvv = '${cvv}';
	var expiryMonth = '${expiryMonth}';
	var expiryYear = '${expiryYear}';
	var preferred = '${preferred}';
    var addcardURI = "/upweb/sso/card/editcardwithauth";
	
	$(function(){
		up_common.spinnerOverlay(true);
		$.ajax({
			url: addcardURI,
			method : 'POST',
			data : {ssoToken: ssoToken, cardAlias : cardAlias, cardId : cardId, expiryMonth : expiryMonth, 
					expiryYear : expiryYear, cvv : cvv, preferred: preferred },
			headers : {token: ssoToken}
		}).done(function (data) {
			up_common.spinnerOverlay(false);
			$("#3DpagamDiv").html(data).addClass('contant-loaded');
		});
	});
	</script>
</head>
<body>
<div id="3DpagamDiv"> </div>
<div id="spinner-overlay" class="popup-overlay">
	<div class="overlay-mask"></div>
	<div class="spinner"></div>
</div>
</body>
</html>