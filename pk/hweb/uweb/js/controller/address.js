var AddressController = function() {
    BaseController.call(this);
    this.URLPrefix = "/upweb/auth/address/";
    this.getAddressListUrl  = this.URLPrefix + "list";
    this.addAddressUrl      = this.URLPrefix + "add";
    this.editAddressUrl     = this.URLPrefix + "update";
    this.removeAddressUrl   = this.URLPrefix + "remove";
    this.addressList = null;
    this.provinceList = null;
    this.comuneMap = null;
    this.getProvinceUrl = "/upweb/auth/province/";
    this.getComuneUrl = "/upweb/auth/comune/";
    this.fetchCities = null;
    this.state = "";
    this.city = "";
    this.method = null;
};

AddressController.prototype = Object.create(BaseController.prototype);
AddressController.prototype.constructor = AddressController;

AddressController.prototype.addressListTemplate = null;
AddressController.prototype.getAddressList = function() {
    var thisObj = this;
    var request_done = function( response ) {
        thisObj.addressList = response.data;
        var addressListHtml = thisObj.addressListTemplate ? thisObj.addressListTemplate({addresses:thisObj.addressList}) : "";
        $("#user-address-list").html(addressListHtml);
        $("body").trigger("address_list_loaded");
        $('.add').removeClass('hide-it');
        if(response.falg !== "" && response.falg == "N") {
        	$('.add').addClass('hide-it');
			$('.edit_address').addClass('hide-it');
			$('.delete_address').addClass('hide-it');
        }
    };
    var config = {
    	url: thisObj.getAddressListUrl
    },
    app_config = {
    	scope:	thisObj,
    	done :	request_done
    };
    var request = _.ajax(config, app_config);
    
    request.fail(function( jqXHR, textStatus ) {
        thisObj.addressList = null;
    });
};

AddressController.prototype.resetAddressForm = function(){
    $("#address-form").get(0).reset();
};

AddressController.prototype.addAddress = function(){
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: true, isOverlay: true}); 

	var $form = $('#address-form');
    var json = serializeObject($form);
    console.log(json);
    var state = json['prov'];
    var province = _.find(addressController.provinceList, function(province){ 
		return state.toLowerCase() == province.nome.toLowerCase(); });
	if(province) {
		var sigla = province['sigla'];
		json['prov'] = sigla;
	}
	json = JSON.stringify(json);
	console.log(json);
    var request_done = function( response ) {
		thisObj.getAddressList();
        //$('#modal-address').modal('hide');
        thisObj.resetAddressForm();
    };
    var config = {
    	url:	thisObj.addAddressUrl,
    	data:	json,
    	type:	"POST",
   		contentType:	UPWEB.JSON
    },
    app_config = {
    	name :  UP_Qualifiers.addAddress,
    	scope:	thisObj, 
    	done :	request_done, 
    	form :	$form, 
    	alert:	alertObj
    };
    _.ajax(config, app_config);
};

AddressController.prototype.editAddress = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: true, isOverlay: true});

	var $form = $('#address-form');
    var json = serializeObject($form);
    console.log(json);
    var state = json['prov'];
    var province = _.find(addressController.provinceList, function(province){ 
		return state.toLowerCase() == province.nome.toLowerCase(); });
	if(province) {
		var sigla = province['sigla'];
		json['prov'] = sigla;
	}
	json = JSON.stringify(json);
	console.log(json);

    var request_done = function( response ) {
		thisObj.getAddressList();
        thisObj.resetAddressForm();
    };
    
    var config = {
      url: thisObj.editAddressUrl,
      contentType: UPWEB.JSON,
      data: json,
      type: "POST"
    },
    app_config = {
    	name :  UP_Qualifiers.editAddress,
    	scope:	thisObj, 
    	done :	request_done, 
    	form :	$form, 
    	alert:	alertObj
    };
    _.ajax(config, app_config);
};

AddressController.prototype.removeAddress = function($element) {
    var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isNotifiableOnSuccess: true});
    var deleteButtonId = $element.attr("id");
    var id = "shown-" + deleteButtonId;
    var addressID = deleteButtonId.split("popover-")[1];
    if(!addressID) {
        console.log( "Address Id is not found.");
        return false;
    }
    var request_done = function( response ) {
    	thisObj.getAddressList();
        $("#" + id).popover('hide');
    };
    var config = {
        url: thisObj.removeAddressUrl + "?addressid=" + addressID,
        type: "POST"
    },
    app_config = {
    	scope:	thisObj, 
    	done:	request_done, 
    	alert:	alertObj
    };
    _.ajax(config, app_config);
};

AddressController.prototype.getProvinces = function() {
	 var thisObj = this;
	 if(thisObj.provinceList == null) {
	 var request_done = function( response ) {
	    	thisObj.provinceList = response.data;
	    	var options = [];
	    	_.each(thisObj.provinceList, function(province, index){
	    		options.push(province.nome);
	    	});
	    	$('input#address-province').typeahead({
	    		name: 'accounts',
	    		local: options,
	    		limit: options.length
	    	});
	    	$('input#address-province').parent().css("display", "");
	 };
	 var config = {
			 url: thisObj.getProvinceUrl + "Italia",
			 type: "GET"
	 },
	 app_config = {
			 scope:	thisObj,
			 done:	request_done,
	 };
	 _.ajax(config, app_config);
	 }
};

AddressController.prototype.getComuneList = function(sigla, city) {
	$('input#address-city').typeahead('destroy');
	var thisObj = this;
	 var request_done = function( response ) {
	    	thisObj.comuneMap = response.data;
	    	var cities = [];
	    	_.each(thisObj.comuneMap, function(value, key){
	    		cities.push(key);
	    	});
	    	$('input#address-city').typeahead({
	    		name: sigla,
	    		local: cities,
	    		limit: cities.length
	    	});
	    	$('input#address-city').parent().css("display", "");
	    	$('input#address-city').typeahead('setQuery', city || '');
	    	if(!thisObj.method) {
	    		$('input#user-code').val("");
	    	} 
	    	thisObj.method = null;
	    	$('input#address-city').focus();
	 };
	 var config = {
			 url: thisObj.getComuneUrl + sigla,
			 type: "GET"
	 },
	 app_config = {
			 scope:	thisObj,
			 done:	request_done,
	 };
	 _.ajax(config, app_config);
};

AddressController.prototype.populateCap = function(comune) {
	var cap = this.comuneMap[comune];
	var $zipElm = $("input:text[name=zip]");
	if(isNotEmpty(cap)){
		$zipElm.val(cap);
		$zipElm.trigger("remove_error_event");
	} else {
		$zipElm.val('');
	}
};

var addressController = new AddressController();

$(function(){
    addressController.addressListTemplate = _.template($("#addressListTemplate").html());

    $(document.body).on('click', '.add_address_form input[type=submit]', function(e) {
        addressController.addAddress();
        e.preventDefault();
        return false;
    });

    $(document.body).on('click', '.edit_address_form input[type=submit]', function(e) {
        addressController.editAddress();
        e.preventDefault();
        return false;
    });

    $(document.body).on('remove_address_click', function(e, $element) {
        addressController.removeAddress($element);
        e.preventDefault();
        return false;
    });
    $(document.body).on('click', '.add-new-address', function(e) {
    	$('#address-form').removeClass('edit_address_form').addClass('add_address_form'); 
    	addressController.resetAddressForm();
    	$("#modal-address .row.head div").html('Inserisci nuovo indirizzo');
    	$("#modal-address #address-addressId").val('');
    	$("#modal-address input[type=submit]").val('AGGIUNGI INDIRIZZO');
    });
    $(document.body).on('click', '.edit_address', function(e) {
    	addressController.fetchCities = true;
    	$('input#address-city').typeahead('destroy');
    	$('#address-form').removeClass('add_address_form').addClass('edit_address_form'); 
        var addressId = $(this).attr("data-addressId");
        var address = _.find(addressController.addressList, function(address){return address["addressId"] == addressId; });
        addressController.city = address.city;
        $("#modal-address #address-addressId").val(addressId);
        $("#modal-address #address-name").val(address.alias);
        $("#modal-address #campanello-name").val(address.afn);
        $("#modal-address #campanello-surname").val(address.aln);
        $("#modal-address #address-via").val(address.street);
        $("#modal-address #address-number").val(address.civic);
        var state = _.find(addressController.provinceList, function(province) {
        	return province.sigla.toLowerCase() == address.prov.toLowerCase();
        });
        addressController.state = state.nome;
        $("#modal-address #address-province").typeahead('setQuery', state.nome);
        $("#modal-address #user-code").val(address.zip);
        if(address.prov){
        	$("#modal-address #address-city").val(address.city);
        }
        $("#modal-address #user-phonenumber").val(address.acn);
        $("#modal-address input[type=submit]").val('MODIFICA INDIRIZZO');
    	$("#modal-address .row.head div").html('Modifica indirizzo');
    	addressController.method = "editAddress";
    });
    $(document.body).on('focusout', '#address-province', function(e) {
    	var state = $( "#address-province" ).val();
    	var province = _.find(addressController.provinceList, function(province){ 
    		return state.toLowerCase() == province.nome.toLowerCase(); });
    	if(province) {
    	if(state !== "" && addressController.state !== state) {
    	
    		var sigla = province['sigla'];
        	addressController.getComuneList(sigla);
    	
    	}
    	}else {
    		$('input#address-city').typeahead('setQuery', '');
    		$('input#address-city').typeahead('destroy');
    		addressController.city = "";
    		$("input:text[name=zip]").val('');
    	}
    	addressController.state = $( "#address-province" ).val();
    });
    $(document.body).on('focusout focus focusin', '#address-city', function(e) {
    	var comune = $( "#address-city" ).val();
    	if(comune !== "" && addressController.city !== comune)
    	addressController.populateCap(comune);
    	else if(addressController.fetchCities) {
    		var state = $( "#address-province" ).val();
    		var city = $("#address-city").val();
    		var province = _.find(addressController.provinceList, function(province){ 
        		return state.toLowerCase() == province.nome.toLowerCase(); });
        	if(province) {
        		var sigla = province['sigla'];
            	addressController.getComuneList(sigla, city);
        	}
        	addressController.fetchCities = false;
    	} else if(comune == "") {
    		$("input:text[name=zip]").val('');
    	}
    	addressController.city = $( "#address-city" ).val();
    });
    $(document.body).on("click", "#modal-address .close", function(e) {
    	$("#modal-address #address-province").typeahead('setQuery', "");
    	$('input#address-city').typeahead('destroy');
    	addressController.city = "";
    	addressController.state = "";
    });
    $(document.body).on("click", ".add-new-address", function(e) {
    	$("#modal-address #address-province").typeahead('setQuery', "");
    	$('input#address-city').typeahead('destroy');
    	addressController.city = "";
    	addressController.state = "";
    });
});