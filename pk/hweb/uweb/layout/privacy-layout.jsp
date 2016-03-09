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
</head>
<body>
	<div class="form-container">
        <div class="container-fluid">
			<tiles:insertAttribute name="body" />
		</div>
	</div>
	
	<div class="sticky-footer">
		<div class="col-sm-12">
			<div class="copyright">
				<span>&#169; HYPE WALLET - Gruppo Banca Sella</span>
			</div>
		</div>
	</div>
	
</body>
</html>