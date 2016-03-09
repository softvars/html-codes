<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="pagam.new.registration">
	<tiles:putAttribute name="title">
	WebWallet - Accesso

</tiles:putAttribute>
	<tiles:putAttribute name="javascript-datepicker">
  		 <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/picker.js"/>"></script>
   		 <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/legacy.js"/>"></script>
   		 <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/picker.date.js"/>"></script>
   		 <script type="text/javascript" src="<c:url value="/resources/lib/datepicker/it_IT.js"/>"></script>
 	</tiles:putAttribute>
 
	<tiles:putAttribute name="javascript">
		<script type="text/javascript" src="<c:url value="/resources/js/controller/pagam-user-registration.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/user-profile.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/controller/pagam-reg-new-user.js"/>"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="terms-and-conditions-privacy-policy">
		<%@ include file="/WEB-INF/layout/terms-conditions-and-privacy-policy.jsp" %>
	</tiles:putAttribute>
</tiles:insertDefinition>