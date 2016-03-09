<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="it.sella.upweb.controller.RequestKey"%>


<%
    boolean isPaymentFlow_ = false;
    Boolean isPaymentFlow = (Boolean) request.getAttribute("isPaymentFlow") ;
    isPaymentFlow_ = isPaymentFlow != null && Boolean.TRUE.equals(isPaymentFlow) ;
%>

<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>HYPE WALLET - Error Unsupported Browser 
    </title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <link rel="shortcut icon" href="<c:url value="/resources/img/favicon.ico"/>">
    <script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/bootstrap.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/resources/lib/underscore-min.js"/>"></script>
    <!-- Custom script -->
    <script type="text/javascript" src="<c:url value="/resources/js/shims.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/util.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/common.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/http.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/validator.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/before-unload.js"/>"></script>
    <script type="text/javascript">
        if(typeof up_common !== "undefined") {
            up_common.beforeunload_alertMessage = UP_CONSTANTS.REGISTRATION_CANCELLED;
        }
    </script>

     <style type="text/css">
		.transparent_class {
		    background:rgb(0,0,0);
		    background: transparent\9;
		    background:rgba(0,0,0,0.3);
		    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#2c000000, endColorstr=#2c000000);
		    zoom: 1;
		}
		.transparent_class:nth-child(n) {
		    filter: none;
		}
    </style>

    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/reset.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fonts.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/classic.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/classic.date.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/bootstrap-select.min.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-large.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-tablet.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/global-smartphone.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/project.css"/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/project-nologin.css"/>" />
    
     <style type="text/css">
		.hide-on-popup {
		  display: none
		}
    </style>
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
                    <div class="row<%= isPaymentFlow_ ? " hide-on-popup" : ""%>">
						<div class="col-sm-12">
							<div class="head">Browser Non Supportato</div>
						</div>
					</div>
                    <div class="row<%= isPaymentFlow_ ? " hide-on-popup" : ""%>">
                        <div class="col-md-12 message-body">
							<div class="message-head" align="center">Browser Non Supportato</div>
							<div class="message">Siamo spiacenti, la versione del tuo browser non &#232; supportata. Prova ad aggiornare il tuo browser o a utilizzarne un altro.</div>
                            <div class="form-footer">Vai a <a href="<c:url value="${ redirectionLink }"/>" title="Unsupported Browser">HomePage</a></div>
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
                <span class="dot hidden-xs"> &#183; </span> 
                <span class="terms">
					<a href="#privacy_policy" id="privacy_policy" title="Privacy Policy">Privacy Policy</a>
				</span>
			</div>
        </div>
    </div>
	<div class="confirm-modal transparent_class<%= isPaymentFlow_ ? "" : " hide-it"%>" id="unsupported-browser-payment-alert">
	    <div class="popover hype-wallet-alert button-middle unsupported-browser-payment">
	        <div class="popover-title">
	            <span>Attenzione</span>
	        </div>
	        <div class="popover-content">
	            <span class="1">Siamo spiacenti, non &#232; possibile procedere con il pagamento. La versione del tuo browser non &#232; supportata.</span>
	        </div>
	        <div class="popover-actions row">
	            <div class="positive col-xs-6" id="close-unsupported-browser-payment">
	                <a href="<c:url value="${ redirectionLink }"/>">OK</a>
	            </div>
	        </div>
	    </div>
	</div>
	<jsp:include page="/WEB-INF/layout/privacy.jsp"/>
    	<%session.invalidate();%>
</body>

</html>
