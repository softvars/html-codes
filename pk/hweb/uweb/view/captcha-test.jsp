<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8" />
		<title>Captcha Reader</title>
	</head>
	<body>
	<c:choose>
	    <c:when test="${showGoodResult}">
	       <h1 style="color: green;">Your kung fu is good!</h1>
	    </c:when>
	    <c:when test="${showBadResult}">
	        <h1 style="color: red;">This is not right. Try again!</h1>
	    </c:when>
	</c:choose>
		<p>Type in the word seen on the picture</p>
		<form action="" method="post">
			<input name="captcha" type="text" autocomplete="off" />
			<input type="submit" />
		</form>
		<img alt="captcha image" src="/upweb/request/captcha/img" />
	</body>
</html>
