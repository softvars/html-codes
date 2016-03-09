<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OTP Detail</title>
<style type="text/css">
.form-style-7 {
	max-width: 400px;
	margin: 50px auto;
	background: #fff;
	border-radius: 2px;
	padding: 20px;
	font-family: Georgia, "Times New Roman", Times, serif;
}

h3 {
	display: block;
	text-align: center;
	padding: 0;
	margin: 0px 0px 20px 0px;
	font-size: large;
	font-family: Calibri, "Times New Roman", Times, serif;
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
	font-size: 16px;
	overflow: hidden;
	font-family: Calibri, Helvetica, sans-serif;
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
	font-size: 18px;
	padding: 0;
	font-family: Calibri, "Times New Roman", Times, serif;
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
	font-family: Calibri, Helvetica, sans-serif;
	font-size: 14px;
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
</head>
<body>
<div align="center">
<h3>Enter Request Type and Email to retrieve OTP Details</h3>
</div>
<form class="form-style-7" name="emailForm" action="otpDetails" method="post">
	<ul>
		
		<li><label for="requestType">Request Type</label> 
		<select id="requestSelect" name="requestType" >
		<option value="REGR">Registration Request</option>
		<option value="FPR">Forget Password Request</option>
		<option value="PTR">Payment Transaction Request</option>
		</select>
		</li>
		<li><label for="email">Email Address</label> 
		<input type="text" id="email" name="email" autofocus="autofocus" > 
		<span></span></li>
		<c:if test="${errorMessage != null}">
		<p align="right"><font color="red" face="Calibri">${errorMessage} <strong>${email}</strong></font></p>
		</c:if>
		<li><input type="submit" name="GO" value="Go"/></li>
	</ul> 
</form>
</body>
</html>