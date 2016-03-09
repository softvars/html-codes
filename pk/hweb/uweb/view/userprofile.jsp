<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


<tiles:insertDefinition name="profilolayout">
    <tiles:putAttribute name="title">
        HYPE WALLET - Profilo
    </tiles:putAttribute>
    <tiles:putAttribute name="javascript">
    	<script type="text/javascript" src="<c:url value="/resources/lib/typeahead.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controller/wallet.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controller/profile.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controller/address.js"/>"></script>
        <script type="text/javascript">
            var isHypeUser = '${isHypeUser}';
        	var response_msg = '${upwebCardResponse.statusMsg}' || '${updateProfileResponse.statusMsg}';
        	$(function(){
        		if(response_msg) {
        			var response = {};
        			response["description"] = '${upwebCardResponse.description}' || '${updateProfileResponse.description}';
        			walletController.renderAlert(response, response_msg.toLowerCase() == "ok" ? true : false);
        		}
        	});
        </script>
    </tiles:putAttribute>
    <tiles:putAttribute name="css">
    	<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/typeahead.css"/>" />
    </tiles:putAttribute>
    <tiles:putAttribute name="body">
<div id="profile-body-container" class="hide"></div>
<div id="address-body-container" class="hide">
    <div class="row">
        <div class="col-md-12">
            <div class="personal-data-panel">
                <div class="container-fluid min_height">
                    <div class="row head">
                        <div class="col-xs-10">Indirizzi di spedizione</div>
                        <div class="col-xs-2 align-right">
                            <a href="#add_address" title="Aggiungi indirizzo" class="add add-new-address"></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row" id="user-address-list">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="cards-body-container" class="hide">
    <div class="row">
        <div class="col-md-12">
            <div class="personal-data-panel">
                <div class="container-fluid min_height">
                    <div class="row head">
                        <div class="col-xs-12">Carte di credito</div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div id="profilocarteDiv" data-preferred-card="${preferredCard.paymentMethodId}"></div>
                        <div id="staticHypeData" class="hide">
                        <div class="col-sm-6  col-md-4 col-xs-12 credit-card-container">
                            <div class="credit-card">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="card-plate empty">
                                            <div class="middle">
                                                <a href="#add_card" class="add-card" alt="Collega una carta">
                                                    <div class="plus">+</div>
                                                    <div class="text">Collega una carta</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</tiles:putAttribute>
<tiles:putAttribute name="hiddendata">
<div class="modal bottom" id="modal-address" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div class="row head">
                                    <div class="col-sm-12">Inserisci nuovo indirizzo</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <form method="POST" class="address-form" id="address-form">
                                            <fieldset>
                                                <label for="address-name">alias indirizzo</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="alias" id="address-name" placeholder="Alias indirizzo da salvare" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="campanello-name">nome campanello</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="afn" id="campanello-name" placeholder="Nome indirizzo da salvare" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="campanello-surname">cognome campanello</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="aln" id="campanello-surname" placeholder="Cognome indirizzo da salvare" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="address-province">provincia</label>
                                                <div class="input-group">
        											<input type="text" name="prov" id="address-province" placeholder="Seleziona una provincia..." class="text-input" autocomplete="off" spellcheck="false">
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <div class="row">
                                                <div class="col-xs-8 less-padding-right">
                                                
                                                <fieldset class="address-city">
                                                <label for="address-city">citt&#224;</label>
                                                <div class="input-group">
        											<input type="text" name="city" id="address-city" placeholder="Seleziona una citt&#224;..." class="text-input" autocomplete="off" spellcheck="false">
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                                </div>
                                                <div class="col-xs-4 less-padding-left">
                                                    <label for="user-code">cap</label>
                                                    <div class="input-group-block">
                                                        <input type="text" name="zip" id="user-code" placeholder="Numero" class="readonly" readonly />
                                                        <div class="input-msg"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <fieldset>
                                                <label for="address-via">via</label>
                                                <div class="input-group">
        											 <input type="text" class="text-input" name="street" id="address-via" placeholder="Inserisci qui l'indirizzo..." />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="user-phonenumber">Numero telefonico di riferimento</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="acn" id="user-phonenumber" placeholder="Inserisci qui il numero telefonico..." />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <input type="hidden" name="addressId" id="address-addressId" />
                                                <input type="submit" name="send" value="AGGIUNGI INDIRIZZO"/>
                                                <div data-dismiss="modal" class="cancel"><span>Annulla</span></div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal bottom" id="modal-add-card" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div class="row head">
                                    <div class="col-sm-12">Collega carta</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <form method="POST" class="add-card-form" action="" id="add-card-form-id">
                                            <fieldset>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="cardAlias" id="card-name" placeholder="Nome carta di credito" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <div class="credit-card">
                                                <div class="flip-container" id="card-container">
                                                    <div class="flipper">
                                                        <div class="card-plate front">
                                                            <div class="top">
                                                                <div class="chip"></div>
                                                                <div class="type">
                                                                    <div id="card-type"></div>
                                                                </div>
                                                            </div>
                                                            <div class="middle">
                                                                <div class="card-code" id="card-code-1">****</div>
                                                                <div class="card-code" id="card-code-2">****</div>
                                                                <div class="card-code" id="card-code-3">****</div>
                                                                <div class="card-code" id="card-code-4">****</div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="holder">
                                                                    <div class="label">intestata</div>
                                                                    <div class="name">${userInfo.displayName}</div>
                                                                </div>
                                                                <div class="expiry-date align-right">
                                                                    <div class="label">validit&#224;</div>
                                                                    <div class="name">
                                                                        <span class="expiry-date-month">--</span> / <span
                                                                            class="expiry-date-year">--</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card-plate back">
                                                            <div class="top">
                                                                <div class="magnetic-stripe"></div>
                                                            </div>
                                                            <div class="middle">
                                                                <div class="sign-place"></div>
                                                                <div class="cvc"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <fieldset>
                                                <div class="input-group input-error-fix">
                                                    <input type="text" name="pan" class="text-input" id="card-code" placeholder="Numero carta di credito" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <div class="row">
                                                <div class="col-xs-6 less-padding-right">
                                                    <fieldset>
                                                        <input type="text" class="readonly" readonly name="firstName" id="name" value="${userInfo.firstName}" />
                                                    </fieldset>
                                                </div>
                                                <div class="col-xs-6 less-padding-left">
                                                    <fieldset>
                                                        <input type="text" class="readonly" readonly name="lastName" id="surname" value="${userInfo.lastName}" />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6 less-padding-right">
                                                    <fieldset>
                                                        <div class="input-group input-error-fix">
                                                            <input type="text" class="text-input expiry-date" name="expiryDate" data-target-id="card-container"
                                                            placeholder="MM / AA" />
                                                            <span class="input-group-btn">
                                                                <span class="input-group-addon"></span>
                                                            </span>
                                                            <div class="input-msg"></div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="col-xs-6 less-padding-left">
                                                    <fieldset>
                                                        <div class="input-group info-black input-error-fix">
                                                        	 <input type="text" name="fake_password" placeholder="CVV/CVC" class="text-input fake_password" autocomplete="off"/>
                                                            <input type="password" autocomplete="off" class="text-input cvc-code hide-it" name="cvv" data-target-id="card-container" />
                                                            <span class="input-group-btn"> 
                                                                <span class="input-group-addon cvc-popover" id="cvc-popover-add"></span>
                                                            </span>
                                                            <div class="input-msg"></div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6 less-padding-right">
                                                    <div class="checkbox">
                                                        <input id="fav-card" type="checkbox" name="prefferedCard"> 
                                                        <label for="fav-card" class="noselect">carta preferita</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="hidden" id="circuitName" class="readonly" name="circuitName" value="" />
                                            <fieldset>
                                                <input type="submit" id="add-card-btn" name="send" value="COLLEGA CARTA" />
                                                <div data-dismiss="modal" class="cancel">
                                                    <span>Annulla</span>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal bottom" id="modal-card-info" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid card-info">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div class="row head">
                                    <div class="col-sm-12">Carta Hype</div>
                                </div>
                                <div class="credit-card">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card-plate hype">
                                                <div class="top">
                                                    <div class="chip"></div>
                                                    <div class="type">
                                                        <div class="hype"></div>
                                                    </div>
                                                </div>
                                                <div class="middle">
                                                    <div class="card-code" id="card-code-1">****</div>
                                                    <div class="card-code" id="card-code-2">****</div>
                                                    <div class="card-code" id="card-code-3">****</div>
                                                    <div class="card-code" id="card-code-4">****</div>
                                                </div>
                                                <div class="bottom">
                                                    <div class="type">
                                                        <div class="mastercard"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="text">
                                            <p>
                                                <span class="strong">HYPE</span> &#232; l'idea che rivoluziona
                                                il modo incui gestisci il denaro e ti consente di vivere
                                                al meglio le esperienze che desideri per la tua vita.
                                            </p>
                                            <p>
                                                Essere parte di <span class="strong">HYPE</span> &#232;
                                                semplice e immediato. <a href="#" class="blue-text-link"
                                                    title="Link">Grazie all'app</a>, puoi gestire facilmente
                                                i tuoi soldi ed effettuare pagamenti in libert&#224;. <span
                                                    class="strong">HYPE</span> &#232; anche una carta pensata per
                                                essere con te in ogni luogo.
                                            </p>
                                            <p>Cambia il modo di gestire i tuoi soldi. Prendi parte
                                                all'innovazione.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <input type="submit" name="send"
                                            value="SCOPRI IL MONDO HYPE" />
                                        <div data-dismiss="modal" class="cancel">
                                            <span>Chiudi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal bottom" id="modal-edit-cards" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div class="row head">
                                    <div class="col-sm-12">Modifica Carta</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div id="edit-cards-carousel" data-interval="false"
                                class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner" role="listbox">

                                </div>

                                <a class="left carousel-control" href="#edit-cards-carousel"
                                    role="button" data-slide="prev"> <span class="left-arrow"></span>
                                </a> <a class="right carousel-control" href="#edit-cards-carousel"
                                    role="button" data-slide="next"> <span
                                    class="right-arrow"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal bottom" id="modal-edit-profile" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div class="row head">
                                    <div class="col-sm-12">Modifica dati personali</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <form method="POST" class="edit-profile-form" action="" >
                                            <fieldset>
                                                <label for="edit-name">nome</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="firstName" id="edit-name" placeholder="Nome"/>
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="edit-surname">cognome</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input" name="lastName" id="edit-surname" placeholder="Cognome"/>
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset class="hide_it sesso_field">
                                                <label for="edit-gender">sesso</label>
                                                <div class="input-group input-group-block">
                                                    <select name="gender" id="edit-gender" class="selectpicker">
                                                        <option>Maschio</option>
                                                        <option>Femmina</option>
                                                    </select>
                                                </div>
                                            </fieldset>
                                            
                                            <fieldset>
                                                <label for="edit-date">data di nascita</label>
                                                <div class="input-group-block birthdate">
                                                    <input type="text" placeholder="DD/MM/YYYY" name="birthDate" id="edit-date" picker-bind="birthDate__datepicker"/>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <label for="edit-cf">codice fiscale</label>
                                                <div class="input-group">
                                                    <input type="text" class="text-input edit_codice_fiscale" name="taxCode" id="edit-cf" placeholder="Inserisci qui il tuo codice fiscale..." value="" />
                                                    <span class="input-group-btn">
                                                        <span class="input-group-addon"></span>
                                                    </span>
                                                    <div class="input-msg"></div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <input type="submit" name="send" value="SALVA MODIFICHE" />
                                                <div data-dismiss="modal" class="cancel"><span>Annulla</span></div>
                                            </fieldset>
                                            <input type="hidden" name="accId" id="edit-accId" value="" />
                                            <input type="hidden" name="verifiedOnWeb" id="edit-VerifiedOnWeb" value="true" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</tiles:putAttribute>
</tiles:insertDefinition>
