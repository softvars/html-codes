<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="errorlayout">
	<tiles:putAttribute name="title">
		HYPE WALLET - Error
	</tiles:putAttribute>
	<tiles:putAttribute name="javascript">
		<script type="text/javascript">
			$(window).load(function() {
				pageUnload.invalidateSession();
			});
		</script>
	</tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container">
                <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                    <div class="row">
                        <div class="col-md-12 logo-wrap">
                            <div class="logo"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <!-- <div class="head">Accesso ai servizi online</div> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 message-body">
                            <div class="message-head" align="center">Page Not Found.</div>
                            <div class="message">The page you are looking is not found.</div>
                            <c:choose>
								<c:when test="${'PAGAM_ENROLL'== enrollment_type}">
								 <%-- <div class="form-footer"><a href="<c:url value="/register/initRegistration?secrandid=${secrandid}"/>" title="registration">OK</a></div> --%>
								 </c:when>
								<c:otherwise>
                            <div class="form-footer">Vai a <a href="<c:url value="/login.html"/>" title="404page">Login</a></div>
                            </c:otherwise>
							</c:choose>
                        </div>
                    </div>
                </div>
            </div>
	</tiles:putAttribute>
</tiles:insertDefinition>