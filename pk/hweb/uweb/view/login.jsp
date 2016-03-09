<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="loginlayout">
	<tiles:putAttribute name="title"> HYPE WALLET - Accesso	</tiles:putAttribute>
	<tiles:putAttribute name="css">
      <style type="text/css">
        .form-footer a{
            margin-left: 5px;
        }
      </style>
    </tiles:putAttribute>
	<tiles:putAttribute name="javascript">
	  <script type="text/javascript" src="<c:url value="/resources/js/controller/login-dashboard.js"/>"></script>
	  <c:if test="${registration_status == 'success'}">
      	<script type="text/javascript">
            var registration_status_msg = '${registration_status}';
            $(function() {
                if(registration_status_msg && registration_status_msg === 'success') {
                    if(isExist(loginDashboardController)) {
                        loginDashboardController.showRegSuccessAlert();
                    }
                }
            });
      	</script>
      </c:if>
    </tiles:putAttribute>
	<tiles:putAttribute name="body">
		<div class="container">
                <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                    <div class="row">
                        <div class="col-sm-12 logo-wrap">
                            <div class="logo"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="head">Accedi a HYPE WALLET</div>
                            <div class="sub-head">Inserisci i tuoi codici di accesso</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <form method="POST" class="login-form" action="/AuthenticationDelegatedServlet" name="form_autenticazione" id="form_autenticazione">
                              <input type="hidden" name="delegated_service" value="269" style="display:none;" form="form_autenticazione" />
                              <input type="hidden" name="AU_HypeWalletSectionName" value="DASHBOARD" style="display:none;" form="form_autenticazione" />
                                <fieldset>
                                    <label for="user-code">EMAIL</label>
                                    <div class="input-group">
                                        <input type="text" name="UserId" id="UserId" placeholder="latuaemail@email.it" class="text-input" />
                                        <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
                                        </span>
                                        <div class="input-msg">Il codice utente inserito non &#232; corretto</div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <label for="password">password</label>
                                    <div class="input-group">
                                    	<input type="text" name="fake_password" placeholder="Password" class="text-input fake_password" autocomplete="off"/>
										<input type="password" name="Password" id="Password" class="text-input hide-it" autocomplete="off"/> 
                                        <span class="input-group-btn">
                                            <span class="input-group-addon"></span>
                                        </span>
                                        <div class="input-msg"></div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <input type="submit" name="send" value="ACCEDI" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-footer">Non hai un profilo HYPE WALLET? <a href="/upweb/register/initRegistration?secrandid=${secrandid}">Creane uno</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
						<div class="col-sm-12">
						    <div class="form-footer">Hai dimenticato la password? <a href="password/initForgotPasssword?secrandid=${secrandid}" title="Hai dimenticato la password?">Clicca qui</a>
						    </div>
						</div>
					</div>
                </div>
            </div>
	</tiles:putAttribute>
</tiles:insertDefinition>