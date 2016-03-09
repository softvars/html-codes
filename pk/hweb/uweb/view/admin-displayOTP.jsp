<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OTP Details</title>
<style type="text/css">
td {
 font-family: Calibri, "Times New Roman", Times, serif;
 font-size: 16px;
}

h3 {
	display: block;
	text-align: left;
	padding: 0;
	margin: 0px 0px 20px 0px;
	font-size: large;
	font-family: Calibri, "Times New Roman", Times, serif;
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
</head>
<body>
<h3>${requestTypeHeader} for Email Address: <font color="blue">${email}</font></h3>
<table width="90%" border="1px">
<tr >
<td align="center" width="8%"><h4>Email OTP</h4></td>
<td align="center" width="8%"><h4>SMS OTP</h4></td>
<td align="center" width="12%"><h4>Name</h4></td>
<td align="center" width="12%"><h4>SurName</h4></td>
<td align="center" width="10%"><h4>Mobile Number</h4></td>
<td align="center" width="15%"><h4>Date</h4></td>
<td align="center" width="25%"><h4>Status</h4></td>
</tr>
<c:forEach items="${profilePVList}" var="userProfile">
<tr >
<td width="8%"><h4><c:choose><c:when test="${userProfile.emailOtp != null}">${userProfile.emailOtp}</c:when><c:otherwise><p align="center"><strong>-</strong></p></c:otherwise></c:choose></h4></td>
<td width="8%"><h4><c:choose><c:when test="${userProfile.smsOtp != null}">${userProfile.smsOtp}</c:when><c:otherwise><p align="center"><strong>-</strong></p></c:otherwise></c:choose></h4></td>
<td width="12%"><h4><c:choose><c:when test="${userProfile.firstName != null}">${userProfile.firstName}</c:when><c:otherwise><p align="center"><strong>-</strong></p></c:otherwise></c:choose></h4></td>
<td width="12%"><h4><c:choose><c:when test="${userProfile.lastName != null}">${userProfile.lastName}</c:when><c:otherwise><p align="center"><strong>-</strong></p></c:otherwise></c:choose></h4></td>
<td width="10%"><h4><c:choose><c:when test="${userProfile.mobileNumber != null}">${userProfile.mobileNumber}</c:when><c:otherwise><p align="center"><strong>-</strong></p></c:otherwise></c:choose></h4></td>

<td width="15%"><h4>${userProfile.sesso}</h4></td>

<td width="25%"><h4>${userProfile.provincia}</h4></td>
</tr>
</c:forEach>
</table>
<br>
<form class="form-style-7" action="getOTPDetails">
<div align="center">
<input type="submit" value="Back" align="middle"/>
</div>
</form>

</body>
</html>