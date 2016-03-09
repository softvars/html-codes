<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="registrationlayout">
	<tiles:putAttribute name="title">
	WebWallet - Registrati subito
</tiles:putAttribute>
	<tiles:putAttribute name="javascript-datepicker">
		 <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/picker.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/legacy.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/picker.date.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/it_IT.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/registration-new-and-upmobile-user.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<%@ include file="registration-form.jsp" %>
	</tiles:putAttribute>
	<tiles:putAttribute name="terms-and-conditions-privacy-policy">
		<%@ include file="/WEB-INF/layout/terms-conditions-and-privacy-policy.jsp" %>
	</tiles:putAttribute>
</tiles:insertDefinition>