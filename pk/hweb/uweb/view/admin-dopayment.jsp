<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
<script>
$(function() {
        $("#url").change( function()
           {
            $("a").attr("href",$(this).val());   
           }
      );
});
</script>
<style type="text/css">
.encrypt-key{
padding: 0px 0px 0px;
margin-left: 35%;    
margin-top: 5%;    
} 
.style-1 input[type="submit"],.style-1 input[type="button"] {
	background: #2471FF;
	border: none;
	padding: 10px 20px 10px 20px;
    margin-left: 15%;
	border-bottom: 3px solid #5994FF;
	border-radius: 3px;
	color: #D2E2FF;
}   
.style-1 input[type="text"] {
  padding: 21px 98px 20px;
  border: solid 1px #dcdcdc;
  text-align: center;    
  transition: box-shadow 0.3s, border 0.3s;
}
.style-1 input[type="text"]:focus,
.style-1 input[type="text"].focus {
  border: solid 1px #707070;
  box-shadow: 0 0 5px 1px #969696;
}   
h3 {
	display: block;
	text-align: left;
	padding: 0;
	margin: 0px 0px 20px 0px;
	font-size: large;
	font-family: Calibri, "Times New Roman", Times, serif;
}
    
</style>
</head>
<body>
<div class="style-1 encrypt-key">
<h3>The request will be redirect to the given URL</h3>    
<textarea id="url" rows="4" cols="50" style="width : 48%;height: 25%">http://172.21.20.180/pagam/pagam.aspx/pagam.aspx?a=MobileEcommP&b=${encryptedValue}</textarea>
<br/><br/>
<a id="href-id" href="http://172.21.20.180/pagam/pagam.aspx/pagam.aspx?a=MobileEcommP&b=${encryptedValue}"><input type="button" id="submitbutton" value="Submit" /></a>
</div>        
</body>
</html>