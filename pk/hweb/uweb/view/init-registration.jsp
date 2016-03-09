<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="baselayout">
	<tiles:putAttribute name="title">
	Hype Wallet Web - Pre Registration
</tiles:putAttribute>
<tiles:putAttribute name="javascript">
<script type="text/javascript">
	$(function() {
		
		$(document.body).on('click', '#preregister-user-btn', function(e) {
			var formData = serializeObject('#preregister-user-form', true);
						var request = _.ajax({
				url : "/upweb/register/preregister",
				contentType : "application/json",
				data : formData,
				type : "POST"
			});
			request.done(function(responseData) {
				$("#mainContent").html(responseData);
			});

			request.fail(function(jqXHR, textStatus) {
				console.log("Error in adding Address : " + textStatus);
				//TODO: Close Add pop up or show the error to correct the input by user.
			});
			e.preventDefault();
			return false;
		});

		$(document.body).on('click', '#validateSubmit', function(e) {
			var formData = serializeObject('#validationForm', true);
			var request = _.ajax({
				url : "/upweb/register/validateUser",
				contentType : "application/json",
				data : formData,
				type : "POST"
			});
			request.done(function(responseData) {
				$("#mainContent").html(responseData);
			});

			request.fail(function(jqXHR, textStatus) {
				console.log("Error in adding Address : " + textStatus);
				//TODO: Close Add pop up or show the error to correct the input by user.
			});
			e.preventDefault();
			return false;
		});
	});
</script>
</tiles:putAttribute>
<tiles:putAttribute name="body">
		<center>
<div id="mainContent">
	<%@ include file="init-registration-form.jsp" %>	
</div>
</center>
</tiles:putAttribute>
</tiles:insertDefinition>