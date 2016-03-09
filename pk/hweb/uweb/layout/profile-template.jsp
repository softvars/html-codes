<script type="template" id="profileTemplate">
<div class="row">
		<div class="col-md-6">
<div class="personal-data-panel">
    <div class="container-fluid">
        <div class="row head">
            <div class="col-xs-10">Dati anagrafici</div>
			<@ if(isHypeUser === false || isHypeUser === 'false') { @>
            	<div class="col-xs-2 align-right">
                	<a href="#edit_profile" id="edit-profile" title="Modifica dati anagrafici" class="modify"></a>
            	</div>
			<@ } @>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Nome</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@= userProfilePV.firstName @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Cognome</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@= userProfilePV.lastName @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
		<@ if(userProfilePV.sex) {@>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Sesso</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@=  userProfilePV.sex @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
		<@ } @>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Data di nascita</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@= userProfilePV.birthDate @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
		<@ if(userProfilePV.city) { @>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Citt&#224;</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@= userProfilePV.city @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
		<@ } @>
		<@ if(userProfilePV.taxCode) { @>
        <div class="row">
            <div class="col-xs-6">
                <div class="data">Codice Fiscale</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="value"><@=  userProfilePV.taxCode @></div>
            </div>
        </div>
		<@ } @>
    </div>
</div>
</div>
<div class="col-md-6">
<div class="personal-data-panel email-panel">
    <div class="container-fluid">
        <div class="row head">
            <div class="col-xs-10">Contatti personali</div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider"></div>
            </div>
        </div>
		
		<div class="row">
            <div class="col-xs-2">
                <div class="data">Email</div>
            </div>
            <div class="col-xs-10 align-right">
                <div class="mail-address"><@= userProfilePV.email @></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider-lighter"></div>
            </div>
        </div>
		<div class="row">
            <div class="col-xs-6">
                <div class="data">Numero cellulare</div>
            </div>
            <div class="col-xs-6 align-right">
                <div class="mail-address"><@= userProfilePV.mobileNumber @></div>
            </div>
        </div>
    </div>
</div>
<div class="password-panel hide-it">
    <div class="container-fluid">
        <div class="row head">
            <div class="col-xs-10">Password</div>
            <div class="col-xs-2 align-right">
                <a href="#" id="edit-password" title="Modifica password" class="modify"></a>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="divider"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="password">***********</div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</script>