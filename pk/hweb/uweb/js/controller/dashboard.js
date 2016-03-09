var DashboardController = function ( )
{
    TransactionController.call(this);
    this.transactions_request_data = "limit=10&sortBy=date";
};

DashboardController.prototype = Object.create(TransactionController.prototype);
DashboardController.prototype.constructor = DashboardController;

var dashboardObj = new DashboardController();

$(function() {
    dashboardObj.getTransactions();
    $("#drawer-menu li, #nav-bar-menu li").has('a.dashboard').attr("class", UPWEB_CONST_ACTIVE);
    var favCreditCard = $('.favorite-credit-card .lastdigit').html();
    $('.favorite-credit-card .lastdigit').html(dashboardObj.extractPan(favCreditCard));
});