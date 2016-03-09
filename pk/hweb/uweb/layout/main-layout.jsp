<!DOCTYPE html>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title><tiles:insertAttribute name="title" /></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="description" content="">
    <link rel="shortcut icon" href="<c:url value="/resources/img/favicon.ico"/>">

    <script type="text/javascript" src="<c:url value="/resources/lib/jquery-1.11.1.min.js"/>"></script>
    <tiles:insertAttribute name="javascript-logout-handler" />
    <script type="text/javascript" src="<c:url value="/resources/lib/jquery.placeholder.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/js.cookie.js"/>"></script>
    <tiles:insertAttribute name="javascript-datepicker" />
    <script type="text/javascript" src="<c:url value="/resources/lib/bootstrap.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/bootstrap-select.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/lib/underscore-min.js"/>"></script>
    
    <script type="text/javascript" src="<c:url value="/resources/js/shims.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/util.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/common.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/http.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/validator.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/before-unload.js"/>"></script>

    <!--[if lte IE 9]>
            <script type="text/javascript" src="<c:url value="/resources/lib/bootstrap-carousel-iefix.js"/>"></script>
        <![endif]-->
    
    <script type="text/javascript" src="<c:url value="/resources/js/script.js"/>"></script>
    <!--[if lte IE 9]>
            <script type="text/javascript" src="<c:url value="/resources/js/flipcard-iefix.js"/>"></script>
        <![endif]-->
    <tiles:insertAttribute name="javascript" />

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
    <tiles:insertAttribute name="css" />
    <tiles:insertAttribute name="templates" />
</head>
<body>
   <tiles:insertAttribute name="header" />
    <div id="page-content">
        <tiles:insertAttribute name="navmenu" />
        <div class="content-wrap">
            <tiles:insertAttribute name="msg-container" />
            <tiles:insertAttribute name="profiloheader" />
            <tiles:insertAttribute name="app-add" />
            <div class="container main">
                <tiles:insertAttribute name="body" />
            </div>
            <tiles:insertAttribute name="footer" />
        </div>
    </div>
    <tiles:insertAttribute name="overlay" />
    <tiles:insertAttribute name="hiddendata" />
    <tiles:insertAttribute name="contacts" />
    <tiles:insertAttribute name="support" />
    <tiles:insertAttribute name="faq" />
    <tiles:insertAttribute name="tnc" />
    <tiles:insertAttribute name="privacy" />
    <tiles:insertAttribute name="payment-alert-container" />
    <tiles:insertAttribute name="web-attack-prevention" />
    <tiles:insertAttribute name="editpassword" />
    <div class="modal bottom" id="modal-faq" tabindex='-1'></div>
</body>
</html>