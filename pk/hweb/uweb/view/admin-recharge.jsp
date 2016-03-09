<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<form method="post" action="proceed">
<table>
<tr>
<td><label><strong>Recharge Request</strong></label></td>
<td><textarea rows="10" cols="80" name="rechargeRequest" value="" size = "140">
</textarea>
</td>
</tr>

<tr></tr>

<tr>
<td><label><strong>SSO Token</strong></label></td>
<td><input name="ssotoken" value="" size = "120" /></td>
</tr>

<tr>
<td colspan="1"><input type="submit" /></td>
</tr>
</table>

</form>
</body>
</html>