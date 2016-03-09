var LoginPaymentController = function()
{
	LoginController.call(this);
	this.paymentTrxId = null;
	this.cancelSelectCardUrl =  "/upweb/payment/cancelcard?paymentTrxId=";
};

LoginPaymentController.prototype = Object.create(LoginController.prototype);
LoginPaymentController.prototype.constructor = LoginPaymentController;

var loginPaymentController = new LoginPaymentController();

$(function() {
	loginPaymentController.paymentTrxId = loginPayment_paymentTrxId ? loginPayment_paymentTrxId: null;  
});

$(window).load(function() {
	$("#privacy-policy").find("a").attr("href", "/upweb/termsandprivacy").attr("id", "policy").attr("target", "_blank");
});