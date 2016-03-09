<!DOCTYPE HTML>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>HYPE WALLET - Error
    </title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <link rel="shortcut icon" href="<c:url value="/resources/img/favicon.ico"/>">
    <script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/bootstrap.js"/>"></script>

    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/reset.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fonts.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-large.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-tablet.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-smartphone.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/project-nologin.css"/>" />
</head>

<body>
    <div class="form-container">
        <div class="container-fluid">
            <div class="container">
                <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                    <div class="row">
                        <div class="col-md-12 logo-wrap">
                            <div class="logo"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <c:choose>
								<c:when test="${'PAGAM_ENROLL'== enrollment_type}">
									<div class="head">Conferma Registrazione</div>
								</c:when>
								<c:otherwise>
									<div class="head">Accesso ai servizi online</div>
								</c:otherwise>
							</c:choose>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 message-body">
                            
							<c:choose>
								<c:when test="${'PAGAM_ENROLL'== enrollment_type}">
									<div class="message-head">Richiesta scaduta</div>
								</c:when>
								<c:otherwise>
									<div class="message-head">Si e' verificato un errore.</div>
								</c:otherwise>
							</c:choose>
							
                            <div class="message">Invalid Access.</div>
                            
                            <c:choose>
								<c:when test="${'PAGAM_ENROLL'== enrollment_type}">
								 <%-- <div class="form-footer"><a href="<c:url value="/register/initRegistration?secrandid=${secrandid}"/>" title="Problema tecnico">OK</a></div> --%>
								 </c:when>
								<c:otherwise>
                            <div class="form-footer">Click here for <a href="<c:url value="/login.html"/>" title="login">Login</a></div>
                            </c:otherwise>
							</c:choose>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sticky-push"></div>
    </div>
    <div class="sticky-footer">
        <div class="col-sm-12">
            <div class="copyright">
                <span>&#169; HYPE WALLET - Gruppo Banca Sella</span>
            </div>
        </div>
    </div>
    <%session.invalidate();%>
</body>

</html>
