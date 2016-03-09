<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:if test="${message ne null}">
		<div class="error message">
			${message}
		</div>
	</c:if>
<form:form modelAttribute="initRegistrationPV" action="#" id="validationForm">
		<input type="text" name="email"/><form:errors path="email" class="error"></form:errors>
		<input type="submit" value="Check" id="validateSubmit"/>
</form:form>

