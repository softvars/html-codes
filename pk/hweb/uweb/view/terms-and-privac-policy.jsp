<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="privacylayout">
	<tiles:putAttribute name="title">
		Hype Wallet - Privacy Policy
	</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript">
			
		</script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="payment-privacy" id="payment-privacy">
			<%@ include file="/WEB-INF/layout/privacy-policy-contetnt.jsp" %>
		</div>
	</tiles:putAttribute>
</tiles:insertDefinition>