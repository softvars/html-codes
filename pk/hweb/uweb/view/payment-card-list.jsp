
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<tiles:insertDefinition name="paymentlayout">

<tiles:putAttribute name="title">
	HYPE WALLET - Payment User Cards
</tiles:putAttribute>
	
<tiles:putAttribute name="javascript">
     <script type="text/javascript">
        var checkCvvForHypeCard = "${cvvCheckForHypeCard}";
        var checkCvvForOtherCard = "${cvvCheckForOtherCard}";
     </script>
     <script type="text/javascript" src="<c:url value="/resources/js/controller/payment.js"/>"></script>
</tiles:putAttribute>
<tiles:putAttribute name="css">
    <link  rel="stylesheet" type="text/css" href="<c:url value="/resources/css/payment.css" />">
</tiles:putAttribute>

<tiles:putAttribute name="body">
    <div id="cards-body-container" data-txnid="${paymentTrxId}">
        <div class="row">
            <div class="col-md-12">
                <div class="personal-data-panel">
                    <div class="container-fluid min_height">
                        <div class="row head">
                            <div class="col-md-7 logo-wrap">
                                <div class="logo"></div>
                            </div>
                            <div class="col-md-5">
                                <div class="username">${userInfo.firstName} ${userInfo.lastName}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 transaction-info">
                                <div class="row">                      
                                    <div class="col-sm-9 label insegna"><c:if test="${not empty insegna}">${insegna}</c:if></div>
                                    <div class="col-sm-1 label">totale</div>
                                    <div class="col-sm-2 amount">&#8364; ${amount}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div id="paymentCarteDiv" data-txnid="${paymentTrxId}"></div>
                            <div class="select-card hide">
                                <fieldset>
                                    <div class="cancel">
                                        <span>Annulla</span>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</tiles:putAttribute>
<tiles:putAttribute name="footer">
    <div class="sticky-footer">
        <div class="col-sm-12">
            <div class="copyright">
                <span>&#169; HYPE WALLET - Gruppo Banca Sella</span>
                <span class="dot hidden-xs"> &#183; </span>
           		 <span class="terms">
                	<a href="/upweb/termsandprivacy" target="_blank" title="Privacy Policy">Privacy Policy</a>
            	</span>
            </div>
        </div>
    </div>
</tiles:putAttribute>
</tiles:insertDefinition>
        

    