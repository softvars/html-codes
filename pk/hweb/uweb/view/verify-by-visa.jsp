<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/shims.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/util.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/common.js"/>"></script>
<link rel="shortcut icon" href="<c:url value="/resources/img/hype-favicon.png"/>" type="image/x-icon">
<link rel="icon" href="<c:url value="/resources/img/hype-favicon.png"/>" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/project.css"/>" />
</head>
<body>
	<form id="pagam3DForm" action="${ResponsePV.pagamFormUrl}" method="post">
		<input type="hidden" name="a" value="${ResponsePV.shopId}">
		<input	type="hidden" name="b" value="${ResponsePV.PAReq}"> 
		<input type="hidden" name="c" value="${ResponsePV.pagamResultUrl}">
	</form>
	<div id="spinner-overlay" class="popup-overlay">
		<div class="overlay-mask"></div>
		<div class="spinner"></div>
	</div>

<script>
$(document).ready(function(){
	if(typeof up_common !== "undefined") {
		up_common.spinnerOverlay(true);
		document.getElementById('pagam3DForm').submit();
	}
});

</script>
</body>
</html>