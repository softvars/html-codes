<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css"  href="<c:url value="/resources/css/hype-3d-esito.css"/>" />
</head>

<body class="">
    <div class="modal-dialog resume-dialog">
        <div class="backdrop"></div>
        <div class="overdrop scrollable">
            <div class="description">
                <div class="content">
                    <div>
                        La Verifica 3D Secure &egrave;
                        <br />stata effettuata
                    </div>
                </div>
                <br />
                <div class="small">
                    Procedi per verificarne l&#39;esito
                </div>
            </div>
            <div class="button-container">
                <a href="<c:url value="${ResponsePV.redirectUrl}"/>" class="glb-btn success">Torna ad HYPE<span class="arrow">&nbsp;</span></a>
            </div>
        </div>
    </div>
</body>
</html>
