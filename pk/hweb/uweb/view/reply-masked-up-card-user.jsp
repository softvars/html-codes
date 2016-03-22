<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="reply.card.layout">
	<tiles:putAttribute name="title">
		WebWallet - Accesso
	</tiles:putAttribute>

	<tiles:putAttribute name="javascript">
	<script type="text/javascript">
			var maskedCardValues = JSON.parse('${maskedCardValues}');
			console.log(maskedCardValues);
		</script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/pagam-user-registration.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/cardvalidator.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/user-profile.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/pagam-reg-upmobile-card-user.js"/>"></script>

	</tiles:putAttribute>
</tiles:insertDefinition>