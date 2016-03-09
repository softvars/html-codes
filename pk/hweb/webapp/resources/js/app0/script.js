var doKeyUp = false;
var flipcard = false;
// fix for bootstrap wrong beaviour during modal show
var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
$.fn.modal.Constructor.prototype.setScrollbar = function () {
    oldSSB.apply(this);
    if (this.scrollbarWidth) {
    	$('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
    }
};
var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
$.fn.modal.Constructor.prototype.resetScrollbar = function () {
    oldRSB.apply(this);
    $('.navbar-fixed-top').css('padding-right', '');
};

var isFunctionKeysDown = function(e) {
	return (e.altKey || e.ctrlKey || e.shiftKey) ;
};
var getEventKeyCode = function(e){
	return e.keyCode || e.which;
};

var isValidCardNumKey = function(e){
	var key = getEventKeyCode(e);
	return !(isFunctionKeysDown(e)) && (key === 52 || key === 53 || key === 100 || key === 101) ;
};

var isAllowedInputNavKey = function(e){
	var key = getEventKeyCode(e);
	return key == 8 || key == 9 || key == 35 || key == 36 || key == 37 || key == 39 || key == 46;
};

var isDigitKey = function(e){
	var key = getEventKeyCode(e);
	return !(isFunctionKeysDown(e)) && ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) ;
};

var isAlphaKey = function(e){
	var key = getEventKeyCode(e);
	return (key >= 65 && key <= 90) ;
};

var isAlphaNumericKey = function(e){
	return isDigitKey(e) || isAlphaKey(e);
};

function doGetCaretPosition(oField) {
  var iCaretPos = 0;
  if (document.selection) { // IE Support 
    oField.focus ();
    var oSel = document.selection.createRange ();
    oSel.moveStart ('character', -oField.value.length);
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart || oField.selectionStart == '0') { // Firefox support
    iCaretPos = oField.selectionStart;
  }
  return (iCaretPos);
}

function populatePlaceHolders($form) {
	 $form.get(0).reset();
	 var browser = up_common.browserInfo; 
	 var isIEBrowser9 = (browser.name === 'ie' || browser.name === 'msie') &&  (browser.version <= 9);
	 if(isIEBrowser9) {
		 $form.find('input, textarea').each(function() {
			 this.focus();
		 });
		 setTimeout(function () {window.focus();window.scrollTo(0, 0);}, 200);
	 }
	 setTimeout(function () {$form.find('input[type=password]').val('');$form.find('input[name=fake_password]').val('');}, 200);
}

$(document).ready(function() {
	// placeholder for old browser
	if($.fn.placeholder) {
	    var browser = up_common.browserInfo; 
	    var isIEBrowser9 = (browser.name === 'ie' || browser.name === 'msie') &&  (browser.version <= 9);
	    var $all_input = isIEBrowser9 ? $("input[type!='password'], textarea") : $('input, textarea');
		$all_input.placeholder();
	}
	
	// show/hide drawer menu
	$(document.body).on('click', '.toggle-drawer', function() {
		$(document.body).toggleClass('show');
	});
	// show/hide notify popup
	$(document.body).on('click', '.notify .close', function() {
		$('.notify').hide();
	});

    // show/hide transaction detail popup
	$(document.body).on('click', '.row.odd, .row.even', function(e){
        $("body").trigger("update_transaction_details_overlay", [this]);
		$('#modal-detail-transaction').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-detail-transaction').modal('show');
		$(window).scrollTop(0);
		window.location.hash = "#detail_transaction";
	});
	// check/uncheck card on filter panel
	var addOrRemoveChecked = true;
	$(document.body).on('click', '#check-all', function() {
		$('.check-box').toggleClass('checked', $(this).prop("checked"));
		addOrRemoveChecked = (addOrRemoveChecked) ? false : true;
	});
	$(document.body).on('click', '.card-small', function(e){
		$(this).find('.check-box').toggleClass('checked');
	});
	// show/hide filter page (visible only for smartphone)
	$(document.body).on('click', '.toggle-filter', function() {
		$(document.body).toggleClass('showfilter');
	});
	// datepicker
    var $datepicker = $('.datepicker');
    if($datepicker.length && $datepicker.pickadate){
        $datepicker.pickadate({
            format: 'dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy',
            today: '',
            clear: '',
            close: '',
            klass: {
                input: ''
            }
        });
    }
    
	$(document.body).on('click', '.calendar-icon', function(e) {
		var classname = $(this).attr("picker-bind");
		if(classname) {
			$("." + classname).trigger('click');
		}
		e.stopPropagation();
		e.preventDefault();
	});

    $(document.body).on('address_list_loaded', function(e) {
	$('.delete_address').each(function() {
		$(this).popover({
			placement: "bottom",
			title: "CANCELLA INDIRIZZO",
			content: "Sei sicuro di voler eliminare questo indirizzo?",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-actions"><div class="negative">NO</div><div class="positive">SI</div></div></div>'
		}).off("show.bs.popover").on("show.bs.popover", function() {
			$(this).data("bs.popover").tip().css("width", "250px");
		});
		$(document.body).off('click', '.delete_address');
        $(document.body).on('click', '.delete_address', function(e) {
        	var $this = $(this);
            var id = "shown-" + $this.attr("id");
            $(".popover", $(this.parentNode)).attr("id", id);
            var popovers = $(".popover");
            for (var i = 0; i < popovers.length; i++) {
                if (popovers[i].id != id) $(popovers[i]).popover("hide");
            };
            $('.negative', $("#" + id)).on('click', function() {
                $("#" + id).popover('hide');
            });
            $('.positive', $("#" + id)).on('click', function() {
                console.log("SI");
                $("body").trigger("remove_address_click", [$this]);
            });
            up_common.removeAlerts();
        });
	});
    });

	$(".cvc-popover").each(function() {
		$(this).popover({
			placement: "bottom",
			container: 'body',
			title: "CODICE DI SICUREZZA",
			content: "Il codice di sicurezza è rappresentato dalle ultime tre cifre del numero visibile sul restro della carta nella barra della firma.",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-image"></div><div class="popover-content"></div></div>'
		});/*.on("show.bs.popover", function() {
			$(this).data("bs.popover").tip().css("width", "250px");
		}).click(function() {
			var id = "shown-" + $(this).attr("id");
			$(".popover", $(this.parentNode)).attr("id", id);
			var popovers = $(".popover");
			for (var i = 0; i < popovers.length; i++) {
				if (popovers[i].id != id) $(popovers[i]).popover("hide");
			};
		})*/
	});

	$(document.body).off('click', '.edit_address');
    $(document.body).on('click', '.edit_address', function(e) {
		window.location.hash = $(this).data('hash');
		return false;
	});

	$(document.body).on('click', '#edit-password', function(e) {
		$('#modal-edit-password').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-edit-password').modal('show');
		$(".item",$('#modal-edit-profile')).each(function(){$(this).removeClass("active");});
		$(window).scrollTop(0);
		e.preventDefault();
		return false;
	});
	$(document.body).on('wallet_cards_loaded payment_cards_loaded', function(e) {
		$('.card-plate.hover').parent().on("mouseenter mouseleave",function(e){
			var hiddenElement = $(".hidden-element",$(this));
			if(hiddenElement.length > 0 ){
				if($(hiddenElement).css("display") == "none") $(hiddenElement).show();
				else $(hiddenElement).hide();
			}
		});
	});
	$(document.body).on('wallet_cards_loaded', function(e) {
		$(".cvc-popover").each(function() {
			$(this).popover({
				placement: "bottom",
				container: 'body',
				title: "CODICE DI SICUREZZA",
				content: "Il codice di sicurezza è rappresentato dalle ultime tre cifre del numero visibile sul restro della carta nella barra della firma.",
				template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-image"></div><div class="popover-content"></div></div>'
			});/*.on("show.bs.popover", function() {
				$(this).data("bs.popover").tip().css("width", "250px");
			}).click(function() {
				var id = "shown-" + $(this).attr("id");
				$(".popover", $(this.parentNode)).attr("id", id);
				var popovers = $(".popover");
				for (var i = 0; i < popovers.length; i++) {
					if (popovers[i].id != id) $(popovers[i]).popover("hide");
				};
			})*/
		});
	});

	flipcard = function(event, element) {
		if (event.type=="focusin") {
			$("#"+$(element).attr("data-target-id")).addClass("backface");
		} else {
			$("#"+$(element).attr("data-target-id")).removeClass("backface");
		}
	};

	$(document.body).on("focus blur", ".cvc-code", function(e) {
		flipcard(e, this);
	});

	/*var isCircuitNameDetected = function(){
		var $elms = $("#card-type, .input-group-btn.cards");
		return $elms.hasClass('visa') || $elms.hasClass('mastercard') || $elms.hasClass('visa-selected') || $elms.hasClass('mastercard-selected'); 
	};*/
	
	var circuitTypeMap = {4:"visa", 5:"mastercard"};
	var doKeyUp = false, panKeyDown = false, panCutOrPasted = false, panCutted = false, panPasted = false;
	$('#card-code').on("keyup", function(e) {
		if (doKeyUp) {
			var value = $(this).val();
			var num = parseInt(value.substring(0, 1));
			if (value.length > 0 && (num === 4 || num === 5)) {
				var classname = circuitTypeMap[num] ||  "";
				$("#card-type").addClass(classname);
				$("#circuitName").val(classname);
				$(".input-group-btn.cards").prop("class", "input-group-btn cards").addClass(classname + "-selected");
			} else {
				$("#card-type").prop("class", "");
				$("#circuitName").val("");
				$(".input-group-btn.cards").prop("class", "input-group-btn cards");
			}
			if (value.length == 0) {
				$('#card-code-1').html("****");
				$('#card-code-2').html("****");
				$('#card-code-3').html("****");
				$('#card-code-4').html("****");
			} else {
				$('#card-code-1').html(value.substring(0, 4));
				$('#card-code-2').html(value.substring(4, 8));
				$('#card-code-3').html(value.substring(8, 12));
				$('#card-code-4').html(value.substring(12, 16));
			}
		}
		panKeyDown = false;
	}).on('keydown', function(e) {
		var limit = 16;
		panKeyDown = doKeyUp = true;
		var $this = $(this);
		var value = $this.val();
		
		if( (value.length === 0 || doGetCaretPosition(this) === 0) && isDigitKey(e) && !isValidCardNumKey(e)) {
		    up_common.renderValidationError($this.parent(), this.name, "Insericsci una carta VISA o MasterCard", $this.parents('form'));
		    e.stopPropagation();
		}
		if ((value.length === 1 && !(parseInt(value[0]) === 4 || parseInt(value[0]) === 5 || isAllowedInputNavKey(e))) || 
			(!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) &&
			!(value.length === limit && isAllowedInputNavKey(e)) )) {
			doKeyUp = (value.length === limit && isDigitKey(e));
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}).on("paste cut", function(e) {
		panCutOrPasted = true;
		panCutted = e.type === 'cut';	
		panPasted = e.type === 'paste';
	}).on("input", function(e) {
		console.log("event:" + e.type);
		if(!panKeyDown && isExist(up_validator_util)) {
			var $this = $(this);
			var value = $this.val();
			var $form = $this.closest('form');
			var isNotValidNum  = up_validator_util.notNumber(value);
			var isNotValidPan  = up_validator_util.notCardNumber(value);
			if(isNotValidNum || isNotValidPan) {
				 var formAlerts = {};
				 formAlerts[this.name] = (isNotValidNum ? "Inserisci solo numeri" : "Inserisci un numero di carta valido: massimo 16 cifre" ); //up_validator_cnf.cnf["pan"].
				 up_common.renderValidationErrors(null, formAlerts, $form);
				 if(isNotValidNum) {
					 $(this).val("");
				 } else {
					 $(this).val(value.substring(0, 16));
				 }
			} else {
				up_common.removeFormErrors($form);
			}
			panCutOrPasted = false;
			doKeyUp = true;
			$this.trigger('keyup');
		} else {
			panKeyDown = false;
		} 
	});
	
	$(document.body).on("keyup", '.cvc-code', function(e) {
		if (doKeyUp) {
			var value = $(this).val();
			$(".cvc",$("#"+$(this).attr("data-target-id"))).html(value);
		}
    });
    $(document.body).on("keydown", '.cvc-code', function(e) {
		var limit = 4;
		doKeyUp = true;
		var value = $(this).val();
		if (!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) &&
			!(value.length == limit && isAllowedInputNavKey(e))) {
			doKeyUp = false;
			e.preventDefault();
			return false;
		}
	});

	$(document.body).on("keyup", '.expiry-date', function(e) {
		var $this = $(this);
		var value = $this.val();
		var key = e.which || e.keyCode;
		var $form = $this.closest('form');
		var $expiry_date_month = $form.find('.expiry-date-month');
		var $expiry_date_year = $form.find('.expiry-date-year');
		var dArr = value.split('/');
		var notSlashed = dArr.length < 2;
		if (value.length == 0) {
			$expiry_date_month.html("--"), $expiry_date_year.html("--");
		} else if (value.length <= 5) {
			$expiry_date_month.html(dArr[0]);
			$expiry_date_year.html((notSlashed ? '--': dArr[1]));
			if (notSlashed && !(key == 8 || key == 46)) {
				if(value.length == 2) {
					$this.val(value + "/");
				} else if(value.length > 2){
					$this.val(value.substr(0, 2) + "/" + value.substr(2, 2));
				} 
				e.preventDefault();
				return false;
			}
		} else if (value.length > 5) {
			e.preventDefault();
			return false;
		}
    });
    $(document.body).on("keydown", '.expiry-date', function(e) {
		var limit = 5;
		doKeyUp = true;
		var value = $(this).val();
		if ((value.length === 4 && !(value.indexOf('/') > -1 || isAllowedInputNavKey(e))) ||
		 (!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) && 
				!(value.length == limit && isAllowedInputNavKey(e)))) {
			doKeyUp = false;
			e.preventDefault();
			return false;
		}
	});

    $(document.body).on("keydown", '.edit_codice_fiscale', function(e) {
		var limit = 16;
		doKeyUp = true;
		var value = $(this).val();
		if (!(value.length < limit && (isAlphaNumericKey(e) || isAllowedInputNavKey(e))) &&
			!(value.length == limit && isAllowedInputNavKey(e))) {
			doKeyUp = false;
			e.preventDefault();
			return false;
		}
	});
    
	/*$(document.body).on('click', '.open-card-info', function(e) {
		$('#modal-card-info').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-card-info').modal('show');
		$(window).scrollTop(0);
		e.preventDefault();
		return false;
	});*/
	
	$(document.body).on('click', '.open-edit-cards', function(e) {
		var $this = $(this);
		$modal = $('#modal-edit-cards');
		$(".item", $modal).each(function(){$(this).removeClass("active");});
		var $formDiv = $("#"+$this.attr("data-card-id"));
		$formDiv.addClass("active");
	});
	
    var selectpickerconfig = {};
    selectpickerconfig.mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
    var $selectpicker = $('.selectpicker');
    if($selectpicker['selectpicker']) {
    	$selectpicker.selectpicker(selectpickerconfig);
    }
    
	$(document.body).on('edit_profile', function(e) {
		$('#modal-edit-profile').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-edit-profile').modal('show');
		$(".item",$('#modal-edit-profile')).each(function(){$(this).removeClass("active");});
		$(window).scrollTop(0);
		e.preventDefault();
		return false;
	});

	$('.close-alert').click(function(){
		$(this.getAttribute("alert-id")).css({display:"none"});
	});

	$(document.body).on('click', ".confirm", function(evt){
		evt.preventDefault();
		var $this = $(this);
		var head = $this.attr("confirm-head");
		var body = $this.attr("confirm-body");
		var type = $this.attr("confirm-type");
		var okhref = $this.attr("href");
		var meta = $this.data('meta');
		var confirm = $("<div>").
					addClass("confirm-modal " + type).
					attr("id", "confirm-modal").
					append(
						$("<div>").
						addClass("popover").
						append(
							$("<div>").
								addClass("popover-title").
								append($("<span>").text(head)),
							$("<div>").
								addClass("popover-content").
								append($("<span>").text(body)),
							$("<div>").addClass("popover-actions").
								append(
									$("<div>").addClass("negative").click(function(){
										$("#confirm-modal").remove();
									}).text("NO"),
									$("<div>").addClass("positive").data("meta", meta).append(
										$("<a>").attr("href",okhref).text("SI")
									)
								)
						)
					);

		$("body").append(confirm);
	});

	$("#close-registered-alert").click(function(a){
		$("#registered-user-alert").remove();
	});
});
