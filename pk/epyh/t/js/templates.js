define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["assets/js/apps/activities/goals/profile/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n            <p>Modifica Obiettivo</p>\r\n            ";
  }

function program3(depth0,data) {
  
  
  return "\r\n            <p>Aggiungi obiettivo</p>\r\n            ";
  }

  buffer += "<div id=\"main-region\">\r\n    <header id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-arrow back\"></a>\r\n\r\n        <div class=\"amount sufficient-sts\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <span>Puoi spendere &euro; <i class=\"sts-left\">";
  if (helper = helpers.sts) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sts); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i></span>\r\n        </div>\r\n\r\n        <div class=\"amount insufficient-sts\">\r\n            <p>\"Puoi spendere\" superato</p>\r\n            <span>Devi recuperare &euro; <i class=\"sts-left\">";
  if (helper = helpers.sts) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sts); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i></span>\r\n        </div>\r\n\r\n    </header>\r\n\r\n    <div class=\"ob-edit-create panel-content scrollable\">\r\n        <div class=\"edit-block\">\r\n\r\n            <form>\r\n                <div class=\"amount-wrapper\">\r\n                    <div class=\"amount-block js-validate-element-total\">\r\n                        <h4>Importo Totale</h4>\r\n                        <input type=\"hidden\" name=\"total\" value=\"";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                        <div class=\"amount-container\">\r\n                            <span class=\"euro\">&euro;</span>\r\n                            <div id=\"entity-total\" class=\"amount\">";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div id=\"keyboard-region\" class=\"keyboard-container border\">\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"input-field js-validate-element-title\">\r\n                    <h4>Cosa vuoi acquistare?</h4>\r\n                    <div class=\"input-container\">\r\n                        <input id=\"js-title\" name=\"title\" class=\"ob-title\" placeholder=\"es. Mountain Bike\" value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                    </div>\r\n                </div>\r\n\r\n                <!--div id=\"dropdown-region\" class=\"dropdown-categories\"></div-->\r\n\r\n                <div class=\"input-field\">\r\n                    <h4>Entro</h4>\r\n                    <div class=\"input-container\">\r\n                        <input type=\"date\" class=\"js-validate-element-endDate\" placeholder=\"GG/MM/AAAA\" name=\"endDate\" />\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"ob-status\">\r\n                    <div class=\"da-parte\">\r\n                        Hai già messo da parte: <div class=\"relative\"><input id=\"entity-currentAmount\" type=\"number\" onfocus=\"this.type='number'\" onblur=\"this.type='text'\" placeholder=\"Importo iniziale\" class=\"current js-validate-element-current\" name=\"currentAmount\" data-target=\"currentAmount\" /><span class=\"current\">€</span></div>\r\n                    </div>\r\n                    <div class=\"current-slider\">\r\n                        <input class=\"bar\" type=\"range\" id=\"currentAmount-slider\" step=\"1\" max=\"100\" />\r\n                    </div>\r\n                    <div class=\"info\">Scorri per modificare la percentuale di completamento dell’obiettivo.</div>\r\n                </div>\r\n\r\n                <div class=\"bottom-line\">\r\n                    <span class=\"icon-info\"></span>\r\n                    <span class=\"content\">Risparmierai <span id=\"daily-amount\" class=\"money highlight\"></span><span class=\"money highlight\">€</span> al giorno</span>\r\n                </div>\r\n            </form>\r\n\r\n            <div class=\"padding align-center\">\r\n                <a href=\"#\" class=\"js-submit start-action glb-btn success\">\r\n                    Salva\r\n                    <i class=\"icon-accept \"></i>\r\n                </a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/actions_panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.completed), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\r\n<div class=\"menu-item\">\r\n    <i class=\"icon-save\"></i>\r\n    <a class=\"js-action\" data-action=\"archive\">Archivia Obiettivo</a>\r\n</div>\r\n\r\n    ";
  }

function program4(depth0,data) {
  
  
  return "\r\n        \r\n<div class=\"menu-item\">\r\n    <i class=\"icon-edit\"></i>\r\n    <a class=\"js-action\" data-action=\"edit\">Modifica Obiettivo</a>\r\n</div>\r\n\r\n<div class=\"menu-item\">\r\n    <i class=\"icon-save\"></i>\r\n    <a class=\"js-action\" data-action=\"archive\">Archivia Obiettivo</a>\r\n</div>\r\n\r\n      \r\n    ";
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.archived), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"menu-item\">\r\n    <i class=\"icon-trash\"></i>\r\n    <a class=\"js-action\" data-action=\"delete\">Elimina Obiettivo</a>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/archived_show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"goal-blocker hidden\"></div>\r\n<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n    <p>Obiettivo archiviato</p>\r\n    <a class=\"right-ctrl js-more\"><i class=\"icon-more\"></i></a>\r\n</header>\r\n\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"obiettivo-block archived\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <div class=\"ob-title\">\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n                <br />\r\n                ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n            <div class=\"status-block\">\r\n                <div class=\"status-line\">\r\n                    Dal <span class=\"date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.endDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.endDate), options)))
    + "</span> hai speso\r\n                </div>\r\n                <div class=\"info-line\">\r\n                    <div class=\"price\">\r\n                        <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.remaining), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.remaining), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"total\">\r\n                        di <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.total), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.total), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n        <div class=\"action-block padding border-top border-bottom\">\r\n            <div class=\"block info\">\r\n                <div class=\"\">\r\n                    <h5>Obiettivo archiviato</h5>\r\n                    <span class=\"subtitle\">\r\n                        L'obiettivo è stato salvato<br />\r\n                        in archivio e quindi non è più modificabile.\r\n                    </span>\r\n\r\n                    <div class=\"display-associated-movements\">\r\n                        <span class=\"subtitle\">\r\n                            Ecco le spese associate:\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n\r\n        <div class=\"lista-movimenti\">\r\n\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div> \r\n    </div>\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n</div>\r\n\r\n<div id=\"image-show-region\">\r\n    <!-- pulsante per avviare selezione foto -->\r\n</div>\r\n\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/completed_show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\r\n                <a class=\"fb-share js-share shared\"><i class=\"icon-fbshare\"></i>&nbsp;</a>\r\n            ";
  }

function program3(depth0,data) {
  
  
  return "\r\n                <a class=\"fb-share js-share\"><i class=\"icon-fbshare\"></i>&nbsp;</a>\r\n            ";
  }

function program5(depth0,data) {
  
  
  return "\r\n        <div class=\"action-block padding border-bottom\">\r\n            <div class=\"block info\">\r\n                <div class=\"js-transfer-to-sts\">\r\n                    <h5>Trasferisci residuo</h5>\r\n                    <span class=\"subtitle\">\r\n                        Sposta il rimanente<br />nel Puoi Spendere\r\n                    </span>\r\n                </div>\r\n                <span class=\"js-transfer-to-sts icon-refresh icon\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n        ";
  }

  buffer += "<div class=\"goal-blocker hidden\"></div>\r\n<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n    <p>Obiettivo completato</p>\r\n    <a class=\"right-ctrl js-more\"><i class=\"icon-more\"></i></a>\r\n</header>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"obiettivo-block completed\">\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <div class=\"ob-title\">\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n                <br /> ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n        </div>\r\n        <div class=\"center-info-block\">\r\n            <div class=\"status-block\">\r\n                <div class=\"status-line\">\r\n                    Hai ancora da spendere\r\n                </div>\r\n                <div class=\"info-line\">\r\n                    <div class=\"price\">\r\n                        <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.remaining), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.remaining), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"total\">\r\n                        di <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.total), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.total), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"progress-bar status-"
    + escapeExpression((helper = helpers.percentageString || (depth0 && depth0.percentageString),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.remainingPercentage), options) : helperMissing.call(depth0, "percentageString", (depth0 && depth0.remainingPercentage), options)))
    + " inverted\">\r\n                    <div class=\"back\"></div>\r\n                    <div class=\"color\"></div>\r\n                </div>\r\n            </div>\r\n        </div>        \r\n        <div class=\"share-container\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.shared), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>        \r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"action-block padding border-top border-bottom padding\">\r\n            <div class=\"block table\">\r\n                <div>\r\n                    <h5>Obiettivo Completato</h5>\r\n                    <div class=\"display-associated-movements js-movements\">\r\n                        <span class=\"subtitle\">\r\n                            Vedi le spese associate\r\n                        </span>\r\n                        <div id=\"movements-region\"></div>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"display-associated-movements js-movements\">\r\n                    <i class=\"icon-go-dx\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n        ";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, ">", (depth0 && depth0.currentAmount), 0, options) : helperMissing.call(depth0, "compare", ">", (depth0 && depth0.currentAmount), 0, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"deals-title hidden js-deals\">\r\n            Potrebbero interessarti anche:\r\n        </div>\r\n        <div class=\"js-deals hidden\" id=\"deals-region\">\r\n        </div>\r\n    </div>\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n</div>\r\n<div id=\"image-show-region\">\r\n    <!-- pulsante per avviare selezione foto -->\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/expired_show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.suspended), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   \r\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\r\n                    <div class=\"check\">\r\n                        <input id=\"check\" type=\"checkbox\" class=\"js-complete\">\r\n                        <label for=\"check\"></label>\r\n                        <span>Ho raggiunto il mio obiettivo</span>\r\n                    </div>\r\n                    ";
  }

  buffer += "<div class=\"goal-blocker hidden\"></div>\r\n<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n\r\n    <p>Obiettivo scaduto</p>\r\n\r\n    <a class=\"right-ctrl js-more\"><i class=\"icon-more\"></i></a>\r\n</header>\r\n\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"obiettivo-block expired\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <div class=\"ob-title\">\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div> \r\n                <br />\r\n                ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n            <div class=\"status-block\">\r\n                <div class=\"status-line\">\r\n                    Dal "
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.startDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.startDate), options)))
    + " hai messo da parte\r\n                </div>\r\n\r\n                <div class=\"info-line\">\r\n                    <div class=\"price\">\r\n                        <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.currentAmount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.currentAmount), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"total\">\r\n                        su <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.total), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.total), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"status-line no-margin\">\r\n\r\n                </div>\r\n                <div class=\"progress-bar status-"
    + escapeExpression((helper = helpers.percentageString || (depth0 && depth0.percentageString),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.percentage), options) : helperMissing.call(depth0, "percentageString", (depth0 && depth0.percentage), options)))
    + "\">\r\n                    <div class=\"color\"></div>\r\n                    <div class=\"back\"></div>\r\n                </div>\r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.paused), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   \r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n        <div class=\"action-block border-top padding border-bottom\">\r\n            <div class=\"block\">\r\n                <div class=\"\">\r\n                    <h5>Obiettivo scaduto</h5>\r\n                    <span class=\"subtitle\">\r\n                        Puoi estendere la data di completamento obiettivo.\r\n                    </span>\r\n                    <span class=\"text\">\r\n                        Scadenza:\r\n                        <span class=\"cash\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.endDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.endDate), options)))
    + "</span>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div> \r\n        <div class=\"deals-title hidden js-deals\">\r\n            Potrebbero interessarti anche:\r\n        </div>\r\n        <div class=\"js-deals hidden\" id=\"deals-region\">\r\n        </div>\r\n    </div>\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n</div>\r\n\r\n<div id=\"image-show-region\">\r\n    <!-- pulsante per avviare selezione foto -->\r\n</div>\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/more.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/movements_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n    <p>Obiettivo</p>\r\n</header>\r\n<div class=\"panel-content scrollable completed obiettivo-block\">\r\n    <div class=\"movements-container\">\r\n        <div class=\"action-block\">\r\n            <div class=\"block\">\r\n                <div>\r\n                    <h5>Obiettivo Completato</h5>\r\n\r\n                    <div class=\"display-associated-movements js-movements\" style=\"display: block;\">\r\n                        <span class=\"subtitle\">\r\n                            Spese associate:\r\n                        </span>\r\n                        <div id=\"movements-region\"></div>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n        <div class=\"mov-list\">\r\n        </div>\r\n    </div>\r\n</div>";
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/movements_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\r\n<div class=\"loading-movements\">\r\n</div>\r\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n<div class=\"goals-movements-list-item movement ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.subType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"date\">\r\n        "
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "\r\n    </div>\r\n    <div class=\"body\">\r\n        <p class=\"title\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </p>\r\n        <p class=\"price small\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n        </p>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n            ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n            "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n            ";
  return buffer;
  }

  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "\r\n    <p>Obiettivo in pausa</p>\r\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.suspended), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.suspended), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\r\n    <p>Obiettivo in corso</p>\r\n    ";
  }

function program6(depth0,data) {
  
  
  return " paused ";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.suspended), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\r\n                <div class=\"check\">\r\n                    <input id=\"check\" type=\"checkbox\" class=\"js-complete\">\r\n                    <label for=\"check\"></label>\r\n                    <span>Ho raggiunto il mio obiettivo</span>\r\n                </div>\r\n                ";
  }

function program11(depth0,data) {
  
  
  return "\r\n                <a class=\"fb-share js-share shared\"><i class=\"icon-fbshare\"></i>&nbsp;</a>\r\n            ";
  }

function program13(depth0,data) {
  
  
  return "\r\n                <a class=\"fb-share js-share\"><i class=\"icon-fbshare\"></i>&nbsp;</a>\r\n            ";
  }

function program15(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                <div class=\"\">\r\n                    <h5>Obiettivo in pausa</h5>\r\n                    <div class=\"hype-toggle min js-play pause\" data-target=\"web\">\r\n                        <div class=\"switch\">\r\n                            <div class=\"switch-img\"></div>\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"subtitle\">\r\n                        Puoi riattivare il risparmio quando vuoi\r\n                    </span>\r\n                    <span class=\"text\">\r\n                        Risparmierai\r\n                        <span class=\"cash\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.dailyRate), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.dailyRate), options)))
    + "</span>\r\n                        al giorno\r\n                    </span>\r\n                </div>\r\n                ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.suspended), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                <div class=\"\">\r\n                    <h5>Obiettivo attivo</h5>\r\n                    <div class=\"hype-toggle min js-pause play\" data-target=\"web\">\r\n                        <div class=\"switch\">\r\n                            <div class=\"switch-img\"></div>\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"subtitle\">\r\n                        Puoi sospendere il risparmio quando vuoi\r\n                    </span>\r\n                    <span class=\"text\">\r\n                        Stai risparmiando\r\n                        <span class=\"cash\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.dailyRate), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.dailyRate), options)))
    + "</span>\r\n                        al giorno\r\n                    </span>\r\n                </div>\r\n                ";
  return buffer;
  }

  buffer += "<div class=\"goal-blocker hidden\"></div>\r\n<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.paused), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.paused), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <a class=\"right-ctrl js-more\"><i class=\"icon-more\"></i></a>\r\n</header>\r\n\r\n<div class=\"panel-content scrollable \">\r\n    <div id=\"profile-region\" class=\"obiettivo-block ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.paused), options) : helperMissing.call(depth0, "is", (depth0 && depth0.paused), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <div class=\"ob-title\">\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n                <br />\r\n                ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"center-info-block\">\r\n            <div class=\"status-block\">\r\n                <div class=\"status-line\">\r\n                    Dal "
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.startDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.startDate), options)))
    + " hai messo da parte\r\n                </div>\r\n\r\n                <div class=\"info-line\">\r\n                    <div class=\"price\">\r\n                        <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.currentAmount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.currentAmount), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"total\">\r\n                        su <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.total), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.total), options)))
    + "</span>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n\r\n                <div class=\"progress-bar status-"
    + escapeExpression((helper = helpers.percentageString || (depth0 && depth0.percentageString),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.percentage), options) : helperMissing.call(depth0, "percentageString", (depth0 && depth0.percentage), options)))
    + "\">\r\n                    <div class=\"color\"></div>\r\n                    <div class=\"back\"></div>\r\n                </div>\r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.paused), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"share-container\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.shared), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n        \r\n        <div class=\"action-block padding border-top border-bottom\">\r\n            <div class=\"block\">\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.paused), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.paused), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n        <div class=\"js-deals hidden deals-title\">\r\n            Potrebbero interessarti anche:\r\n        </div>\r\n        <div id=\"deals-region\" class=\"js-deals hidden\">\r\n        </div>\r\n    </div>\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n</div>\r\n\r\n<div id=\"image-show-region\">\r\n    <!-- pulsante per avviare selezione foto -->\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/goals/show/templates/wrapper.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"center-region\"></div>\r\n<div id=\"side-region\"></div>";
  });

this["JST"]["assets/js/apps/activities/goals/transfer/templates/transfer.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Trasferisci fondi</p>\r\n</div>\r\n\r\n<div class=\"ob-transfer panel-content scrollable\">\r\n    <form>\r\n        <div class=\"amount-wrapper\">\r\n            <div class=\"amount-block\">\r\n                <h4>Importo Totale</h4>\r\n                <div class=\"amount-container\">\r\n                    <span class=\"euro\">&euro;</span>\r\n                    <div id=\"entity-total\" class=\"amount\">0</div>\r\n                    <input type=\"hidden\" name=\"amount\" value=\"0\" />\r\n                </div>\r\n            </div>\r\n\r\n            <div id=\"keyboard-region\" class=\"keyboard-container border\">\r\n\r\n            </div>\r\n        </div>        \r\n\r\n        <div id=\"form-region\">\r\n            <div class=\"message help-inline error\"></div>\r\n\r\n            <div class=\"transfer-container\">\r\n                <div id=\"transfer-resume-sender-container\">\r\n                    <div class=\"transfer-item\">\r\n                        <div class=\"baloon-container\">\r\n                            <div class=\"baloon\">\r\n                                <i class=\"show-on-error icon-reject\"></i>\r\n                                <div class=\"price small\">\r\n                                    <div class=\"amount\" id=\"transfer-goal-amount\">\r\n                                        "
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.currentAmount), options) : helperMissing.call(depth0, "formatNumber", ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.currentAmount), options)))
    + "\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <h4>Obiettivo</h4>\r\n                    </div>\r\n                </div>\r\n\r\n                <div id=\"transfer-arrow-container\">\r\n                    <div class=\"direction-line js-viceversa\">\r\n                        <i class=\"arrow\"></i>\r\n                    </div>\r\n                </div>\r\n\r\n                <div id=\"transfer-resume-container\">\r\n                    <div class=\"transfer-item\">\r\n                        <div class=\"baloon-container\">\r\n                            <div class=\"baloon\">\r\n                                <i class=\"show-on-error icon-reject\"></i>\r\n                                <div class=\"price small\">\r\n                                    <div class=\"amount\" id=\"transfer-spendable-amount\">\r\n                                        "
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.financial)),stack1 == null || stack1 === false ? stack1 : stack1.spendable), options) : helperMissing.call(depth0, "formatNumber", ((stack1 = (depth0 && depth0.financial)),stack1 == null || stack1 === false ? stack1 : stack1.spendable), options)))
    + "\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <h4>Puoi Spendere</h4>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n\r\n            <a id=\"transfer-submit-button\" href=\"#\" class=\"btn btn-small js-confirm glb-btn success\">\r\n                Trasferisci <span class=\"icon-transfer\"></span>\r\n            </a>\r\n\r\n        </div>\r\n    </form>\r\n\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"loading-movements-list-region\"></div>\r\n<div class=\"banner-button-container\">\r\n    <div class=\"js-deals deals-banner banner-button-top\" style=\"display:none;\">\r\n        <div class=\"deals-banner-image\"></div>\r\n        <div class=\"center\">\r\n            Ci sono delle <span class=\"purple\">OFFERTE</span> per te!\r\n            <!--<i class=\"icon-close arrow\"></i></a>-->\r\n            <br>\r\n            <a class=\"go\" href=\"#\">Scoprile subito</a><span class=\"arrow\"> &gt;</span>\r\n        </div>\r\n        <div class=\"cross\">\r\n            <a href=\"#\"><i class=\"icon-close\"></i></a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"entities-region\"></div>\r\n";
  });

this["JST"]["assets/js/apps/activities/movements/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n	<div class=\"resume-box incomes js-incomes selected\">\r\n		<p class=\"title\">entrate</p>\r\n		<p class=\"price small\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.incomes), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.incomes), options)))
    + "</span>\r\n        </p>\r\n	</div>\r\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n	<div class=\"resume-box outcomes js-outcomes selected\">\r\n		<p class=\"title\">uscite</p>\r\n		<p class=\"price small\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.outcomes), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.outcomes), options)))
    + "</span>\r\n        </p>\r\n	</div>\r\n	";
  return buffer;
  }

  buffer += "<div class=\"resume-container\" style=\"display:none;\">\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.incomes), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.outcomes), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n\r\n<div class=\"mov-list\">\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"message message_1\">\r\n    <div class=\"empty-movement-list\"></div>\r\n    <span class=\"empty-movement-list-label\">\r\n        Sembra che qui non ci sia<br />\r\n        nulla di quello che cerchi!\r\n    </span>\r\n</div>\r\n<div class=\"message message_2\">\r\n    <div class=\"empty-movement-list\"></div>\r\n    <span class=\"empty-movement-list-label  padding\">\r\n        Abbiamo guardato bene<br />\r\n        ma quello che cerchi non c&rsquo;&egrave;\r\n    </span>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/activities/movements/list/templates/normal_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n<div class=\"loading-movements\">\r\n</div>\r\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n<div class=\"main-list-item movement ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.subType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n\r\n    <div class=\"border\">\r\n    </div>\r\n\r\n    <div class=\"head\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n\r\n    <div class=\"body\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(34, program34, data),fn:self.program(26, program26, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        \r\n\r\n        <p class=\"price small\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n        </p>\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n        <p class=\"description\">\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(39, program39, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </p>\r\n    </div>\r\n\r\n</div>\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subType), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "crd", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "crd", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bonifico", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bonifico", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bon", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bon", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "\r\n                    <i class=\"icon-refresh\"></i>Ricarica HYPE\r\n                ";
  }

function program8(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-iban\"></i>Denaro ricevuto\r\n                ";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subType), {hash:{},inverse:self.program(24, program24, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bonifico", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bonifico", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        \r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bon", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bon", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "crd", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "crd", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "gas", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "gas", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "atm", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "atm", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "ric", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "ric", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                <!-- da cancellare -->\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "pap", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "pap", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "ppc", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "ppc", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                <!-- da cancellare -->\r\n            ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-iban\"></i>Denaro inviato\r\n                ";
  }

function program14(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-cards\"></i>Pagamento presso\r\n                ";
  }

function program16(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-gas\"></i>Rifornimento carburante\r\n                ";
  }

function program18(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-atm\"></i>Prelievo Contanti\r\n                ";
  }

function program20(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-recharge\"></i>Ricarica telefono\r\n                ";
  }

function program22(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-cards\"></i>Pagamento presso <i class=\"icon-time\"></i>\r\n                ";
  }

function program24(depth0,data) {
  
  
  return "\r\n                <i class=\"icon-cards\"></i>Pagamento presso\r\n            ";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "crd", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "crd", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \r\n        ";
  return buffer;
  }
function program27(depth0,data) {
  
  
  return "\r\n                Ricarica da carta di credito            \r\n            ";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " \r\n                <p class=\"title\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </p>       \r\n            ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                        <span class=\"marker icon-marker\"></span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                    ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "   \r\n            <p class=\"title\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>    \r\n        ";
  return buffer;
  }
function program35(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <span class=\"marker icon-marker\"></span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                ";
  return buffer;
  }

function program37(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                ";
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "crd", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "crd", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "ppc", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "ppc", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "            \r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "gas", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "gas", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program40(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                    <span class=\"content\">";
  stack1 = (helper = helpers.surroundHashtags || (depth0 && depth0.surroundHashtags),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.memo), options) : helperMissing.call(depth0, "surroundHashtags", (depth0 && depth0.memo), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n                ";
  return buffer;
  }

  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/list/templates/p2p_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.p2pType), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "request_out", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "request_out", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "rejected_request_out", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "rejected_request_out", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-request-money\"></i> Richiesta di denaro a\r\n        ";
  }

function program5(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-request-money\"></i> Hai rifiutato la richiesta di denaro di\r\n        ";
  }

function program7(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-request-money-complete\"></i> Denaro ricevuto da\r\n        ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.p2pType), {hash:{},inverse:self.program(15, program15, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "request_in", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "request_in", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "rejected_request_in", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "rejected_request_in", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "send_pending", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "send_pending", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-send-money\"></i> Hai una richiesta di denaro da\r\n        ";
  }

function program13(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-request-money\"></i> Richiesto di denaro rifiutata da\r\n        ";
  }

function program15(depth0,data) {
  
  
  return "\r\n        <i class=\"icon-send-money\"></i> Denaro inviato a\r\n        ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <p class=\"message\">\r\n            <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n        </p>\r\n        ";
  return buffer;
  }

function program19(depth0,data) {
  
  
  return "\r\n    <p class=\"footer-alert\">\r\n        <i class=\"icon-time float-right\"></i><span>In attesa che il tuo contatto diventi un Hyper. </span>\r\n    </p>\r\n    ";
  }

function program21(depth0,data) {
  
  
  return "\r\n    <p class=\"footer-alert\">\r\n        <i class=\"icon-time float-right\"></i><span>Denaro in entrata in sospeso</span>\r\n    </p>\r\n    ";
  }

function program23(depth0,data) {
  
  
  return "\r\n    <p class=\"footer-alert\">\r\n        <i class=\"icon-time float-right\"></i><span>In attesa della tua accettazione</span>\r\n    </p>\r\n    ";
  }

function program25(depth0,data) {
  
  
  return "\r\n    <p class=\"footer-alert\">\r\n        <i class=\"icon-time float-right\"></i><span>In attesa della sua accettazione</span>\r\n    </p>\r\n    ";
  }

  buffer += "<div class=\"main-list-item movement p2p ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"border\">\r\n    </div>\r\n    <div class=\"head\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n\r\n    <div class=\"body\">\r\n        <p class=\"title\">"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</p>\r\n        <p class=\"price small\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.memo), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    </div>\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "send_pending", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "send_pending", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "receive_pending", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "receive_pending", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "request_in", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "request_in", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.p2pType), "request_out", options) : helperMissing.call(depth0, "is", (depth0 && depth0.p2pType), "request_out", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_accounted.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "\r\n    <p>Denaro inviato</p>\r\n    ";
  }

function program3(depth0,data) {
  
  
  return "\r\n    <p>Denaro ricevuto</p>\r\n    ";
  }

function program5(depth0,data) {
  
  
  return "\r\n                <span class=\"subtitle\">Hai Inviato a</span> ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                <span class=\"subtitle\">Hai ricevuto da</span> ";
  }

function program9(depth0,data) {
  
  
  return "\r\n                    <a href=\"#\" class=\"glb-btn archive js-reply\" data-type=\"payment\">INVIA DENARO<i class=\"icon-send-money\"></i></a>\r\n                ";
  }

function program11(depth0,data) {
  
  
  return "\r\n                    <a href=\"#\" class=\"glb-btn archive js-reply\" data-type=\"payment\">INVIA DENARO<i class=\"icon-refresh\"></i></a>\r\n                ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.reference), options)))
    + "</span>\r\n                <div class=\"clearfix\"></div>\r\n                <div class=\"baloon-image-container\">\r\n                    <div id=\"top-image\" class=\"baloon\">\r\n                        <div class=\"initials\">"
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"center-info-block\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n            <div class=\"padding\">\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "income", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "income", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n            </div>\r\n            <div class=\"padding\">\r\n                <a href=\"#\" class=\"glb-btn success js-reply\" data-type=\"request\">RICHIEDI DENARO<i class=\"icon-request-money\"></i></a>\r\n            </div>\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n        </div>\r\n    </div>\r\n    <div id=\"map-region\">\r\n    </div>\r\n</div>\r\n<!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_incoming_intent.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    \r\n    <p>Ricezione denaro - in attesa</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n\r\n                <span class=\"subtitle\">Questa transazione non è ancora stata completata:</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.reference), options)))
    + "</span>\r\n                <div class=\"clearfix\"></div>\r\n                <div class=\"baloon-image-container\">\r\n                    <div id=\"top-image\" class=\"baloon\">\r\n                        <div class=\"initials\">"
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block align-center\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n        </div> \r\n\r\n        \r\n        <div class=\"causal\">\r\n            Il nuovo contatto ricever&agrave; la notifica di richiesta denaro\r\n            e l'invito di registrazione ad Hype. Il ricevente ha 10\r\n            giorni per accettare, terminati i quali l'invio di denaro\r\n            sar&agrave; cancellato.\r\n        </div>\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_incoming_request.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    \r\n    <p>Richiesta di denaro</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n\r\n                <span class=\"subtitle\">Hai una richiesta di denaro da</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.reference), options)))
    + "</span>\r\n                <div class=\"clearfix\"></div>\r\n                <div class=\"baloon-image-container\">\r\n                    <div id=\"top-image\" class=\"baloon\">\r\n                        <div class=\"initials\">"
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block align-center\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"command-block\">\r\n            <a href=\"#\" class=\"glb-btn success js-grant-money\">ACCETTA RICHIESTA<i class=\"icon-accept\"></i></a>\r\n            <a href=\"#\" class=\"glb-btn delete js-deny-money\">RESPINGI RICHIESTA<i class=\"icon-reject\"></i></a>\r\n        </div>\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_outgoing_intent.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    \r\n    <p>Invio denaro - in attesa</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n\r\n                <span class=\"subtitle\">Stai inviando denaro a:</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.reference), options)))
    + "</span>\r\n                <div class=\"clearfix\"></div>\r\n                <div class=\"baloon-image-container\">\r\n                    <div id=\"top-image\" class=\"baloon\">\r\n                        <div class=\"initials\">"
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n            <div class=\"price-cat-block align-center\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"command-block\">\r\n            <a href=\"#\" class=\"glb-btn delete js-cancel-intent\">Annulla invio<i class=\"icon-reject\"></i></a>\r\n        </div>\r\n\r\n        <div class=\"causal\">\r\n            Il nuovo contatto ricever&agrave; la notifica di invio denaro\r\n            e l'invito di registrazione ad Hype. Il ricevente ha 10\r\n            giorni per accettare, terminati i quali l'invio di denaro\r\n            sar&agrave; cancellato.\r\n        </div>\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_outgoing_request.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    \r\n    <p>Richiesta di denaro - in attesa</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n\r\n                <span class=\"subtitle\">Hai richiesto denaro a:</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateFirstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.mateLastName), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.reference), options)))
    + "</span>\r\n                <div class=\"clearfix\"></div>\r\n                <div class=\"baloon-image-container\">\r\n                    <div id=\"top-image\" class=\"baloon\">\r\n                        <div class=\"initials\">"
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.mateFirstName), (depth0 && depth0.mateLastName), options)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block align-center\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.p2pType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2pType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_rejected_request_in.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Richiesta di denaro rifiutata</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title\">\r\n                la tua richiesta di pagamento è stata rifiutata\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n             \r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/p2p_rejected_request_out.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Richiesta di denaro rifiutata</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title\">\r\n                hai rifiutato la richiesta di pagamento\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n             \r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/pap.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\r\n                <span class=\"icon-marker\"></span>\r\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                ";
  if (helper = helpers.causal) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.causal); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                ";
  return buffer;
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Partita prenotata</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title js-set-venue\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                <!-- ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " per ora inutilizzato -->\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n\r\n    <div class=\"causal\">\r\n        Partita prenotata   \r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "Bonifico";
  }

function program3(depth0,data) {
  
  
  return "Movimento";
  }

function program5(depth0,data) {
  
  
  return "\r\n                <span class=\"icon-marker-full\"></span>\r\n                ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options) : helperMissing.call(depth0, "capitalize", ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options)))
    + "\r\n                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "\r\n                    Seleziona obiettivo\r\n                    ";
  }

function program15(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"causal\">\r\n        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n    </div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bon", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bon", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container \">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title js-set-venue\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n                \r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <p class=\"select-goal\">\r\n                Soldi spesi da:\r\n                <a href=\"#movements/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/spend-from-goal\" class=\"js-spend-from-goal\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.goal), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </a>\r\n            </p>\r\n\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_atm.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n                    Seleziona obiettivo\r\n                    ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n\r\n    <p>Prelievo Contante</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                <div class=\"image other-operations show-atm\"></div>\r\n                <span class=\"subtitle other-operations\">Hai prelevato da</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block other-operations\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <p class=\"select-goal\">\r\n                Soldi spesi da:\r\n                <a href=\"#movements/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/spend-from-goal\" class=\"js-spend-from-goal\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.goal), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </a>\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_card.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\r\n                <span class=\"icon-marker-full\"></span>\r\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options) : helperMissing.call(depth0, "capitalize", ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options)))
    + "\r\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\r\n                    Seleziona obiettivo\r\n                    ";
  }

function program11(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"causal\">\r\n        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n    </div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Pagamento con carta</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block card\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container \">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title js-set-venue\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n                \r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <p class=\"select-goal\">\r\n                Soldi spesi da:\r\n                <a href=\"#movements/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/spend-from-goal\" class=\"js-spend-from-goal\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.goal), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </a>\r\n            </p>\r\n\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_gas.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\r\n                <span class=\"icon-marker-full\"></span>\r\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options) : helperMissing.call(depth0, "capitalize", ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options)))
    + "\r\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\r\n                    Seleziona obiettivo\r\n                    ";
  }

function program11(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"causal\">\r\n        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n    </div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>Utenza gas</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block gas\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container \">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title js-set-venue\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n                \r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <p class=\"select-goal\">\r\n                Soldi spesi da:\r\n                <a href=\"#movements/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/spend-from-goal\" class=\"js-spend-from-goal\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.goal), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </a>\r\n            </p> \r\n\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    \r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_pap.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\r\n                <span class=\"icon-marker-full\"></span>\r\n                ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options) : helperMissing.call(depth0, "capitalize", ((stack1 = (depth0 && depth0.merchant)),stack1 == null || stack1 === false ? stack1 : stack1.name), options)))
    + "\r\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n                "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.goal)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n                    ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\r\n                    Seleziona obiettivo\r\n                    ";
  }

function program11(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"causal\">\r\n        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "\r\n    </div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>\r\n    Hai pagato presso\r\n    </p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block\">\r\n\r\n        <div id=\"top-image\" class=\"top-image-title-container \">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <p class=\"mov-title js-set-venue\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"center-info-block\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <p class=\"select-goal\">\r\n                Soldi spesi da:\r\n                <a href=\"#movements/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/spend-from-goal\" class=\"js-spend-from-goal\">\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.goal), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </a>\r\n            </p> \r\n\r\n        </div>\r\n        <div class=\"bottom-map-block\">\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"image-profile-region\" class=\"camera-block\">\r\n        <!-- pulsante per avviare selezione foto -->\r\n    </div>\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n\r\n    <div class=\"causal\">\r\n        Pagamento in attesa di contabilizzazione  \r\n    </div>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.merchant), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    \r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_recharge.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n\r\n    <p>RICARICA TELEFONICA</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                <div class=\"image other-operations show-recharge\"></div>\r\n                <span class=\"subtitle other-operations\">Hai effettuato una</span>\r\n\r\n                <h3>"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.title), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.title), options)))
    + "</h3>\r\n                <span class=\"reference\">"
    + escapeExpression((helper = helpers.mobilePhoneNumber || (depth0 && depth0.mobilePhoneNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.reference), options) : helperMissing.call(depth0, "mobilePhoneNumber", (depth0 && depth0.reference), options)))
    + "</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block other-operations\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/show_recharge_card.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n\r\n    <p>RICARICA HYPE</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                <div class=\"image other-operations show-card-recharge\"></div>\r\n                <span class=\"subtitle other-operations\">Hai effettuato una</span>\r\n\r\n                <h3>Ricarica con carta di credito</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"center-info-block other-operations\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"memo-container\">\r\n                <h4 class=\"float-left\">Memo</h4>\r\n                <a href=\"#\" style=\"display:none;\" class=\"save-memo js-save-memo float-right\">\r\n                    <i class=\"icon-accept\"></i>\r\n                </a>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n                <div class=\"memo\">\r\n                    <textarea id=\"hashtag-editor\" name=\"memo\" style=\"display:none;\"></textarea>\r\n                    <div id=\"hashtag-display\">\r\n                        ";
  if (helper = helpers.memo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.memo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        <span class=\"hashtag-placeholder\">\r\n                            es. Regalo per mamma <span class=\"tag\">#compleanno</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/show/templates/transfer.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                <div class=\"image other-operations show-outgoing-transfer\"></div>\r\n                <span class=\"subtitle other-operations\">Hai inviato un bonifico a:</span>\r\n\r\n                <h3>";
  if (helper = helpers.reference) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.reference); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n            </div>\r\n        </div>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n        <div class=\"top-image-title-container\">\r\n            <p class=\"mov-date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.date), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.date), options)))
    + "</p>\r\n            <div class=\"align-center\">\r\n                <div class=\"image other-operations show-incoming-transfer\"></div>\r\n                <span class=\"subtitle other-operations\">Hai ricevuto un bonifico da:</span>\r\n\r\n                <span class=\"reference no-margin-top\">";
  if (helper = helpers.reference) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.reference); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            </div>\r\n        </div>\r\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\r\n                <div class=\"command-block\">\r\n                    <a href=\"#\" class=\"js-cancel-transfer glb-btn delete\">CANCELLA BONIFICO</a>\r\n                </div>\r\n            ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n\r\n    <p>BONIFICO</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"profile-region\" class=\"movimento-block p2p-movement\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcome", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcome", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"center-info-block other-operations\">\r\n            <div class=\"price-cat-block\">\r\n                <div class=\"price ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n                </div>\r\n                <div id=\"dropdown-region\" class=\"dropdown-categories\">\r\n                    <!-- selettore categoria obiettivo -->\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"clearfix\"></div>\r\n            <p class=\"message\">\r\n                <span class=\"content\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </p>\r\n            <div class=\"clearfix\"></div>\r\n\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.subType), "bonifico", options) : helperMissing.call(depth0, "is", (depth0 && depth0.subType), "bonifico", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"map-region\">\r\n\r\n    </div>\r\n</div><!-- fine panel content -->\r\n<div id=\"image-show-region\">\r\n\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/venue_list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"search-region\"></div>\r\n<div id=\"list-region\" class=\"scrollable\"></div>\r\n";
  });

this["JST"]["assets/js/apps/activities/movements/venue_list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"merchants\">\r\n</ul>";
  });

this["JST"]["assets/js/apps/activities/movements/venue_list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <span><i class=\"icon-marker-full\"></i> Aggiungi luogo personalizzato</span>\r\n    ";
  }

  buffer += "<div class=\"desc\">\r\n  <p class=\"name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n  <p class=\"address\">";
  if (helper = helpers.vicinity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.vicinity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.personal), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/movements/venue_list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<td colspan=\"3\">Nessun merchant trovato</td>";
  });

this["JST"]["assets/js/apps/activities/movements/venue_list/templates/top_panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    <p>Seleziona luogo</p>\r\n</div>\r\n<form class=\"form-search form-inline pull-right merchant-search-form\">\r\n    <div class=\"search-panel\">\r\n        <div class=\"icon-lens\"></div>\r\n        <input type=\"text\" placeholder=\"Ricerca luogo\" class=\"search-query js-filter-criterion\">\r\n        <div class=\"loading-contacts\" style=\"display:none;\"></div>  \r\n    </div>\r\n</form>\r\n\r\n<!--<a href=\"#\" class=\"btn btn-small\" id=\"js-add-venue\">\r\n        <i class=\"icon-eye-open\"></i>\r\n        Aggiungi questo venue\r\n    </a>-->";
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"home-header loading\">\r\n	<div class=\"backdrop\"></div>\r\n    <div id=\"safetospend-region\"></div><!-- contiene la vista con il safe to spend e i vari saldi (nascosti)-->\r\n    <div id=\"search-area\"></div><!-- per una futura ricerca-->\r\n    <div id=\"activities-navigation-region\"></div><!-- contiene la vista con i tab della navigazione movimenti/obiettivi -->\r\n</header>\r\n<div class=\"activities-wrapper show-movements\">\r\n    <div id=\"movements-area\" class=\"activities-container\"></div>\r\n    <div id=\"goals-area\" class=\"activities-container\"></div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- template contenitore dei tabs della navigazione obiettivi/movimenti -->\r\n<ul class=\"mov-ob-tabs\"></ul>\r\n<a href=\"#\" class=\"js-toggle-search search\">\r\n    <i class=\"icon-lens\"></i>\r\n</a>";
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- template per il singolo tab della navigazione movimenti/obiettivi -->\r\n<a href=\"#\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "non c'è niente qui";
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/search.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"search-wrapper\">\n	<div class=\"search-container\">\n		<input type=\"text\" placeholder=\"cosa vuoi cercare?\"/>\n        <div class=\"loading-contacts\" style=\"display:none;\"></div>     \n		<a href=\"#\" class=\"search\" style=\"display:none;\">\n			<i class=\"icon-lens\"></i>\n		</a>\n		<a href=\"#\" class=\"js-close-search close-search\">\n			<i class=\"icon-close-small\"></i>\n		</a>\n	</div>\n</div>\n";
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/stsPanel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"label\">Puoi spendere</div>\r\n    <div class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.spendable), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.spendable), options)))
    + "<div class=\"dropdown\"></div></div>\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n    <div class=\"label error\">\"PUOI SPENDERE\" SUPERATO</div>\r\n    <div class=\"safe-to-spend-error\">Rivedi i tuoi obiettivi</div>\r\n    ";
  }

function program5(depth0,data) {
  
  
  return "\r\n    <div class=\"label error\">\"PUOI SPENDERE\" SUPERATO</div>\r\n    <div class=\"safe-to-spend-error\">Rivedi i tuoi obiettivi<div class=\"dropdown\"></div></div>\r\n    ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-menu toggle-menu\"></a>\r\n\r\n    <p>";
  if (helper = helpers.nickname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nickname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n\r\n    <a href=\"#\" class=\"js-transfer-money right-ctrl send-money\"></a>\r\n</div>\r\n\r\n<div class=\"safe-to-spend minified\">\r\n    ";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, ">=", (depth0 && depth0.spendable), 0, options) : helperMissing.call(depth0, "compare", ">=", (depth0 && depth0.spendable), 0, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n</div>\r\n\r\n<div class=\"safe-to-spend\">\r\n    ";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, ">=", (depth0 && depth0.spendable), 0, options) : helperMissing.call(depth0, "compare", ">=", (depth0 && depth0.spendable), 0, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n</div>\r\n\r\n<!-- qui sotto è mostrato solo sul click della parte sopra -->\r\n<div class=\"bank-account-review\">\r\n    <p>Saldo disponibile <span class=\"value positive\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.balance), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.balance), options)))
    + " +</span></p>\r\n    <p>Pagamenti programmati <span class=\"value negative\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.scheduledActivities), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.scheduledActivities), options)))
    + " -</span></p>\r\n    <p>Impegnato per obiettivi <span class=\"value negative\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.savedAmountForGoals), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.savedAmountForGoals), options)))
    + " -</span></p>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/activities/navigation/list/templates/transfer_menu.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-dialog transfer-dialog ";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"backdrop\"></div>\r\n    <div class=\"overdrop\">\r\n        <div class=\"top-title\">Invia denaro</div>\r\n\r\n        <a href=\"#\" class=\"js-send-request request-button send-money\" data-action=\"send\">\r\n            <div class=\"image\"></div>\r\n            <label class=\"light-label\">Invia denaro</label>\r\n        </a>\r\n\r\n        <a href=\"#\" class=\"js-send-request request-button request-money\" data-action=\"request\">\r\n            <div class=\"image\"></div>\r\n            <label class=\"light-label\">Richiedi denaro</label>\r\n        </a>\r\n\r\n        <div class=\"bottom-box\">\r\n            <div class=\"close-button js-cancel\">\r\n                <a href=\"#\">\r\n                    <i class=\"icon-close js-close\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/card/activate/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <p>Attiva carta</p>\r\n    </div>\r\n    <div class=\"card-page card-activation panel-content scrollable\">\r\n        <form>\r\n            <h3>Per attivare la tua nuova carta fisica inserisci il cvv che puoi trovare nel retro</h3>\r\n            \r\n            <div class=\"card-container\">\r\n                <div class=\"virtual-card rotate\">\r\n                    <div class=\"retro\">\r\n                        <div class=\"cvv\">\r\n                            <input type=\"number\" id=\"entity-cvv\" name=\"cvv\" placeholder=\"CVV\"/>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <span class=\"js-result\"></span>\r\n        </form>\r\n\r\n        <a href=\"#\" id=\"activate-button\" class=\"glb-btn success inactive js-submit\">\r\n            Conferma abilitazione\r\n            <i class=\"icon-accept\"></i>\r\n        </a>\r\n\r\n    </div>\r\n\r\n</div>";
  });

this["JST"]["assets/js/apps/card/recharge/menu/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-menu js-toggle-menu\"></a>\r\n        <p>Ricarica Hype</p>\r\n        <span>Scegli modalità di ricarica</span>\r\n    </div>\r\n    <div class=\"panel-content scrollable\">\r\n        <div class=\"page-content\">\r\n            <div class=\"choice js-recharge-via-card\">\r\n                <div class=\"image by-card\"></div>\r\n                <p class=\"title\">\r\n                    Ricarica con Carta\r\n                </p>\r\n                <p class=\"coming-soon description\">\r\n                    Coming soon...\r\n                </p>\r\n                <p class=\"description\">\r\n                Ricarica HYPE con una qualsiasi carta di credito: &egrave; GRATIS!<br /><br />\r\n                    Collega le carte con le quali vuoi ricaricare HYPE dall&#39; apposita sezione.\r\n                </p>\r\n            </div>\r\n            <div href=\"#\" class=\"choice js-recharge-via-transfer\">\r\n                <div class=\"image by-transfer\"></div>\r\n                <p class=\"title\">Coordinate IBAN <br />\r\n                per bonifico</p>\r\n                <p class=\"description\">\r\n                    Ricarica HYPE mediante un bonifico da qualsiasi conto corrente verso l&#39; IBAN di HYPE.\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/card_edit.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <span>Modifica o elimina carta collegata</span> \r\n        ";
  }

function program3(depth0,data) {
  
  
  return "\r\n        <span>Collega nuova carta</span> \r\n        ";
  }

function program5(depth0,data) {
  
  
  return "\r\n             \r\n            <div class=\"button-wrapper\">\r\n                <a href=\"#\" class=\"js-delete glb-btn delete\">\r\n                        Elimina Carta\r\n                        <i class=\"icon-trash\"></i>\r\n                    </a>\r\n            </div>\r\n        ";
  }

function program7(depth0,data) {
  
  
  return " \r\n                <div class=\"button-wrapper\">\r\n                <a href=\"#\" class=\"js-submit glb-btn success\">\r\n                        Collega Carta\r\n                        <i class=\"icon-accept\"></i>\r\n                    </a>\r\n            </div>\r\n        ";
  }

  buffer += "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <p>LE MIE CARTE</p>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"panel-content scrollable\">\r\n        <div id=\"form-region\">\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/card_select.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <p>RICARICA CON CARTA</p>\r\n        <span>Seleziona carta</span>\r\n    </div>\r\n    <div id=\"cards-list-region\">\r\n    	\r\n    </div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/cards_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cards-list ";
  if (helper = helpers.mode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.mode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/cards_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\r\n<!--<div class=\"float-right\">\r\n	<span class=\"show-other-cards\">&nbsp;</span>\r\n</div>\r\n -->\r\n <a class=\"show-other-cards\" href=\"#\">Altre Carte</a>\r\n";
  }

  buffer += "<div class=\"card-type "
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.circuitName), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.circuitName), options)))
    + " float-left\">\r\n    &nbsp;\r\n</div>\r\n<div class=\"float-left card-details\">\r\n    <div>\r\n        ";
  if (helper = helpers.cardAlias) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cardAlias); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n    </div>\r\n    <div class=\"pan font-size-small\">\r\n        <span>";
  if (helper = helpers.maskedPan) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.maskedPan); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        <span class=\"edit-label float-right font-size-xxx-small\">Modifica o Elimina</span>\r\n    </div>\r\n</div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.moreCards), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"clearfix\"></div>";
  return buffer;
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/form.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<div class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCards), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " toggler\">\r\n    <span class=\"float-left\">RICARICA CON NUOVA CARTA</span>\r\n    <div class=\"clearfix\"></div>\r\n</div>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " js-toggler ";
  }

function program4(depth0,data) {
  
  
  return "\r\n    <div class=\"padding page-description\">\r\n        Inserisci i dati della Carta di Credito su cui verrà addebitata la ricarica:\r\n    </div>\r\n    ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newCard), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "\r\n    <div class=\"padding page-description\">\r\n        <strong>Collega</strong> una Carta di Credito ad HYPE per effettuare ricariche in modo rapido e sicuro: la carta viene verificata <strong>tramite 3D SECURE</strong>\r\n        <br />\r\n        <br /> Puoi collegare fino a <strong>5</strong> Carte al tuo profilo HYPE\r\n    </div>\r\n    ";
  }

function program9(depth0,data) {
  
  
  return " disabled=\"disabled\" ";
  }

function program11(depth0,data) {
  
  
  return "\r\n                <input type=\"text\" name=\"cvv\"  id=\"cvv\" value=\"***\" disabled=\"disabled\"  class=\"cvv-input\" placeholder=\"CVV/CVC\" name=\"cvv\" />\r\n                ";
  }

function program13(depth0,data) {
  
  
  return "\r\n                <input type=\"number\" name=\"cvv\"  id=\"cvv\"  class=\"cvv-input\" placeholder=\"CVV/CVC\" name=\"cvv\" value=\"\" />\r\n                </span> \r\n                ";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recharging), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"new-card-wrapper slider closed\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recharging), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"card-form-container card-container\">\r\n        <div class=\"fields-line\">\r\n            <div class=\"input-container full\">\r\n                <span class=\"js-validate-element-cardAlias\">\r\n                    <input type=\"text\" placeholder=\"NOME CARTA\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"cardAlias\" />\r\n                </span>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n            </div>\r\n        </div>\r\n        <div class=\"virtual-card \">\r\n            <div class=\"front hype\">\r\n                <div class=\"chip card-element\"></div>\r\n                <div class=\"cardlogo card-element generic-card\"></div>\r\n                <div class=\"card-element pan js-pan\"></div>\r\n                <div class=\"card-element expiration\">\r\n                    <div class=\"label\">validit&agrave;</div>\r\n                    <div class=\"label value\"><span class=\"js-month\">01</span><span>/</span><span class=\"js-year\">--</span></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"retro hype\">\r\n                <div class=\"cvv card-element\">\r\n                    <div class=\"whitestripe float-left\">&nbsp;</div>\r\n                    <div class=\"js-cvv float-left label value\"></div>\r\n                    <div class=\"clearfix\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"fields-line\">\r\n            <div class=\"input-container full\">\r\n                <span class=\"js-validate-element-cardNumber\">\r\n                    <input ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  type=\"text\" placeholder=\"NUMERO CARTA\" id=\"cardNumber\" name=\"cardNumber\" />\r\n                </span>\r\n            </div>\r\n            <div class=\"clearfix\">\r\n            </div>\r\n        </div>\r\n        <div class=\"fields-line\">\r\n            <div class=\"input-container  third padding-right\">\r\n                <input type=\"text\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"monthText\" class=\"expiryMonth-input\" name=\"monthText\" value=\"Gennaio\" />\r\n            </div>\r\n            <div class=\"input-container  third\">\r\n                <input ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " type=\"text\" id=\"year\" class=\"expiryYear-input  js-year\" name=\"expiryYear\" />\r\n            </div>\r\n            <div class=\"input-container  third padding-left\">\r\n                <span class=\"js-validate-element-cvv\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </div>\r\n            <input type=\"hidden\" value=\"01\" name=\"expiryMonth\" class=\"js-month\" />\r\n            <div class=\"clearfix\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<input type=\"hidden\" class=\"js-hidden-amount \" name=\"amount\" value=\"0\">\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/my_cards.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <span>Gestisci o aggiungi altre carte</span> ";
  }

function program3(depth0,data) {
  
  
  return "\r\n        <span>Collega una nuova carta</span> ";
  }

function program5(depth0,data) {
  
  
  return "\r\n        <div class=\"new-card js-add-card add-card padding cards-list-element\"><span class=\"float-left\">\r\n     COLLEGA UNA NUOVA CARTA</span>\r\n            <span class=\"float-right\">&nbsp;</span>\r\n            <div class=\"clearfix\">\r\n            </div>\r\n        </div>\r\n        ";
  }

function program7(depth0,data) {
  
  
  return "\r\n        <div class=\"button-wrapper\">\r\n            <a href=\"#\" class=\"js-submit glb-btn success\">\r\n                        Salva\r\n                        <i class=\"icon-accept\"></i>\r\n                    </a>\r\n        </div>\r\n        ";
  }

  buffer += "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-menu js-toggle-menu\"></a>\r\n        <p>LE MIE CARTE</p>\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.newCard), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"panel-content scrollable\">\r\n        <div id=\"cards-content-region\">\r\n        </div>\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.newCard), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <p>RICARICA CON CARTA</p>\r\n        <span>Inserisci i dati della carta</span>\r\n    </div>\r\n    <div class=\"panel-content scrollable\">\r\n        <div class=\"amount-wrapper input-wrapper\">\r\n            <div class=\"amount-block js-validate-element-amount\">\r\n                <h4>Importo:</h4>\r\n                <div class=\"amount-container\">\r\n                    <span class=\"euro\">€</span>\r\n                    <div id=\"entity-amount\" class=\"amount\">0</div>\r\n                </div>\r\n            </div>\r\n            <div id=\"keyboard-region\" class=\"keyboard-container\">\r\n            </div>\r\n        </div>\r\n        <div class=\"js-toggler toggler top\">\r\n            <span class=\"float-left\">RICARICA CON CARTA COLLEGATA</span>\r\n\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n        <div id=\"default-card-region\" class=\"slider selection-mode\">\r\n        </div>\r\n        <div id=\"form-region\"></div>\r\n        <div class=\"button-wrapper\">\r\n                <a href=\"#\" class=\"js-submit glb-btn success\">\r\n                        Ricarica HYPE\r\n                        <i class=\"icon-accept\"></i>\r\n                    </a>\r\n            </div>      \r\n    </div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/card/recharge/profile/templates/resume.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "\r\n<div class=\"modal-dialog resume-dialog\">\r\n	<div class=\"backdrop\"></div>\r\n	<div class=\"overdrop scrollable\">\r\n		<div class=\"top-title\">\r\n            <p>Stai caricando</p>\r\n		</div>\r\n		<div class=\"amount-container\">\r\n			<div class=\"total-amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</div>\r\n		</div> \r\n\r\n        <div class=\"description\">\r\n            <div class=\"content recharge\">\r\n            	Dalla tua carta<br />\r\n            	";
  if (helper = helpers.maskedPan) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.maskedPan); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<br />\r\n            	sul tuo conto HYPE\r\n            </div>\r\n        </div>\r\n\r\n		<div class=\"button-container\">\r\n			<a href=\"#\" class=\"glb-btn success js-confirm\">Conferma<i class=\"icon-accept\"></i></a>\r\n			<a href=\"#\" class=\"glb-btn delete js-cancel\">Annulla<i class=\"icon-reject\"></i></a>\r\n		</div>\r\n		\r\n		<div class=\"bottom-box\">\r\n			<div class=\"close-button\">\r\n				<a href=\"#\" class=\"js-cancel\">\r\n					<i class=\"icon-close\"></i>\r\n				</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/card/show/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                        <div class=\"pan\">\r\n                            "
    + escapeExpression((helper = helpers.splitPAN || (depth0 && depth0.splitPAN),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.pan), options) : helperMissing.call(depth0, "splitPAN", (depth0 && depth0.pan), options)))
    + "\r\n                        </div>\r\n                        <div class=\"initialPan\">\r\n                            ";
  if (helper = helpers.initialPan) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.initialPan); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        </div>\r\n                        ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " hidden";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPlus), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "\r\n        <div id=\"card-plus-container\" class=\"action-container plus\">\r\n            <div class=\"card-page\">\r\n                <div class=\"title alternative-font font-size-medium\">\r\n                    Vai oltre i limiti di HYPE\r\n                </div>\r\n                <div class=\"description\">\r\n                    Passa a HYPE <strong>PLUS</strong>: puoi accreditare il tuo stipendio e aumentare i tuoi obiettivi\r\n                </div>\r\n                <a href=\"#\" class=\"js-plus glb-btn complete\">\r\n                    Scopri HYPE PLUS!\r\n                    <i class=\"icon-arrow-dx\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n        ";
  }

  buffer += "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        <a href=\"#\" class=\"icon-menu js-toggle-menu\"></a>\r\n        <p>La mia carta</p>\r\n    </div>\r\n    <div class=\"panel-content scrollable\">\r\n        <div class=\"card-page\">\r\n            <div id=\"card-action-container\">\r\n                <div class=\"action-container request\">\r\n                    <div class=\"caption page-description\">\r\n                        Con <span class=\"highlight\">HYPE</span> puoi avere anche una carta fisica per effettuare acquisiti in negozi e prelevare gratuitamente presso qualsiasi sportello ATM. Richiedila, <span class=\"highlight\">&egrave; gratis!</span>\r\n                    </div>\r\n                    <a href=\"#\" class=\"js-request glb-btn complete\">\r\n                    Richiedi carta fisica\r\n                    <i class=\"icon-arrow-dx\"></i>\r\n                </a>\r\n                </div>\r\n                <div class=\"action-container activate\">\r\n                    <div class=\"caption page-description\">\r\n                        Hai ricevuto la tua carta? Attivala ora inserendo il codice CVV che trovi sul retro della carta.\r\n                    </div>\r\n                    <a href=\"#\" class=\"js-activate glb-btn complete\">\r\n                    Abilita carta fisica\r\n                    <i class=\"icon-arrow-dx\"></i>\r\n                </a>\r\n                </div>\r\n                <div class=\"action-container glb-btn success complete\">\r\n                    <a href=\"#\" class=\"js-locked glb-btn delete\">\r\n                    Carta bloccata\r\n                </a>\r\n                </div>\r\n                <div class=\"space-line\"></div>\r\n            </div>\r\n            <a class=\"turn-card\">\r\n            </a>\r\n            <div class=\"card-container\">\r\n                <div class=\"virtual-card\">\r\n                    <div class=\"front "
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.customer), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.customer), options)))
    + "\">\r\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pan), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                        <div class=\"expire\">\r\n                            <div class=\"card-exp-label\">\r\n                                <span>VALID<br />THRU:</span>\r\n                            </div>\r\n                            <div class=\"font-size-small card-exp-date\">\r\n                                "
    + escapeExpression((helper = helpers.expireDate || (depth0 && depth0.expireDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.expirationDate), options) : helperMissing.call(depth0, "expireDate", (depth0 && depth0.expirationDate), options)))
    + "\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"retro "
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.customer), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.customer), options)))
    + "\">\r\n                        <div class=\"cvv\">\r\n                            <span>cvv:</span> ";
  if (helper = helpers.cvv) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cvv); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div id=\"card-toggles-wrapper\">\r\n                <div class=\"space-line\"></div>\r\n                <div id=\"card-toggles-caption\">\r\n                    <div class=\"caption show-if-active\">\r\n                        <div class=\"play";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.anyFunctionalities), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n                            <div class=\"caption-header\">\r\n                                <div class=\"icon-unlocked\"></div>\r\n                                Carta attiva\r\n                            </div>\r\n                            <div class=\"caption-body\">\r\n                                Quando non usi la carta,\r\n                                <br/> basta un tap per metterla in pausa:\r\n                                <br/> nessuno potr&agrave; utilizzarla se non la riattivi.\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"pause";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.anyFunctionalities), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n                            <div class=\"caption-header\">\r\n                                <div class=\"icon-locked\"></div>\r\n                                Carta in pausa\r\n                            </div>\r\n                            <div class=\"caption-body\">\r\n                                La carta ora &egrave; in pausa\r\n                                <br/> e nessuno la pu&ograve; utilizzare.\r\n                                <br/> Puoi riattivare la carta in qualsiasi momento con un tap.\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"caption show-unless-active\">\r\n                        <div class=\"play";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.operativitaECOMMERCE), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n                            <div class=\"caption-header\">\r\n                                <div class=\"icon-unlocked\"></div>\r\n                                Carta attiva\r\n                            </div>\r\n                            <div class=\"caption-body\">\r\n                                Quando non usi la carta,\r\n                                <br/> basta un tap per metterla in pausa:\r\n                                <br/> nessuno potr&agrave; utilizzarla se non la riattivi.\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"pause";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.operativitaECOMMERCE), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n                            <div class=\"caption-header\">\r\n                                <div class=\"icon-locked\"></div>\r\n                                Carta in pausa\r\n                            </div>\r\n                            <div class=\"caption-body\">\r\n                                La carta ora &egrave; in pausa\r\n                                <br/> e nessuno la pu&ograve; utilizzare.\r\n                                <br/> Puoi riattivare la carta in qualsiasi momento con un tap.\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div id=\"card-toggles\">\r\n                    <div id=\"main-switch-wrapper\">\r\n                        <div class=\"hype-toggle "
    + escapeExpression((helper = helpers.activeFunctionality || (depth0 && depth0.activeFunctionality),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.anyFunctionalities), options) : helperMissing.call(depth0, "activeFunctionality", (depth0 && depth0.anyFunctionalities), options)))
    + " operativitaATM operativitaPOS operativitaECOMMERCE show-if-active js-switch\" data-target=\"all\">\r\n                            <div class=\"switch\">\r\n                                <div class=\"switch-img\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"hype-toggle "
    + escapeExpression((helper = helpers.activeFunctionality || (depth0 && depth0.activeFunctionality),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaECOMMERCE), options) : helperMissing.call(depth0, "activeFunctionality", (depth0 && depth0.operativitaECOMMERCE), options)))
    + " operativitaECOMMERCE js-switch show-unless-active\" data-target=\"web\">\r\n                            <div class=\"switch\">\r\n                                <div class=\"switch-img\"></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div id=\"min-switches-wrapper\" class=\"show-if-active\">\r\n                        <div>\r\n                            <div class=\"hype-toggle-caption operativitaECOMMERCE\">\r\n                                <div class=\"icon-"
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaECOMMERCE), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaECOMMERCE), options)))
    + "\"></div>\r\n                                <div class=\"main-text\">Acquisti online</div>\r\n                                <div class=\"locked-text "
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaECOMMERCE), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaECOMMERCE), options)))
    + "\">Hai disattivato la carta per gli acquisti su internet e tramite wallet.\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"hype-toggle min "
    + escapeExpression((helper = helpers.activeFunctionality || (depth0 && depth0.activeFunctionality),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaECOMMERCE), options) : helperMissing.call(depth0, "activeFunctionality", (depth0 && depth0.operativitaECOMMERCE), options)))
    + " operativitaECOMMERCE js-switch show-if-active\" data-target=\"web\">\r\n                                <div class=\"switch\">\r\n                                    <div class=\"switch-img\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                            <div class=\"hype-toggle-caption operativitaPOS\">\r\n                                <div class=\"icon-"
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaPOS), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaPOS), options)))
    + "\"></div>\r\n                                <div class=\"main-text\">Acquisti in negozio</div>\r\n                                <div class=\"locked-text "
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaPOS), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaPOS), options)))
    + "\">Hai disattivato gli acquisti nei negozi con carta di pagamento fisica.\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"hype-toggle min "
    + escapeExpression((helper = helpers.activeFunctionality || (depth0 && depth0.activeFunctionality),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaPOS), options) : helperMissing.call(depth0, "activeFunctionality", (depth0 && depth0.operativitaPOS), options)))
    + " operativitaPOS js-switch show-if-active\" data-target=\"pos\">\r\n                                <div class=\"switch\">\r\n                                    <div class=\"switch-img\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                            <div class=\"hype-toggle-caption operativitaATM\">\r\n                                <div class=\"icon-"
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaATM), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaATM), options)))
    + "\"></div>\r\n                                <div class=\"main-text\">Prelievi bancomat</div>\r\n                                <div class=\"locked-text "
    + escapeExpression((helper = helpers.activeFunctionalityPadlock || (depth0 && depth0.activeFunctionalityPadlock),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaATM), options) : helperMissing.call(depth0, "activeFunctionalityPadlock", (depth0 && depth0.operativitaATM), options)))
    + "\">Hai disattivato il prelievo di contanti presso gli sportelli ATM.\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"hype-toggle min "
    + escapeExpression((helper = helpers.activeFunctionality || (depth0 && depth0.activeFunctionality),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.operativitaATM), options) : helperMissing.call(depth0, "activeFunctionality", (depth0 && depth0.operativitaATM), options)))
    + " operativitaATM js-switch show-if-active\" data-target=\"atm\">\r\n                                <div class=\"switch\">\r\n                                    <div class=\"switch-img\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"space-line\"></div>\r\n            </div>\r\n            <div id=\"card-recharge-container\">\r\n                <div class=\"card-status\">\r\n                    Dal <span class=\"date\">"
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.renewDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.renewDate), options)))
    + "</span> hai ricaricato la tua carta di\r\n                </div>\r\n                <div class=\"price\">\r\n                    <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.level), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.level), options)))
    + "</span>\r\n                </div>\r\n                <div class=\"progress-bar status-";
  if (helper = helpers.percentage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.percentage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                    <div class=\"color\"></div>\r\n                    <div class=\"back\"></div>\r\n                </div>\r\n                <div class=\"card-limit\">\r\n                    su\r\n                    <span class=\"amount\">&euro; ";
  if (helper = helpers.levelYear) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.levelYear); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> limite annuo massimo\r\n                </div>\r\n            </div>\r\n        </div>\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.customer), "HYPE", options) : helperMissing.call(depth0, "is", (depth0 && depth0.customer), "HYPE", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/login/profile/templates/first.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "fingerprint-login";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <div class=\"logo-container\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPlusCustomer), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <form class=\"auth\">\r\n        <input type=\"hidden\" name=\"checksum\" value=\"";
  if (helper = helpers.checksum) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.checksum); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n\r\n        <div class=\"input-container\">\r\n            <label>Password</label>\r\n            <input type=\"password\" autocomplete=\"off\"\r\n                   class=\"js-validate-element-pin hide-text ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.errorMessage), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" name=\"pin\"\r\n                   placeholder=\"Password\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.errorMessage), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n\r\n        <div class=\"input-container\">\r\n            <div class=\"align-center\">\r\n                <a href=\"#\" class=\"js-submit glb-btn complete\">conferma</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"bottom-block\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.canUseFingerprint), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <br />\r\n            <br />\r\n            <div class=\"align-center\">\r\n                <a href=\"#\" class=\"js-switch-user glb-btn rounded-ghost\">Cambia Utente</a>\r\n            </div>\r\n        </div>\r\n    </form>\r\n\r\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\r\n            <div class=\"logo plus\"></div>\r\n    ";
  }

function program6(depth0,data) {
  
  
  return "\r\n            <div class=\"logo\"></div>\r\n    ";
  }

function program8(depth0,data) {
  
  
  return " error ";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <span class=\"help-inline error\">";
  if (helper = helpers.errorMessage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.errorMessage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "\r\n            <div class=\"font-size-xx-large input-container\"><i class=\"icon-fingerprint\"></i></div>\r\n            <div class=\"align-center font-size-large\">\r\n                Touch ID per HYPE\r\n            </div>\r\n            <div class=\"rememberMe fingerprint\">\r\n                <input style=\"width:15px;\" id=\"useFingerprint\" type=\"checkbox\" checked=\"checked\" name=\"useFingerprint\"/>\r\n                <label for=\"useFingerprint\"></label>\r\n                <div class=\"rememberme-checkbox-label font-size-small\">Autenticami con Touch ID dalla prossima volta</span>\r\n            </div>\r\n            ";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n    <div class=\"logo-container\">\r\n        <div class=\"logo\"></div>\r\n    </div>\r\n\r\n    <form class=\"auth\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.birthDate), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.birthDate), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.email), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.email), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"input-container\">\r\n            <label>PASSWORD</label>\r\n            <input type=\"password\" autocomplete=\"off\" class=\"js-validate-element-pin\" name=\"pin\" id=\"pin\"\r\n                   placeholder=\"Password\"/>\r\n        </div>\r\n\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.birthDate), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.birthDate), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.email), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.email), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        <a href=\"#\" class=\"js-submit glb-btn complete\">effettua login</a>\r\n        <a href=\"#\" class=\"js-reset-password reset-password-button\">Password dimenticata?</a>\r\n\r\n        <div class=\"padding\">\r\n            <div class=\"divider\"></div>\r\n        </div>\r\n        <a href=\"#\" class=\"js-register glb-btn ghost light\">registrati ad Hype</a>\r\n\r\n    </form>\r\n    ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.errorMessage), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <span class=\"help-inline error\">";
  if (helper = helpers.errorMessage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.errorMessage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n        ";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return "\r\n        <span class=\"help-inline error\">Hai inserito dei dati non validi, inserisci la tua data di nascita:</span>\r\n        ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"input-container\">\r\n            <label>Email</label>\r\n            <input type=\"email\" autocomplete=\"off\" class=\"js-validate-element-codiceinternet\" name=\"codiceinternet\"\r\n                   placeholder=\"Email\" value=\"";
  if (helper = helpers.codiceinternet) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.codiceinternet); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        </div>\r\n        ";
  return buffer;
  }

function program22(depth0,data) {
  
  
  return "\r\n        <div class=\"input-container\">\r\n            <label>Data di nascita <span>(gg/mm/aaaa)</span></label>\r\n            <input autocomplete=\"off\" type=\"date\" class=\"js-validate-element-datanascita\" name=\"datanascita\"\r\n                   placeholder=\"Data di nascita (GG/MM/AAAA)\">\r\n        </div>\r\n        ";
  }

function program24(depth0,data) {
  
  
  return "\r\n        <div class=\"rememberMe\" style=\"display: none;\">\r\n            <input id=\"rememberMe\" type=\"checkbox\" value=\"None\" name=\"remember\" checked=\"checked\"/>\r\n            <label for=\"rememberMe\"></label>\r\n            <span>Ricordami</span>\r\n        </div>\r\n        ";
  }

  buffer += "<div class=\"login step1 scrollable ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.canUseFingerprint), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checksum), {hash:{},inverse:self.program(14, program14, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/login/profile/templates/second.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <div class=\"hidden input-container\">\r\n            <label>Codice di sicurezza <span>(via sms)</span></label>\r\n            <input type=\"number\" autocomplete=\"off\" class=\"js-validate-element-pwd js-password hide-text\" name=\"password\" placeholder=\"Codice\">\r\n        </div>\r\n        ";
  }

function program3(depth0,data) {
  
  
  return "\r\n        <div class=\"input-container\">\r\n            <label>Codice di sicurezza <span>(via sms)</span></label>\r\n            <input type=\"number\" autocomplete=\"off\" class=\"js-validate-element-pwd js-password hide-text\" name=\"password\" placeholder=\"Codice\">\r\n        </div>\r\n        ";
  }

function program5(depth0,data) {
  
  
  return "\r\n            <div class=\"js-spinner blue-spinner\">\r\n            </div>\r\n            <p class=\"js-spinner android\">Attesa Verifica<br />Codice via SMS ...</p>\r\n            ";
  }

function program7(depth0,data) {
  
  
  return "\r\n            <a href=\"#\" class=\"js-submit glb-btn complete\">conferma</a>\r\n            ";
  }

function program9(depth0,data) {
  
  
  return "\r\n    <div class=\"block-spinner-container\">\r\n        <a href=\"#\" class=\"js-block-spinner glb-btn ghost light\">\r\n            INSERISCI MANUALMENTE\r\n            <i class=\"icon-edit js-icon-edit\"></i>\r\n        </a>\r\n    </div>\r\n    ";
  }

  buffer += "<div class=\"login step2 scrollable\">\r\n    <div class=\"logo-container\">\r\n        <div class=\"logo\"></div>\r\n    </div>\r\n    <form class=\"auth\">\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAndroid), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"align-center\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAndroid), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n    </form>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAndroid), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/login/walkthrough/templates/dynamic.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<link id=\"dynmic-walkthrough-stylesheet\" href=\"assets/css/wt-dinamico.css\" rel=\"stylesheet\" />\r\n<div class=\"slider gradient\" id=\"walkthrough\">\r\n    <div class=\"wrapper\">\r\n        <div class=\"slide active\">\r\n            <div class=\"logo\">\r\n                <div class=\"t\">\r\n                    <div class=\"c\">\r\n                        <img src=\"assets/images/walkthrough/slide1/logo@2x.png\" alt=\"Hype\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"message\">\r\n                <div class=\"title\">Hype ti dà il benvenuto.</div>\r\n                <div class=\"subtitle hardcore\">HYPE trasforma il tuo modo di gestire il denaro <br>e ti permette di scambiarlo con chi vuoi. <br>Gratuitamente.</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"slide\">\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/slide2/POS@2x.png\" alt=\"\" id=\"pos\" />\r\n                <img src=\"assets/images/walkthrough/slide2/Card@2x.png\" alt=\"\" id=\"card2\" />\r\n                <img src=\"assets/images/walkthrough/slide2/phone@2x.png\" alt=\"\" id=\"phone2\" />\r\n                <img src=\"assets/images/walkthrough/slide2/focus@2x.png\" alt=\"\" id=\"focus2\" />\r\n            </div>\r\n            <div class=\"message opaque\">\r\n                <div class=\"title\">Paga ovunque e controlla<br>le tue spese.</div>\r\n                <div class=\"subtitle hardcore\">Hype è una carta ricaricabile contactless con cui puoi pagare negli e-commerce e nei negozi.<br>Hype ha anche un IBAN con cui poter inviare e ricevere bonifici bancari.</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"slide\">\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/slide3/alessio@2x.png\" alt=\"\" id=\"alessio\" />\r\n                <img src=\"assets/images/walkthrough/slide3/giovanni@2x.png\" alt=\"\" id=\"giovanni\" />\r\n                <img src=\"assets/images/walkthrough/slide3/arrow@2x.png\" alt=\"\" id=\"arrow\" />\r\n                <img src=\"assets/images/walkthrough/slide3/phone3@2x.png\" alt=\"\" id=\"phone3\" />\r\n                <img src=\"assets/images/walkthrough/slide3/focus@2x.png\" alt=\"\" id=\"focus3\" />\r\n            </div>\r\n            <div class=\"message opaque\">\r\n                <div class=\"title\">Scambia denaro <br>con i tuoi contatti.</div>\r\n                <div class=\"subtitle hardcore\">Con HYPE puoi anche ricevere ed inviare denaro <br>in tempo reale, ai contatti della tua rubrica. <br>Senza costi e commissioni.</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"slide\">\r\n            <div class=\"o plain-group\">\r\n                <img src=\"assets/images/walkthrough/slide4/cloud@2x.png\" alt=\"\" id=\"clouds\" />\r\n                <img src=\"assets/images/walkthrough/slide4/plane@2x.png\" alt=\"\" id=\"plane\" />\r\n                <img src=\"assets/images/walkthrough/slide4/trail@2x.png\" alt=\"\" id=\"trail\" />\r\n            </div>\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/slide4/phone4@2x.png\" alt=\"\" id=\"phone4\" />\r\n                <img src=\"assets/images/walkthrough/slide4/focus4@2x.png\" alt=\"\" id=\"focus4\" />\r\n            </div>\r\n            <div class=\"message opaque\">\r\n                <div class=\"title\">Ottieni prima ciò che vuoi.</div>\r\n                <div class=\"subtitle hardcore\">Basta creare un obiettivo per ottenere automaticamente il piano di risparmio personalizzato necessario ad acquistarlo.<br>Senza pensieri.</div>\r\n                <a href=\"#\" class=\"js-close btn-wt\">SCOPRI HYPE</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"pagination\">\r\n    <span class=\"bullet active\"></span>\r\n    <span class=\"bullet\"></span>\r\n    <span class=\"bullet\"></span>\r\n    <span class=\"bullet\"></span>\r\n</div>\r\n<a href=\"#\" class=\"js-close\" id=\"skip\"><img src=\"assets/images/walkthrough/skip@2x.png\" alt=\"\" /></a>";
  });

this["JST"]["assets/js/apps/login/walkthrough/templates/static.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<link id=\"static-walkthrough-stylesheet\" href=\"assets/css/wt-statico.css\" rel=\"stylesheet\" />\r\n\r\n<div class=\"slider gradient\" id=\"walkthrough\">\r\n    <div id=\"wt-page_1\" class=\"wt-page\">\r\n        <div class=\"slide active\">\r\n            <div class=\"logo\">\r\n                <div class=\"t\">\r\n                    <div class=\"c\">\r\n                        <img src=\"assets/images/walkthrough/logo@2x.png\" alt=\"Hype\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"message\">\r\n                <div class=\"title\">Hype ti dà il benvenuto.</div>\r\n                <div class=\"subtitle hardcore\">HYPE trasforma il tuo modo di gestire il denaro <br>e ti permette di scambiarlo con chi vuoi. <br>Gratuitamente.</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"wt-page_2\" class=\"wt-page\">\r\n        <div class=\"slide active\">\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/2.png\" alt=\"\" />\r\n            </div>\r\n            <div class=\"message opaque on\">\r\n                <div class=\"title\">Paga ovunque e controlla<br>le tue spese.</div>\r\n                <div class=\"subtitle hardcore\">Hype è una carta ricaricabile contactless con cui puoi pagare negli e-commerce e nei negozi. Hype ha anche un IBAN con cui poter inviare e ricevere bonifici bancari.</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"wt-page_3\" class=\"wt-page\">\r\n        <div class=\"slide active\">\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/3.png\" alt=\"\" />\r\n            </div>\r\n            <div class=\"message opaque on\">\r\n                <div class=\"title\">Scambia denaro <br>con i tuoi contatti.</div>\r\n                <div class=\"subtitle hardcore\">Con HYPE puoi anche ricevere ed inviare denaro <br>in tempo reale, ai contatti della tua rubrica. <br>Senza costi e commissioni.</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"wt-page_4\" class=\"wt-page\">\r\n        <div class=\"slide active\">\r\n            <div class=\"o\">\r\n                <img src=\"assets/images/walkthrough/4.png\" alt=\"\" />\r\n            </div>\r\n            <div class=\"message opaque on\">\r\n                <div class=\"title\">Ottieni prima ciò che vuoi.</div>\r\n                <div class=\"subtitle hardcore\">Basta creare un obiettivo per ottenere automaticamente il piano di risparmio personalizzato necessario ad acquistarlo.<br>Senza pensieri.</div>\r\n                <a href=\"#\" class=\"btn-wt js-close\">SCOPRI HYPE</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"pagination\">\r\n        <a href=\"#\" class=\"wt-navigate prev\"><img src=\"assets/images/walkthrough/prev.png\"></a>\r\n        <span class=\"bullet active wt-step_1\"></span>\r\n        <span class=\"bullet wt-step_2\"></span>\r\n        <span class=\"bullet wt-step_3\"></span>\r\n        <span class=\"bullet wt-step_4\"></span>\r\n        <a href=\"#\" class=\"wt-navigate next\"><img src=\"assets/images/walkthrough/next.png\"></a>\r\n    </div>\r\n    <a href=\"#\" class=\"js-close\" id=\"skip\"><img src=\"assets/images/walkthrough/skip@2x.png\" alt=\"\" /></a>\r\n\r\n\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/navigation/android/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n                        <li><a class=\"navigate inactive\" id=\"qr\"   data-navigationtrigger=\"qr_reader\" href=\"#\">Paga con QR code<i class=\"icon-logout\"></i></a></li>\r\n                        <li><a class=\"navigate inactive\" id=\"atm\"  data-navigationtrigger=\"geolocalization\" href=\"#\">Nelle vicinanze<i class=\"icon-logout\"></i></a></li>\r\n                        <li><a class=\"navigate inactive\"  id=\"bills\"  data-navigationtrigger=\"pay_bill\" href=\"#\">Paga bollette<i class=\"icon-logout\"></i></a></li>\r\n                    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.customerType), "YOOX", options) : helperMissing.call(depth0, "is", (depth0 && depth0.customerType), "YOOX", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return " ";
  }

function program6(depth0,data) {
  
  
  return "\r\n                <div class=\"section\">\r\n                    <div class=\"inner\">\r\n                        <p class=\"menu-title\">OFFERTE</p>\r\n                        <ul>\r\n                            <li><a class=\"navigate show-deals inactive\" id=\"deals\"   data-navigationtrigger=\"deals:list\" href=\"#\">Le offerte per te</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            ";
  }

function program8(depth0,data) {
  
  
  return "\r\n<a class=\"plus-button js-plus glb-btn rounded-ghost\" href=\"#\">PASSA A HYPE PLUS</a>\r\n";
  }

  buffer += "<!--i class=\"hype-logo icon-hype-logo\"></i-->\r\n<div id=\"userdata-region\" class=\"hype-logo\">\r\n\r\n</div>\r\n<div id=\"menu-navigation-region\">\r\n    <div class=\"main-menu-container\">\r\n        <div class=\"section active\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Attività</p>\r\n                <ul>\r\n                    <li><a class=\"navigate movements\" id=\"movements\" data-navigationtrigger=\"activities\" data-innertrigger=\"movements:list\" href=\"#\">Movimenti</a></li>\r\n                    <li><a class=\"navigate inactive goals\"  id=\"goals\" data-navigationtrigger=\"activities\" data-innertrigger=\"goals:list\" href=\"#\">Obiettivi</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"section\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Trasferisci denaro</p>\r\n                <ul>\r\n                    <li><a class=\"navigate inactive send\" id=\"send\"  data-navigationtrigger=\"hype:payment:new\" href=\"#\">Invia denaro</a></li>\r\n                    <li><a class=\"navigate inactive request\" id=\"request\"  data-navigationtrigger=\"hype:request:new\" href=\"#\">Richiedi denaro</a></li>\r\n                    <li><a class=\"navigate inactive transfer\"  id=\"transfer\"  data-navigationtrigger=\"hype:transfer:new\" href=\"#\">Invia bonifico</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"section\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Pagamenti</p>\r\n                <ul>\r\n                    <li><a class=\"navigate inactive recharge\"  id=\"mobile\"  data-navigationtrigger=\"payments\" data-innertrigger=\"payments:mobile\" href=\"#\">Ricarica telefono</a>\r\n                    </li>\r\n                    <li><a class=\"navigate inactive cards-list\" id=\"cards-list\"  data-navigationtrigger=\"my:cards:list\" href=\"#\">Le mie Carte</a>\r\n                    </li>\r\n                    <li><a class=\"navigate inactive card-recharge\" id=\"card-recharge\"  data-navigationtrigger=\"card:recharge:menu\" href=\"#\">Ricarica HYPE</a>\r\n                    </li>\r\n                    <!-- HYPE WALLET -->\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.wallet), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deals), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(8, program8, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.customerType), "YOOX", options) : helperMissing.call(depth0, "is", (depth0 && depth0.customerType), "YOOX", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["assets/js/apps/navigation/android/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"navigate\" href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/navigation/android/list/templates/userdata.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ");\"";
  return buffer;
  }

  buffer += "<div class=\"backdrop\"></div>\r\n\r\n<a class=\"navigate inactive\" data-navigationtrigger=\"user:home\" href=\"#\">\r\n	<div class=\"user\">\r\n		";
  if (helper = helpers.nickname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nickname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n	</div>\r\n	<div class=\"baloon-container\">\r\n		<div class=\"baloon\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n		</div>\r\n	</div>\r\n</a>\r\n\r\n<a class=\"navigate user-card\" href=\"#\" data-navigationtrigger=\"card:show\" >\r\n	<span class=\"plus-label font-size-x-small color-white\">\r\n		plus\r\n	</span>\r\n</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/navigation/ios/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n                    <li class=\"js-wallet\"><a   id=\"qr\"  class=\"navigate inactive  \" data-navigationtrigger=\"qr_reader\" href=\"#\">Paga con QR code<i class=\"icon-logout\"></i></a></li>\r\n                    <li class=\"js-wallet\"><a  id=\"atm\"  class=\"navigate inactive  \" data-navigationtrigger=\"geolocalization\" href=\"#\">Nelle vicinanze<i class=\"icon-logout\"></i></a></li>\r\n                    <li class=\"js-wallet\"><a   id=\"bills\"  class=\"navigate inactive  \" data-navigationtrigger=\"pay_bill\" href=\"#\">Paga bollette<i class=\"icon-logout\"></i></a></li>\r\n                    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.customerType), "YOOX", options) : helperMissing.call(depth0, "is", (depth0 && depth0.customerType), "YOOX", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return " ";
  }

function program6(depth0,data) {
  
  
  return "\r\n                <div class=\"section js-deals\" data-group=\"3\">\r\n                    <div class=\"inner\">\r\n                        <p class=\"menu-title\">OFFERTE</p>\r\n                        <ul>\r\n                            <li><a  id=\"deals\"   class=\"navigate show-deals inactive\" data-navigationtrigger=\"deals:list\" href=\"#\">Le offerte per te</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            ";
  }

function program8(depth0,data) {
  
  
  return "\r\n    <a  class=\"plus-button js-plus glb-btn rounded-ghost\" href=\"#\">PASSA A HYPE PLUS</a>\r\n";
  }

  buffer += "<div id=\"userdata-region\" class=\"hype-logo\">\r\n</div>\r\n<div id=\"menu-navigation-region\">\r\n    <div class=\"main-menu-container\">\r\n        <div class=\"section active\" data-group=\"0\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Attività</p>\r\n                <ul>\r\n                    <li><a id=\"movements\" class=\"navigate movements\" data-navigationtrigger=\"activities\" data-innertrigger=\"movements:list\" href=\"#\">Movimenti</a></li>\r\n                    <li><a  id=\"goals\"   class=\"navigate inactive goals\" data-navigationtrigger=\"activities\" data-innertrigger=\"goals:list\" href=\"#\">Obiettivi</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"section\" data-group=\"1\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Trasferisci denaro</p>\r\n                <ul>\r\n                    <li><a  id=\"send\"   class=\"navigate inactive send\" data-navigationtrigger=\"hype:payment:new\" href=\"#\">Invia denaro</a></li>\r\n                    <li><a   id=\"request\"  class=\"navigate inactive request\" data-navigationtrigger=\"hype:request:new\" href=\"#\">Richiedi denaro</a></li>\r\n                    <li><a  id=\"transfer\"   class=\"navigate inactive transfer\" data-navigationtrigger=\"hype:transfer:new\" href=\"#\">Invia bonifico</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"section\" data-group=\"2\">\r\n            <div class=\"inner\">\r\n                <p class=\"menu-title\">Pagamenti</p>\r\n                <ul>\r\n                    <li><a  id=\"mobile\"   class=\"navigate inactive recharge\" data-navigationtrigger=\"payments\" data-innertrigger=\"payments:mobile\" href=\"#\">Ricarica telefono</a></li>\r\n                    <li><a   id=\"cards-list\"  class=\"navigate inactive cards-list\" data-navigationtrigger=\"my:cards:list\" href=\"#\">Le mie Carte</a></li>\r\n                    <li><a   id=\"card-recharge\"  class=\"navigate inactive card-recharge\" data-navigationtrigger=\"card:recharge:menu\" href=\"#\">Ricarica HYPE</a></li>\r\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.wallet), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deals), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n<div class=\"floating-arrow\">\r\n</div>\r\n";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(8, program8, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.customerType), "YOOX", options) : helperMissing.call(depth0, "is", (depth0 && depth0.customerType), "YOOX", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/navigation/ios/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"navigate\" href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/navigation/ios/list/templates/userdata.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ");\"";
  return buffer;
  }

  buffer += "<div class=\"backdrop\"></div>\r\n\r\n<a class=\"navigate inactive\" data-navigationtrigger=\"user:home\" href=\"#\">\r\n	<div class=\"user\">\r\n		";
  if (helper = helpers.nickname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nickname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n	</div>\r\n	<div class=\"baloon-container\">\r\n		<div class=\"baloon\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n		</div>\r\n	</div>\r\n</a>\r\n\r\n<a class=\"navigate user-card\" href=\"#\" data-navigationtrigger=\"card:show\" >\r\n	<span class=\"plus-label font-size-x-small color-white\">\r\n		plus\r\n	</span>\r\n</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/contacts/profile/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <a href=\"#\" class=\"icon-menu js-toggle-menu\"></a>\r\n        ";
  }

function program3(depth0,data) {
  
  
  return "\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        ";
  }

function program5(depth0,data) {
  
  
  return "\r\n            <p class=\"contact-title\">Modifica contatto</p>\r\n        ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.transferOnly), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "\r\n                <p class=\"contact-title\">Invia Bonifico</p>\r\n            ";
  }

function program10(depth0,data) {
  
  
  return "\r\n                <p class=\"contact-title\">Invia ad un nuovo contatto</p>\r\n            ";
  }

function program12(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Nome o Nominativo</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input id=\"entity-firstName\" placeholder=\"Nome o Nominativo\" name=\"firstName\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <input id=\"entity-lastName\" name=\"lastName\" type=\"hidden\" />\r\n            ";
  }

function program14(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Nome</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input id=\"entity-firstName\" placeholder=\"Nome\" name=\"firstName\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Cognome</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input id=\"entity-lastName\" placeholder=\"Cognome\" name=\"lastName\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            ";
  }

function program16(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>IBAN</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input id=\"entity-destination\" placeholder=\"IT40S0542811101000000123456\" value=\"\" name=\"destination\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            ";
  }

function program18(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Alias</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input id=\"entity-destination\" placeholder=\"Email, Telefono, IBAN\" value=\"\" name=\"destination\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            ";
  }

function program20(depth0,data) {
  
  
  return "\r\n                <div class=\"check\">\r\n                    <input id=\"check\" type=\"checkbox\" value=\"None\" class=\"js-una-tantum\"/>\r\n                    <label for=\"check\"></label>\r\n                    <span>Salva in rubrica</span>\r\n                </div>\r\n                <br />\r\n                <br />\r\n\r\n                ";
  }

function program22(depth0,data) {
  
  
  return "\r\n                    <a href=\"#\" class=\"glb-btn delete js-back\">Annulla<i class=\"icon-reject\"></i></a>       \r\n                ";
  }

function program24(depth0,data) {
  
  
  return "\r\n                    <a href=\"#\" class=\"glb-btn delete js-delete\">Elimina<i class=\"icon-trash\"></i></a>       \r\n                ";
  }

  buffer += "<div id=\"main-region\">\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.transferOnly), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    </div>\r\n\r\n    <div class=\"money-transfer-form scrollable panel-content\">\r\n        <form>\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.transferOnly), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "            \r\n\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.transferOnly), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n             \r\n            <div class=\"actions\">\r\n                <div class=\"description send-description\">\r\n                    <!--Il nuovo contatto ricever&agrave; la notifica di invio denaro\r\n                    e l'invito di registrazione ad Hype. Il ricevente ha 10\r\n                    giorni per accettare, terminati i quali l'invio di denaro\r\n                    sar&agrave; cancellato.-->\r\n                </div>\r\n                <div class=\"description request-description\">\r\n                    <!--Il nuovo contatto ricever&agrave; la notifica di richiesta denaro\r\n                    e l'invito di registrazione ad Hype. Il ricevente ha 10\r\n                    giorni per accettare, terminati i quali l'invio di denaro\r\n                    sar&agrave; cancellato.-->\r\n                </div>\r\n                <br />\r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                <a href=\"#\" class=\"glb-btn success js-submit\">Conferma<i class=\"icon-accept\"></i></a>         \r\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </div>\r\n\r\n        </form>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/contact_reference.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n<i class=\"icon icon-phone-full\"></i>\r\n";
  }

function program3(depth0,data) {
  
  
  return "\r\n<i class=\"icon icon-mail-full\"></i>\r\n";
  }

function program5(depth0,data) {
  
  
  return "\r\n    <span class=\"isSelected\"></span>\r\n";
  }

  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "phoneNumber", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "phoneNumber", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "email", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "email", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<a class=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>    \r\n\r\n<!--\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.selected), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.selected), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    -->";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/contacts_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                Invia denaro a:<span>";
  if (helper = helpers.query) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.query); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n                <i class=\"icon-send-money\"></i>\r\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                Richiedi denaro a:<span>";
  if (helper = helpers.query) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.query); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n                <i class=\"icon-request-money\"></i>\r\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\r\n<div id=\"js-add-peer\" class=\"add-peer\">\r\n    <div class=\"info-block\">\r\n        <div class=\"icon-block\">\r\n            <i class=\"icon-add\"></i>\r\n        </div>\r\n\r\n        <div class=\"title-line\">\r\n            <h4>Richiedi ad un'altra persona</h4>\r\n            <small>L'importo richiesto verrà diviso</small>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  }

  buffer += "<div id=\"search-area\" class=\"input-field\">\r\n    <h4>A:</h4>\r\n    <div class=\"input-container\">\r\n        <input type=\"text\" class=\"js-search\" placeholder=\"Nome, telefono, email, IBAN\" value=\"";
  if (helper = helpers.query) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.query); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <div class=\"loading-contacts\" style=\"display:none;\"></div>        \r\n        <a href=\"#\" id=\"js-search-peer\" class=\"search-button\">\r\n            <i class=\"search-icon icon-address_book\"></i>\r\n            <small>Contatti</small>\r\n        </a>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"search-result scrollable\" style=\"display:none\">\r\n    <!--<h3 class=\"search-result-title\" style=\"display:none;\">\r\n        <span class=\"title\">Risultati trovati</span>\r\n    </h3>-->\r\n    <div class=\"contacts-list\">\r\n\r\n    </div>\r\n\r\n    <div id=\"\" class=\"send-to-other-peer\">\r\n        <h3>\r\n            <span class=\"title with-result\">Oppure invia ad un altro utente!</span>\r\n            <span class=\"title no-result\">Utente non presente tra i tuoi contatti</span>\r\n            <span class=\"subtitle\">Invia denaro comunque via email, telefono o IBAN</span>\r\n        </h3>\r\n\r\n        <div class=\"info-block\">\r\n            <div class=\"glb-btn complete title-line\" id=\"js-show-form\">\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "payment", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "payment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "request", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "request", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "request", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "request", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/contacts_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    \r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image-block hype with-pic\" style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ");\">\r\n                <i class=\"hype-logo icon-hype-logo\"></i>\r\n            </div>\r\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image-block ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " with-pic\" style=\"background-image: url(";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ");\">\r\n                <div class=\"pin\">\r\n                    <i class=\"icon-phone-full\"></i>\r\n                </div>\r\n            </div>\r\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n    <div class=\"image-block ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        "
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.firstName), (depth0 && depth0.lastName), (depth0 && depth0.nickname), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.firstName), (depth0 && depth0.lastName), (depth0 && depth0.nickname), options)))
    + "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return " hype ";
  }

function program9(depth0,data) {
  
  
  return "\r\n        <i class=\"hype-logo icon-hype-logo\"></i>\r\n        ";
  }

function program11(depth0,data) {
  
  
  return " \r\n        <div class=\"pin\">\r\n            <i class=\"icon-phone-full\"></i>\r\n        </div>\r\n        ";
  }

function program13(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n        <div class=\"title-line\">"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.firstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.firstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.lastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.lastName), options)))
    + "</div>\r\n    ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n        <div class=\"title-line\">"
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.nickname), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.nickname), options)))
    + "</div>\r\n    ";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return "\r\n        <a href=\"#\" class=\"js-favourite\">\r\n            <i class=\"icon-star\"></i>\r\n            <i class=\"icon-star-full\"></i>\r\n        </a>\r\n        ";
  }

function program19(depth0,data) {
  
  
  return "\r\n        <a href=\"#\" class=\"js-favourite\"><i class=\"icon-star-full\"></i></a>\r\n        ";
  }

function program21(depth0,data) {
  
  
  return "\r\n    <div class=\"edit-button\">\r\n        <a href=\"#\" class=\"js-edit\">\r\n            <i class=\"icon-edit\"></i>\r\n        </a>\r\n    </div>\r\n    <!-- a href=\"#\" class=\"js-delete action icon-trash\" style=\" margin-right: 40px; \"></a-->\r\n    ";
  }

  buffer += "<div class=\"info-block ";
  if (helper = helpers.clickable) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.clickable); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imageValue), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.firstName), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"favourite-button\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "hype", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "hype", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "favourite", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "favourite", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "personal", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "personal", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <!--<span class=\"isSelected\"></span>-->\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<ul class=\"contact-reference-list\" style=\"display:none\"></ul>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/dedicated_contacts_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!--<div id=\"search-area\" class=\"input-field\">\r\n    <h4>Cerca tra i contatti</h4>\r\n    <div class=\"input-container\">\r\n        <input type=\"text\" class=\"js-search\" placeholder=\"Nome, telefono, email, IBAN\" value=\"";
  if (helper = helpers.query) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.query); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <div class=\"loading-contacts\" style=\"display:none;\"></div>\r\n    </div>\r\n</div>-->\r\n\r\n<div class=\"\">\r\n    <h3 class=\"search-result-title\" style=\"display:none;\">Risultati trovati:</h3>\r\n    <div class=\"contacts-list\" id=\"";
  if (helper = helpers.listType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.listType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n\r\n    </div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/error.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n<div class=\"contact-wrapper\">\r\n    <div class=\"title\">Hype non ha accesso\r\n        <br> ai tuoi contatti</div>\r\n    <div class=\"label padding\">\r\n        Per inviare e richiedere denaro abilita l'accesso ai Contatti dalle Impostazioni del tuo telefono.\r\n    </div>\r\n   ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.canOpenSettings), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.canOpenSettings), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n  <div class=\"enable-wrapper\">\r\n    <div class=\"enable_contacts\"></div>\r\n  </div>\r\n\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\r\n    <a href=\"#\" class=\"js-open-settings small-btn\">\r\n        abilita contatti\r\n    </a>\r\n    ";
  }

  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.errorCode), "20", options) : helperMissing.call(depth0, "is", (depth0 && depth0.errorCode), "20", options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/facebook_connect.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a href=\"#\" class=\"js-facebook-connect\" >Connettiti a facebook!</a>";
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n        <p>Richiedi denaro</p>\r\n        <span>Seleziona uno o pi&uacute; contatti</span> ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += " ";
  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, ">", (depth0 && depth0.sts), 0, options) : helperMissing.call(depth0, "compare", ">", (depth0 && depth0.sts), 0, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\r\n        <p>Invia Denaro</p>\r\n        <span>Seleziona un contatto</span> ";
  }

function program6(depth0,data) {
  
  
  return "\r\n        <div class=\"insufficient-sts\">\r\n            <p>\"PUOI SPENDERE\" SUPERATO</p>\r\n            <span>Rivedi i tuoi obiettivi</span>\r\n        </div>\r\n        ";
  }

function program8(depth0,data) {
  
  
  return "\r\n    <div class=\"js-share banner-button-top\">\r\n        <!-- <img src=\"assets/images/invite.svg\"> -->\r\n        <div class=\"share-image\"></div>\r\n        <div class=\"center\">\r\n            Invita i tuoi amici a provare HYPE\r\n            <!--<i class=\"icon-close arrow\"></i></a>-->\r\n            <br>\r\n            <a class=\"go\" href=\"#\">Semplice, gratuito, per tutti</a><span class=\"arrow\"> &gt;</span>\r\n        </div>\r\n    </div>\r\n    ";
  }

  buffer += "<div id=\"top-panel\">\r\n    <header class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-menu corner-menu\"></a>\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "request", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "request", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </p>\r\n        <a href=\"#\" class=\"js-new-contact icon-addBuddy right-ctrl\" data-trigger=\"\"></a>\r\n    </header>\r\n</div>\r\n<div class=\"panel-content\">\r\n    <div id=\"loading-panel\">\r\n    </div>\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "payment", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "payment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div id=\"search-area\" class=\"input-field-search\">\r\n        <div class=\"search-container\">\r\n            <i class=\"icon-lens\"></i>\r\n            <input type=\"text\" class=\"js-search\" placeholder=\"Cerca\" value=\"";
  if (helper = helpers.query) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.query); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n            <div class=\"loading-contacts\" style=\"display:none;\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"all-contacts-wrapper search-result ";
  if (helper = helpers.mode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.mode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " scrollable\">\r\n        <div id=\"all-contacts-panel\" class=\"generic-contacts-list\">\r\n        </div>\r\n    </div>\r\n    <div class=\"hypers-favourites-wrapper search-result  ";
  if (helper = helpers.mode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.mode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " scrollable\" style=\"display:none;\">\r\n        <h3 class=\"favourites-panel-header\">Preferiti</h3>\r\n        <div id=\"favourites-panel\" class=\"generic-contacts-list\">\r\n        </div>\r\n        <h3 class=\"hypers-panel-header\">Hypers</h3>\r\n        <div id=\"hypers-panel\">\r\n        </div>\r\n    </div>\r\n    <div class=\"navigation disabled\">\r\n        <ul class=\"tabs\">\r\n            <li class=\"active\">\r\n                <a href=\"#\" class=\"js-show-all\" data-searchtype=\"personal\">Tutti</a>\r\n            </li>\r\n            <li>\r\n                <a href=\"#\" class=\"js-show-hypers\" data-searchtype=\"personal\">Hypers</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <a href=\"#\" class=\"js-secondStep bottom-panel\" style=\"display:none\">\r\n        <h4 class=\"content\"></h4>\r\n        <i class=\"icon-arrow-dx\"></i>\r\n    </a>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/p2p/search/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<td colspan=\"3\">Nessun elemento</td>";
  });

this["JST"]["assets/js/apps/payments/bills/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form>\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        <a href=\"#\" class=\"icon-arrow back\"></a>\r\n        <p>Paga bolletta</p>\r\n    </div>\r\n\r\n    <div class=\"payments\">\r\n        <p class=\"text\">\r\n            Paga bolletta <span class=\"mark js-prevent\" id=\"discriminatore\"></span>\r\n            <span class=\"mark\" data-placeholder=\"codice\" contenteditable=\"true\" id=\"codeline\">codice</span> di\r\n            <span class=\"mark js-prevent\" id=\"importo\">0</span><span>€</span> al conto postale\r\n            <br />\r\n            <span class=\"mark\" data-placeholder=\"conto postale\" contenteditable=\"true\" id=\"contopostale\">conto postale</span>\r\n            <br />\r\n            in data\r\n            <span contenteditable=\"true\" class=\"mark data\" id=\"data\">";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </p>\r\n\r\n\r\n\r\n        <a href=\"#\" class=\"btn btn-small js-confirm full-width-btn fixed-bottom-0\">\r\n            <span class=\"icon-accept\"></span>Conferma\r\n        </a>\r\n    </div>\r\n    <div id=\"form-region\">\r\n        <input id=\"input-codeline\" name=\"codeline\" type=\"hidden\" value=\"";
  if (helper = helpers.codeline) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.codeline); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <input id=\"input-data\" name=\"data\" type=\"hidden\" value=\"";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <input id=\"input-contopostale\" name=\"contopostale\" type=\"hidden\" value=\"";
  if (helper = helpers.contopostale) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.contopostale); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <input id=\"input-importo\" name=\"importo\" type=\"hidden\" value=\"";
  if (helper = helpers.importo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.importo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        <input id=\"input-discriminatore\" name=\"discriminatore\" type=\"hidden\" value=\"";
  if (helper = helpers.discriminatore) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.discriminatore); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div> \r\n    <div id=\"result-region\"></div>\r\n    <div id=\"keyboard-region\"></div>\r\n</form>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/payments/mobile_recharge/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form>\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        <a href=\"#\" class=\"icon-menu toggle-menu\"></a>\r\n        <p>Ricarica telefono</p>\r\n    </div>\r\n\r\n    <div class=\"payments\">\r\n        <p class=\"text\">\r\n            Ricarica il <input type=\"number\" name=\"numcell\" id=\"numcell\" class=\"phone-number\" placeholder=\"Numero\" /> della\r\n            <span class=\"mark\" id=\"operators\"></span> con\r\n            <span class=\"mark\" id=\"cuts\"></span> &euro;\r\n            <span id=\"balance\"></span>\r\n        </p>\r\n        <div class=\"align-center\">\r\n            <a href=\"#\" class=\"js-submit glb-btn success\">\r\n                Continua <span class=\"icon-accept\"></span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n\r\n    <input type=\"hidden\" name=\"manager\" />\r\n    <input type=\"hidden\" name=\"amount\" />\r\n</form>\r\n\r\n<div class=\"js-result\"></div>\r\n";
  });

this["JST"]["assets/js/apps/payments/mobile_recharge/templates/resume.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "\r\n<div class=\"modal-dialog resume-dialog\">\r\n	<div class=\"backdrop\"></div>\r\n	<div class=\"overdrop\">\r\n		<div class=\"top-title\">\r\n			Stai ricaricando di\r\n		</div>\r\n\r\n		<div class=\"total-amount\">\r\n			"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + " \r\n		</div>\r\n\r\n		<div class=\"description\">\r\n			il numero <span class=\"reference\">"
    + escapeExpression((helper = helpers.mobilePhoneNumber || (depth0 && depth0.mobilePhoneNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.phoneNumber), options) : helperMissing.call(depth0, "mobilePhoneNumber", (depth0 && depth0.phoneNumber), options)))
    + "</span><br/>\r\n			dell&apos;operatore <span class=\"reference\">";
  if (helper = helpers.operatorName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.operatorName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n		</div>\r\n\r\n		<div class=\"button-container\">\r\n            <a href=\"#\" class=\"glb-btn success js-confirm\">Conferma<i class=\"icon-accept\"></i></a>\r\n        </div>\r\n\r\n		<div class=\"bottom-box\">\r\n			<div class=\"close-button\">\r\n				<a href=\"#\" class=\"js-cancel\">\r\n					<i class=\"icon-close\"></i>\r\n				</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/user/changePin/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-dialog auth-dialog\">\r\n    <div class=\"backdrop\"></div>\r\n    <div class=\"overdrop\">\r\n        <div class=\"top-title\">\r\n            Cambia Password\r\n        </div>\r\n\r\n        <form class=\"control-group auth\">\r\n\r\n            <div class=\"separator\"></div>\r\n             \r\n            <label>Vecchia password</label>\r\n            <div class=\"input-container\">\r\n                <input type=\"password\" autocomplete=\"off\" placeholder=\"Vecchia password\" class=\"js-validate-element-Oldpin js-input\" data-target=\"Oldpin\" name=\"Oldpin\" id=\"js-Oldpin\" />\r\n            </div> \r\n\r\n            <label>Nuova password</label>\r\n            <div class=\"input-container\">\r\n                <input type=\"password\" autocomplete=\"off\" placeholder=\"Nuova password\" class=\"js-validate-element-Newpin js-input\" data-target=\"Newpin\" name=\"Newpin\" id=\"js-Newpin\" />\r\n            </div> \r\n\r\n            <label>Conferma nuova password</label>\r\n            <div class=\"input-container\">\r\n                <input type=\"password\" autocomplete=\"off\" placeholder=\"Conferma nuova password\" class=\"js-validate-element-Newpinconfirm js-input\" data-target=\"Newpinconfirm\" name=\"Newpinconfirm\" id=\"js-Newpinconfirm\" />\r\n            </div> \r\n            <div class=\"separator\"></div>\r\n        </form>\r\n\r\n        <a href=\"#\" class=\"glb-btn success js-submit\">Conferma<i class=\"icon-accept\"></i></a>\r\n\r\n        <div class=\"bottom-box\">\r\n            <div class=\"close-button\">\r\n                <a href=\"#\" class=\"js-cancel\">\r\n                    <i class=\"icon-close\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/user/help/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    <p>AIUTO DI HYPE</p>\r\n</header>\r\n<div class=\"panel-content scrollable\">\r\n	<div class=\"help-container padding\">\r\n        <div class=\"img_big\"></div>\r\n        <h1>Come possiamo aiutarti?</h1>\r\n        <p class=\"page-description\"> Per qualsiasi necessità, ti aspetta un gruppo affiatato di persone pronte a darti una mano in tempo reale.</p>\r\n\r\n        <div>\r\n            <a href=\"#\" class=\"glb-btn ghost js-send-log\">\r\n                AIUTACI A MIGLIORARE L'APP\r\n                <i class=\"icon-mail-full small\"></i>\r\n            </a>\r\n        </div>\r\n		<div>\r\n            <a href=\"#\" class=\"glb-btn ghost js-phone\">\r\n                CHIAMACI\r\n                <i class=\"icon-phone-full small\"></i>\r\n            </a>\r\n	    </div>\r\n	    <div>\r\n	        <a href=\"#\" class=\"glb-btn ghost js-mail\">\r\n	            SCRIVI UNA E-MAIL\r\n	            <i class=\"icon-mail-full small\"></i>\r\n	        </a>\r\n	    </div>\r\n	    <div>\r\n            <a href=\"#\" class=\"glb-btn ghost js-faq\">\r\n                F.A.Q.\r\n                <i class=\"icon-faq small\"></i>\r\n            </a>\r\n	    </div>\r\n	    <div class=\"app-version padding\">\r\n			Hype &copy; - Versione ";
  if (helper = helpers.appVersion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appVersion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<br/>  \r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/navigation/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"menu-in\">\r\n	<a href=\"#\" class=\"icon-menu toggle-menu\"></a>\r\n	<p>Il mio Hype</p>\r\n</header>\r\n<div class=\"panel-content scrollable\">\r\n	<div id=\"resume-region\" class=\"user-resume\"></div>\r\n	<div id=\"actions-region\" class=\"user-resume-actions\"></div> \r\n    <div id=\"image-profile-region\" class=\"\"></div>\r\n	<div class=\"clearfix\"></div>\r\n\r\n    \r\n	<div class=\"padding\">\r\n		<a class=\"glb-btn archive js-logout\">Logout<i class=\"icon-logout\"></i></a>\r\n	</div> \r\n</div>\r\n";
  });

this["JST"]["assets/js/apps/user/navigation/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\r\n<div>\r\n    <a href=\"#\" class=\"navigate\" data-trigger=\"user:profile\" data-event=\"profile\">\r\n        <img class=\"image\" src=\"assets/images/penna-occhiali.svg\">\r\n        <span class=\"text\">Gestisci Profilo</span>\r\n    </a>\r\n</div>\r\n<div>\r\n    <a href=\"#\" class=\"navigate\" data-trigger=\"user:stats\" data-event=\"navigate\">\r\n        <img class=\"image\" src=\"assets/images/statistiche.svg\">\r\n        <span class=\"text\">Statistiche</span>\r\n    </a>\r\n</div>\r\n<div>\r\n    <a href=\"#\" class=\"navigate\" data-trigger=\"user:coordinates\" data-event=\"navigate\">\r\n        <img class=\"image\" src=\"assets/images/documento.svg\">\r\n        <span class=\"text\">Coordinate Bancarie</span>\r\n    </a>\r\n</div>\r\n<div>\r\n    <a href=\"#\" class=\"navigate\" data-trigger=\"user:notifications\" data-event=\"navigate\">\r\n        <img class=\"image\" src=\"assets/images/notifica.svg\">\r\n        <span class=\"text\">Imposta Notifiche</span>\r\n    </a>\r\n</div>\r\n<div>\r\n    <a href=\"#\" class=\"js-sellabox\" data-trigger=\"user:coordinates\" data-event=\"navigate\">\r\n        <img class=\"image\" src=\"assets/images/documents.svg\">\r\n        <span class=\"text\">Documenti</span>\r\n    </a>\r\n</div>\r\n<div class=\"\">\r\n    <a href=\"#\" class=\"js-help\" data-trigger=\"user:notifications\" data-event=\"navigate\">\r\n        <img class=\"image\" src=\"assets/images/help.svg\">\r\n        <span class=\"text\">Help</span>\r\n    </a>\r\n</div> ";
  });

this["JST"]["assets/js/apps/user/navigation/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\">\r\n    <img class=\"image\" src=\"http://placehold.it/50x50\">\r\n    <span class=\"text\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/navigation/list/templates/resumePanel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"baloon-image-container loading show-profile\">\r\n            <div id=\"user-resume-image\" class=\"baloon\" style=\"background-image: url(data:image/png;base64,";
  if (helper = helpers.imageBase64) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageBase64); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")\">\r\n            </div>\r\n        </div>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"baloon-image-container show-profile\">\r\n            <div id=\"user-resume-image\" class=\"baloon\" style=\"background-image: url(data:image/png;base64,";
  if (helper = helpers.imageBase64) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageBase64); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")\">\r\n            </div>\r\n        </div>\r\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isYooxCustomer), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "\r\n            <p>\r\n                <a class=\"global-btn rounded-ghost js-plus\" href=\"#\">\r\n                    PASSA A HYPE PLUS\r\n                </a>\r\n            </p>\r\n            ";
  }

  buffer += "<div class=\"main-user-picture-container\">\r\n    <div id=\"main-user-picture\">\r\n    </div>\r\n    <div class=\"overlay-gradient\">\r\n    </div>\r\n</div>\r\n<div id=\"main-user-data\">\r\n    <div class=\"user-image-container\">\r\n        <div class=\"image\">\r\n            <div id=\"image-region\" class=\"camera-block\">\r\n            </div>\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loadingImage), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"username\">\r\n        <p class=\"nickname\">\r\n            ";
  if (helper = helpers.nickname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nickname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n        </p>\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPlusCustomer), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"item\">\r\n        <span class=\"number\">";
  if (helper = helpers.expenses) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.expenses); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        <span class=\"text\">Spese</span>\r\n    </div>\r\n    <div class=\"item\">\r\n        <span class=\"number\">";
  if (helper = helpers.incomes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.incomes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        <span class=\"text\">Entrate</span>\r\n    </div>\r\n    <div class=\"item\">\r\n        <span class=\"number\">";
  if (helper = helpers.goals) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.goals); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        <span class=\"text\">Obiettivi</span>\r\n    </div>\r\n    <p class=\"info-text\">Dati relativi al mese corrente</p>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/user/notifications/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"menu-in\">\r\n	<a href=\"#\" class=\"icon-arrow back\"></a>\r\n	<p>Impostazioni notifiche</p>\r\n</header>\r\n\r\n<div class=\"js-content panel-content scrollable notification-list\">\r\n	\r\n</div>\r\n\r\n<div class=\"floating-add-button\">\r\n	<div class=\"add-goal-bar\">\r\n		<a href=\"#\" class=\"js-new add-char\">\r\n		</a>\r\n	</div>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/notifications/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a href=\"#\" class=\"delete icon-trash\"></a>";
  });

this["JST"]["assets/js/apps/user/notifications/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"empty-view\">\r\n	<p>\r\n		Non sono presenti notifiche.<br/>\r\n		Perché non ne crei una?\r\n	</p>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/notifications/profile/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"backdrop\"></div>\r\n<div class=\"overdrop\">\r\n    <p class=\"top-title\">Seleziona un'opzione</p>\r\n    <ul class=\"combo-list scrollable align-left\">\r\n    	\r\n    </ul>\r\n    <div class=\"bottom-box\">\r\n        <a href=\"#\" class=\"js-close close-button\"><i class=\"icon-close\"></i></a>\r\n    </div>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/notifications/profile/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\" data-key=\"";
  if (helper = helpers.key) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.key); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"js-choice ";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \">\r\n    <span class=\"icon-accept\"></span> ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</a>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/notifications/profile/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    <p>Imposta Notifica</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div id=\"form-region\" class=\"notification-form text\">\r\n        <p>Avvertimi quando</p>\r\n\r\n        <a class=\"0 subject mark\" data-level=\"0\" href=\"#\"></a>\r\n\r\n        <a class=\"1 subject mark\" data-level=\"1\" href=\"#\"></a>\r\n\r\n        <a class=\"2 subject mark\" data-level=\"2\" href=\"#\"></a>\r\n\r\n        <a class=\"3 subject mark\" data-level=\"3\" href=\"#\"></a>\r\n\r\n        <input type=\"number\" class=\"hidden-input\" name=\"amount\" id=\"amount\" />\r\n\r\n        <div class=\"notification-instructions\">\r\n            fai TAP sulle voci evidenziate per impostare le notifiche\r\n        </div>\r\n    </div>\r\n    <div class=\"padding align-center\">\r\n        <a href=\"#\" class=\"js-submit start-action glb-btn success\">\r\n            ATTIVA NOTIFICA\r\n            <i class=\"icon-accept \"></i>\r\n        </a>\r\n    </div>\r\n    <div id=\"options-region\">\r\n    </div>\r\n</div>\r\n<div id=\"keyboard-region\" class=\"keyboard-box-triggers\">\r\n\r\n</div>";
  });

this["JST"]["assets/js/apps/user/profile/templates/activate_alias.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n    <p>Attivazione nuovo numero</p>\r\n    ";
  }

function program3(depth0,data) {
  
  
  return "\r\n    <p>Attiva nuova email</p>\r\n    ";
  }

function program5(depth0,data) {
  
  
  return "\r\n            <p>Inserisci il codice ricevuto via sms</p>\r\n            ";
  }

function program7(depth0,data) {
  
  
  return "\r\n            <p>Inserisci il codice ricevuto via email</p>\r\n            ";
  }

  buffer += "<div class=\"menu-in\" id=\"command-region\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "M", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "M", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    \r\n</div>\r\n<div class=\"activate-form panel-content scrollable\">\r\n    <div class=\" input-wrapper\">\r\n        <div class=\"otp-block\">\r\n\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "M", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "M", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            <div class=\"otp-container\">\r\n                <input id=\"entity-otp\" class=\"js-validate-element-otp\" placeholder=\"Codice\" name=\"otp\" type=\"text\"></input>\r\n            </div>\r\n        </div>\r\n\r\n        <div id=\"keyboard-region\" class=\"keyboard-container\">\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"margin-top\">\r\n        <a href=\"#\" class=\"js-submit glb-btn success\">\r\n            Conferma <i href=\"#\" class=\"icon-accept\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"page-description margin-top\">\r\n        Il codice inviato è valido 24 ore. <br> Se hai inserito un numero o un indirizzo e-mail non valido, il codice non sarà più attivo trascorso questo tempo. \r\n    </div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/profile/templates/alias_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "mail";
  }

function program3(depth0,data) {
  
  
  return "phone";
  }

function program5(depth0,data) {
  
  
  return "E-MAIL PRINCIPALE <span class=\"caption\">(login)</span>";
  }

function program7(depth0,data) {
  
  
  return "NUMERO DI TELEFONO PRINCIPALE";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n<h4>\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</h4>\n";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "SECONDARIE";
  }

function program12(depth0,data) {
  
  
  return "SECONDARI";
  }

function program14(depth0,data) {
  
  
  return " collapsed";
  }

function program16(depth0,data) {
  
  
  return " hidden";
  }

function program18(depth0,data) {
  
  
  return "INDIRIZZO E-MAIL";
  }

function program20(depth0,data) {
  
  
  return "NUMERO DI TELEFONO";
  }

function program22(depth0,data) {
  
  
  return "Nuovo indirizzo email";
  }

function program24(depth0,data) {
  
  
  return "Nuovo numero di telefono";
  }

  buffer += "<h4>\n    <span class=\"icon-";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-full\"></span> ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</h4>\n<div class=\"default-alias\">\n    ";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <i class=\"icon-accept\"></i>\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.anyAliases), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"alias-list";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.anyAliases), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n</div>\n<div>\n    <button class=\"js-add-alias btn-add-alias";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.maxReached), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">AGGIUNGI ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n    <div class=\"js-max-reached color-gray-dark ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.maxReached), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        Hai raggiunto il numero massimo di indirizzi registrabili. Rimuovi i secondari per aggiungerne altri.\n    </div>\n</div>\n<div class=\"new-alias-wrapper hidden\">\n    <div class=\"new-alias-header\">AGGIUNGI ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"field-editable restyled\">\n        <input placeholder=\"";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "E", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "E", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" class=\"js-new-alias js-validate-element-alias\" name=\"new-alias\" type=\"text\">\n        <button class=\"js-submit-alias btn-abs-right\" disabled>SALVA</button>\n    </div>\n</div>\n";
  return buffer;
  });

this["JST"]["assets/js/apps/user/profile/templates/alias_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return " verified";
  }

function program3(depth0,data) {
  
  
  return "<i class=\"icon-accept\"></i>";
  }

function program5(depth0,data) {
  
  
  return "<button class=\"js-activate btn-abs-right\"> VERIFICA </button>";
  }

function program7(depth0,data) {
  
  
  return " hidden";
  }

  buffer += "<div class=\"alias-list-item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n    <span class=\"item-value\">";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"lower-buttons";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n    	<a href=\"#\" class=\"js-set-primary btn-set-primary\">Imposta come principale</a> <a href=\"#\" class=\"js-remove btn-remove\">Rimuovi</a>\r\n    </div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/profile/templates/alias_profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n	<span class=\"icon-phone-full\"></span>\r\n	<input type=\"text\" name=\"alias\" id=\"entity-alias\" class=\"js-validate-element-alias\" placeholder=\"numero di telefono\" />\r\n	";
  }

function program3(depth0,data) {
  
  
  return "\r\n	<span class=\"icon-mail-full\"></span>\r\n	<input type=\"text\" name=\"alias\" id=\"entity-alias\" class=\"js-validate-element-alias\" placeholder=\"email\" />\r\n	";
  }

  buffer += "<div class=\"field-editable\">\r\n	";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.aliasType), "M", options) : helperMissing.call(depth0, "is", (depth0 && depth0.aliasType), "M", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n	<span class=\"action\">\r\n		<a href=\"#\" class=\"js-submit-alias icon-save-small\"></a>\r\n		<a href=\"#\" class=\"js-close icon-close-small\"></a>    \r\n	</span>\r\n\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/profile/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"menu-in\" id=\"command-region\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    <p>Gestisci Profilo</p>\r\n</div>\r\n<div id=\"form-region\" class=\"user-form panel-content scrollable\">\r\n    <form>\r\n        <div class=\"field-editable\">\r\n            <span class=\"icon-user-full\"></span>\r\n            <!-- nickname, rimpiazza first e second name -->\r\n            <input id=\"entity-nickname\" placeholder=\"Nickname\" name=\"nickname\" type=\"text\" />\r\n        </div>\r\n        <div id=\"email-aliases\" class=\"aliases\">\r\n        </div>\r\n        <div id=\"phone-aliases\" class=\"aliases\">\r\n        </div>\r\n        <div id=\"new-alias\"></div>\r\n        <p class=\"title\">Informazioni Personali</p>\r\n        <div class=\"field\">\r\n            <span class=\"icon-pin-full\"></span>\r\n            <span>";
  if (helper = helpers.address) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.address); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        <div class=\"field\">\r\n            <span class=\"icon-marker-full\"></span>\r\n            <span>";
  if (helper = helpers.zipCode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.zipCode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        <div class=\"field\">\r\n            <span class=\"icon-gps-full\"></span>\r\n            <span>";
  if (helper = helpers.city) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.city); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        <div class=\"field alternative-font\">\r\n            Per modificare le informazioni di residenza contatta l’Assistenza nella sezione Help.\r\n        </div>\r\n    </form>\r\n    <div class=\"padding align-center\">\r\n        <!--<a href=\"#\" class=\"js-submit start-action glb-btn success\">\r\n            Salva\r\n            <i class=\"icon-accept \"></i>\r\n        </a>-->\r\n        <div class=\"separator-line\"></div>\r\n        <a href=\"#\" class=\"js-changepin glb-btn ghost\">\r\n            Cambia Password\r\n        </a>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/apps/user/sellabox/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"menu-in detailed\">\r\n	<a href=\"#\" class=\"icon-arrow back\"></a>\r\n	<p>Documenti Hype</p>\r\n	<span>Contratto, privacy, ecc...</span>\r\n</header>\r\n\r\n<div class=\"js-content panel-content scrollable documents-list\">\r\n	\r\n</div>";
  });

this["JST"]["assets/js/apps/user/sellabox/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"icon\"></div>\n<div class=\"date\">\n	";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n</div>\n<div class=\"title\">\n	";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/sellabox/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"empty-view\">\r\n	<p>\r\n		Al momento non sono presenti documenti\r\n	</p>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/stats/templates/chart.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>\r\n    <i class=\"icon-balance\"></i>Il saldo della tua carta\r\n</h2>\r\n<div class=\"graph\">\r\n    <span class=\"y axis\"></span>\r\n    <div class=\"linea-div\"></div>\r\n    <div class=\"graph-box\">\r\n        <div class=\"graph-rect\">\r\n            <span class=\"graph-date\"></span>\r\n            <span class=\"graph-value\"></span>\r\n        </div>\r\n        <div class=\"graph-triangle\"></div>\r\n    </div>\r\n    <div id=\"chart\" class=\"user-stats-box\"></div>\r\n</div>\r\n\r\n<div class=\"obj-magnet-with-two-side-items stats-resume no-center\">\r\n    <div class=\"block prev\">\r\n        <div class=\"amount-left js-show-pie active\" data-target=\"incomesResume\">\r\n            <!--p class=\"stats-amount income\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.incomesResume)),stack1 == null || stack1 === false ? stack1 : stack1.totalAmount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"euro\">€</span></p-->\r\n            <a href=\"#\" class=\"stats-link\">entrate</a>\r\n        </div>\r\n    </div>\r\n    <div class=\"block center\"></div>\r\n    <div class=\"block next\">\r\n        <div class=\"amount-right js-show-pie\" data-target=\"outcomesResume\">\r\n            <!--p class=\"stats-amount outcome\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.outcomesResume)),stack1 == null || stack1 === false ? stack1 : stack1.totalAmount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"euro\">€</span></p-->\r\n            <a href=\"#\" class=\"stats-link\">uscite</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/stats/templates/commands.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"obj-magnet-with-two-side-items stats-user-actions-container\">\r\n    <div class=\"block prev\">\r\n        <a href=\"#\" data-action=\"subtract\" class=\"js-month prev\">\r\n            <i class=\"icon-smallArrowSx\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"block center\">\r\n        <p class=\"js-monthname\">mese</p>\r\n    </div>\r\n    <div class=\"block next\">\r\n        <a href=\"#\" data-action=\"add\" class=\"js-month next\">\r\n            <i class=\"icon-smallArrowDx\"></i>\r\n        </a>\r\n    </div>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/stats/templates/in_out.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!--\r\n";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n-->\r\n<div class=\"graph\">\r\n	<span class=\"y axis\"></span>\r\n	<div class=\"linea-div\"></div>\r\n	<div class=\"graph-box\">\r\n		<div class=\"graph-rect\">\r\n			<span class=\"graph-date\"></span>\r\n			<span class=\"graph-value\"></span>\r\n		</div>\r\n		<div class=\"graph-triangle\"></div>\r\n	</div>\r\n	<div id=\"barchart\" class=\"type-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/stats/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    <p>Statistiche</p>\r\n</header>\r\n<div class=\"panel-content scrollable background-color-midnight-lightest\">\r\n	<div id=\"commands-region\"></div>\r\n	<div id=\"chart-region\"></div>\r\n	<div id=\"in-out-region\"></div>\r\n	<div id=\"pie-region\" class=\"donuts-details\"></div>\r\n</div>";
  });

this["JST"]["assets/js/apps/user/stats/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<span class=\"category-line ";
  if (helper = helpers.clz) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.clz); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\r\n<span class=\"category-name\">";
  if (helper = helpers.categoryName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.categoryName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n<span class=\"category-amount price small\">\r\n	<span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "</span>\r\n</span>";
  return buffer;
  });

this["JST"]["assets/js/apps/user/stats/templates/pie.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n        <h2>Le tue categorie di spesa</h2>\r\n    ";
  }

function program3(depth0,data) {
  
  
  return "\r\n        <h2>Le tue categorie di entrata</h2>\r\n    ";
  }

  buffer += "<div class=\"\">\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), "outcomesResume", options) : helperMissing.call(depth0, "is", (depth0 && depth0.type), "outcomesResume", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	<div class=\"stats-month-resume ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n		\r\n		<div class=\"chart-container\">\r\n			<div id=\"pie\" class=\"pie-chart\"></div>\r\n\r\n			<div class=\"pie-price\">\r\n\r\n				<div class=\"price\">\r\n					<span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.totalAmount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.totalAmount), options)))
    + "</span>\r\n				</div>\r\n			</div>\r\n\r\n			<ul id=\"list\" class=\"pie-details\"></ul>\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/authorize/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n            <label>Password</label>\r\n            <div class=\"input-container\">\r\n                <input type=\"password\" autocomplete=\"off\" placeholder=\"Password\" class=\"js-input\" data-target=\"pin\" name=\"pin\" id=\"js-pin\" />\r\n            </div>\r\n            ";
  }

function program3(depth0,data) {
  
  
  return "\r\n            <label>Codice di sicurezza via sms</label>\r\n            <div class=\"input-container\">\r\n                <input type=\"text\" autocomplete=\"off\" placeholder=\"Codice\" class=\"js-input\" data-target=\"pwd\" name=\"pwd\" id=\"js-pwd\" />\r\n            </div>\r\n            ";
  }

  buffer += "<div class=\"modal-dialog auth-dialog\">\r\n    <div class=\"backdrop\"></div>\r\n    <div class=\"overdrop scrollable\">\r\n        <div class=\"top-title\">\r\n            Autorizzazione richiesta\r\n        </div>\r\n        \r\n        <form class=\"control-group auth\">\r\n\r\n            <div class=\"separator\"></div>\r\n\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.pin), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.pin), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            <div class=\"separator\"></div>\r\n\r\n            ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.password), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.password), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            <div class=\"separator\"></div>\r\n        </form>\r\n\r\n        <a href=\"#\" class=\"glb-btn success js-submit\">Conferma<i class=\"icon-accept\"></i></a>\r\n\r\n        <div class=\"bottom-box\">\r\n            <div class=\"close-button\">\r\n                <a href=\"#\" class=\"js-cancel\">\r\n                    <i class=\"icon-close\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/combo/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"backdrop\"></div>\r\n<div class=\"overdrop\">\r\n    <div class=\"top-title\">Seleziona</div>\r\n    <ul class=\"combo-list scrollable\"></ul>\r\n    <div class=\"bottom-box\">\r\n        <div class=\"close-button\">\r\n            <a href=\"#\" class=\"js-cancel\">\r\n                <i class=\"icon-close\"></i>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>";
  });

this["JST"]["assets/js/common/combo/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  });

this["JST"]["assets/js/common/combo_old/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n\r\n    <input type=\"text\" name=\"";
  if (helper = helpers.input) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.input); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"hidden-input hidden\" />\r\n\r\n\r\n<div class=\"items confirmation-dialog-safe hidden\">\r\n\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/combo_old/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h3>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>";
  return buffer;
  });

this["JST"]["assets/js/common/confirm/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image top-mage ";
  if (helper = helpers.topImage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.topImage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                &nbsp;\r\n            </div>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " ";
  if (helper = helpers.header) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.header); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return " Attenzione ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image ";
  if (helper = helpers.image) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                &nbsp;\r\n            </div>\r\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"description\">\r\n            ";
  if (helper = helpers.subDescription) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subDescription); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\r\n        <div class=\"bottom-box\">\r\n            <div class=\"close-button js-cancel\">\r\n                <a href=\"#\">\r\n                    <i class=\"icon-close\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n        ";
  }

  buffer += "<div class=\"modal-dialog ";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"backdrop\"></div>\r\n    <div class=\"overdrop\">\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.topImage), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"top-title\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.header), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div class=\"title\">\r\n            ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div class=\"description\">\r\n            ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.image), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subDescription), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"button-container\">\r\n            <a href=\"#\" class=\"confirm-button js-confirm\">\r\n                ";
  if (helper = helpers.button) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.button); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </a>\r\n        </div>\r\n        <div class=\"button-container deny-container\">\r\n            <a href=\"#\" class=\"js-cancel glb-btn delete\">\r\n                ";
  if (helper = helpers.deny) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.deny); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </a>\r\n        </div>\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideCross), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/coordinates/templates/email.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function";


  buffer += "<div class=\"backdrop\"></div>\r\n<div class=\"overdrop\">\r\n    <div class=\"top-title\">Attenzione</div>\r\n    <div class=\"title\">\r\n        ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"description\">\r\n        ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <form>\r\n        <div class=\"input-container js-firstName-container\">\r\n            <input type=\"email\" id=\"entity-email\" name=\"email\" />\r\n        </div>\r\n    </form>\r\n    <a href=\"#\" class=\"confirm-button js-confirm\">\r\n            ";
  if (helper = helpers.button) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.button); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </a>\r\n    <div class=\"bottom-box\">\r\n        <a href=\"#\" class=\"close-button js-cancel\">\r\n            <i class=\"icon-close\"></i>\r\n        </a>\r\n    </div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/coordinates/templates/profile.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\r\n    <p>COORDINATE IBAN PER BONIFICO</p>\r\n    ";
  }

function program3(depth0,data) {
  
  
  return "\r\n    <p>Coordinate</p>\r\n    ";
  }

function program5(depth0,data) {
  
  
  return "\r\n    <div class=\"page-description\">\r\n        Ecco le coordinate del tuo conto HYPE: puoi\r\n        inviarle via email per avere i dati necessari ad\r\n        effettuare un bonifico.\r\n    </div>\r\n    ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow back\"></a>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recharge), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n\r\n<!-- TODO: aggiungere panel -->\r\n<div id=\"form-region\" class=\"coordinate full-width-list panel-content scrollable\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.recharge), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"field line\">\r\n        <span class=\"title\">Codice paese</span>\r\n        <span class=\"value\">";
  if (helper = helpers.countryCode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.countryCode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">Cin europeo</span>\r\n        <span class=\"value\">";
  if (helper = helpers.europeanCin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.europeanCin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">Cin</span>\r\n        <span class=\"value\">";
  if (helper = helpers.cin) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cin); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">Abi</span>\r\n        <span class=\"value\">";
  if (helper = helpers.abi) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.abi); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">Cab</span>\r\n        <span class=\"value\">";
  if (helper = helpers.cab) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cab); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">accountNumber</span>\r\n        <span class=\"value\">";
  if (helper = helpers.accountNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.accountNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"field line\">\r\n        <span class=\"title\">iban</span>\r\n        <span class=\"value\">";
  if (helper = helpers.iban) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.iban); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n    </div>\r\n    <div class=\"actions\">\r\n        <a href=\"#\" class=\"glb-btn complete js-send-mail\">\r\n            Spedisci via mail <i class=\"icon-mail\"></i>\r\n        </a>\r\n    </div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/deals/list/templates/deal_category.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  return escapeExpression((helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.name), 20, options) : helperMissing.call(depth0, "truncate", (depth0 && depth0.name), 20, options)));
  });

this["JST"]["assets/js/common/deals/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-menu toggle-menu\"></a>\r\n    <p>LE OFFERTE PER TE</p>\r\n</div>\r\n<div id=\"top-panel-region\"></div>\r\n<div id=\"list-region\" class=\"panel-content scrollable\"></div> ";
  });

this["JST"]["assets/js/common/deals/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"deals-list\"></div>";
  });

this["JST"]["assets/js/common/deals/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"padder\">\r\n    <div class=\"deal-logo\">\r\n        <img src=\"\" />\r\n    </div>\r\n    <div class=\"deal-img\">\r\n        <img src=\"\" />\r\n    </div>\r\n    <div class=\"deal-categories deals-generic\">\r\n    </div>\r\n    <div class=\"deal-title deals-generic\">\r\n        "
    + escapeExpression((helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.name), 50, options) : helperMissing.call(depth0, "truncate", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.name), 50, options)))
    + "\r\n    </div>\r\n    <div class=\"deal-description deals-generic\">\r\n        <span class=\"content\">";
  stack1 = (helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.longDescription), 100, options) : helperMissing.call(depth0, "truncate", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.longDescription), 100, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n    </div>\r\n    <div class=\"deal-price deals-generic\">\r\n        <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options) : helperMissing.call(depth0, "formatNumber", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options)))
    + "</span>\r\n    </div>\r\n    <div class=\"clear\"></div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/deals/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"padding\">\r\n    <div class=\"empty-deals-list\"></div>\r\n    <p class=\"empty-deals-list-title\">Stiamo elaborando le Offerte per Te</p>\r\n    <p class=\"empty-deals-list-description\">\r\n        Per proporti le offerte più interessanti,<br />\r\n        inizia a utilizzare la Carta HYPE<br />\r\n        e Crea Nuovi Obiettivi.\r\n    </p>\r\n</div> ";
  });

this["JST"]["assets/js/common/deals/list/templates/top_panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"search-wrapper\">\r\n    <div class=\"search-container\">\r\n        <input type=\"text\" placeholder=\"cosa vuoi cercare?\" />\r\n        <div class=\"loading-contacts\" style=\"display:none;\"></div>\r\n        <a href=\"#\" class=\"search\" style=\"display:none;\">\r\n            <i class=\"icon-lens\"></i>\r\n        </a>\r\n        <a href=\"#\" class=\"js-close-search close-search\">\r\n            <i class=\"icon-close-small\"></i>\r\n        </a>\r\n    </div>\r\n</div>";
  });

this["JST"]["assets/js/common/deals/show/templates/deal_category.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"deal-category\">\r\n    "
    + escapeExpression((helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.name), 20, options) : helperMissing.call(depth0, "truncate", (depth0 && depth0.name), 20, options)))
    + "\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/deals/show/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                <img src=\"";
  if (helper = helpers.base64Logo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.base64Logo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"deal-title brand deals-generic\">\r\n            "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.brand)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n        </div>\r\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\r\n        <div class=\"deals-generic\">\r\n            <div class=\"deal-availability available\">\r\n                DISPONIBILE\r\n            </div>\r\n        </div>\r\n        ";
  }

function program7(depth0,data) {
  
  
  return "\r\n        <div class=\"deals-generic\">\r\n            <div class=\"deal-availability unavailable\">\r\n                NON DISPONIBILE\r\n            </div>\r\n        </div>\r\n        ";
  }

  buffer += "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>DETTAGLIO OFFERTA</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <div class=\"deal-content\">\r\n        <div class=\"deal-logo\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.base64Logo), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div class=\"deal-img\">\r\n            <img id=\"image\" src=\"";
  if (helper = helpers.base64Img) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.base64Img); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n        </div>\r\n        <div class=\"deal-categories deals-generic\">\r\n        </div>\r\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.brand), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <div class=\"deal-title deals-generic\">\r\n            "
    + escapeExpression((helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.name), 50, options) : helperMissing.call(depth0, "truncate", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.name), 50, options)))
    + "\r\n        </div>\r\n        <div class=\"deal-description deals-generic\">\r\n            <span class=\"content\">";
  stack1 = (helper = helpers.truncate || (depth0 && depth0.truncate),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.longDescription), 900, options) : helperMissing.call(depth0, "truncate", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.longDescription), 900, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n        </div>\r\n\r\n\r\n        <!--";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.availability), true, options) : helperMissing.call(depth0, "is", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.availability), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.availability), false, options) : helperMissing.call(depth0, "is", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.availability), false, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-->\r\n\r\n        <div class=\"deal-price deals-generic\">\r\n            <span class=\"amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options) : helperMissing.call(depth0, "formatNumber", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options)))
    + "</span>\r\n        </div>\r\n\r\n        <div class=\"deal-button\">\r\n            <a class=\"deals-generic js-shop glb-btn\" href=\"#\">\r\n                VEDI OFFERTA\r\n                <i class=\"icon-shop\"></i>\r\n            </a>\r\n        </div>\r\n\r\n        <!--<div class=\"deal-button\">\r\n            <a class=\"deals-generic js-create-goal glb-btn\" href=\"#\">\r\n                CREA OBBIETTIVO\r\n                <i class=\"icon-shop\"></i>\r\n            </a>\r\n        </div>-->\r\n\r\n\r\n        <div class=\"clear\"></div>\r\n    </div>\r\n</div>      ";
  return buffer;
  });

this["JST"]["assets/js/common/dropdown/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<select></select>\r\n<div class=\"show-selected-value\"></div>";
  });

this["JST"]["assets/js/common/dropdown/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  });

this["JST"]["assets/js/common/goals/list/templates/layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"panel-region\" class=\"floating-add-button\"></div>\r\n<div id=\"loading-goals-list-region\"></div>\r\n<div id=\"entities-region\"></div>\r\n";
  });

this["JST"]["assets/js/common/goals/list/templates/list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"list-block-title\"></span>\r\n<div class=\"content\"></div>";
  });

this["JST"]["assets/js/common/goals/list/templates/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            ti rimangono da spendere <span>";
  if (helper = helpers.remaining) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.remaining); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "€</span> di <span>";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "€</span>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n            hai completato <span>";
  if (helper = helpers.currentAmount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.currentAmount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "€</span> di <span>";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "€</span> entro "
    + escapeExpression((helper = helpers.niceDate || (depth0 && depth0.niceDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.endDate), options) : helperMissing.call(depth0, "niceDate", (depth0 && depth0.endDate), options)))
    + "\r\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"progress-bar status-";
  if (helper = helpers.remainingPercentage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.remainingPercentage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n            <div class=\"color\"></div>\r\n            <div class=\"back\"></div>\r\n        </div>\r\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"progress-bar status-";
  if (helper = helpers.percentage_string) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.percentage_string); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n            <div class=\"color\"></div>\r\n            <div class=\"back\"></div>\r\n        </div>\r\n        ";
  return buffer;
  }

  buffer += "<div class=\"main-list-item goal\">\r\n    <div class=\"info-block\">\r\n        <div class=\"title-line\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n        <div class=\"description-line\">\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.completed), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.completed), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.completed), true, options) : helperMissing.call(depth0, "is", (depth0 && depth0.completed), true, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <!--div class=\"status-block\"></div-->\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/goals/list/templates/list_panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<p class=\"daily-rate\">\r\n	Stai risparmiando <span class=\"euro\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.dailyRate), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.dailyRate), options)))
    + "&euro;</span> al giorno\r\n</p>\r\n<div id=\"onGoing\"></div>\r\n<div id=\"completed\"></div>\r\n<div id=\"paused\"></div>\r\n<div id=\"archived\"></div>\r\n<div id=\"expired\"></div>\r\n\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/goals/list/templates/movement_layout.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"top-region\"></div>\r\n<div id=\"goal-region\"></div>\r\n<div id=\"entities-region\" class=\"panel-content scrollable\"></div>\r\n";
  });

this["JST"]["assets/js/common/goals/list/templates/none.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"message message_1\">\r\n    <div class=\"empty-movement-list\"></div>\r\n    <span class=\"empty-movement-list-label\">\r\n        Sembra che qui non ci sia<br />\r\n        nulla di quello che cerchi!\r\n    </span>\r\n</div>\r\n<div class=\"message message_2\">\r\n    <div class=\"empty-movement-list\"></div>\r\n    <span class=\"empty-movement-list-label  padding\">\r\n        Abbiamo guardato bene<br />\r\n        ma quello che cerchi non c&rsquo;&egrave;\r\n    </span>\r\n</div>\r\n";
  });

this["JST"]["assets/js/common/goals/list/templates/panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a href=\"#\" class=\"add-char\">\r\n    \r\n</a>\r\n";
  });

this["JST"]["assets/js/common/goals/list/templates/top_panel.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"back icon-arrow\"></a>\r\n    <p>SPENDI DA OBIETTIVO</p>\r\n</div>";
  });

this["JST"]["assets/js/common/image/profile/templates/grabber.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n<a href=\"#\" id=\"js-select-image\" title=\"CARICA IMMAGINE\" class=\"image-selector glb-btn rounded-ghost-dark\">\r\nCarica Immagine\r\n</a>\r\n";
  }

function program3(depth0,data) {
  
  
  return "\r\n<a href=\"#\" id=\"js-select-image\" title=\"CARICA IMMAGINE\" class=\"image-selector\"></a>\r\n";
  }

  buffer += "<input accept=\".jpg,.jpeg,.png\" type=\"file\" id=\"file\" name=\"image\" style=\"display:none\" />\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/image/profile/templates/options.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-dialog photo-source-dialog\">\r\n    <div class=\"backdrop\"></div>\r\n    <div class=\"overdrop\">\r\n\r\n        <div class=\"bottom-box\">\r\n            <div class=\"close-button js-cancel\">\r\n                <a href=\"#\" class=\"js-close\">\r\n                    <i class=\"icon-close\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n        \r\n        <div class=\"actions\">\r\n            <a href=\"#\" class=\"js-snap request-button take-photo\" data-action=\"request\">\r\n                <div class=\"image\"></div>\r\n                <label class=\"light-label\">Scatta una foto</label>\r\n            </a>\r\n\r\n            <a href=\"#\" class=\"js-gallery request-button select-photo\" data-action=\"send\">\r\n                <div class=\"image\"></div>\r\n                <label class=\"light-label\">Scegli dalla galleria</label>\r\n            </a>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/common/image/show/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["assets/js/common/innerloading/templates/loading.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"coins-loader\">\r\n    <div class=\"coin first\"></div>\r\n    <div class=\"coin second\"></div>\r\n    <div class=\"coin third\"></div>\r\n    <div class=\"flash\"></div>\r\n</div>";
  });

this["JST"]["assets/js/common/input/templates/input.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n<a href=\"#\" class=\"js-confirm\">ok</a>\r\n";
  }

function program3(depth0,data) {
  
  
  return "\r\n<a href=\"#\" class=\"js-delete\">elimina</a>\r\n";
  }

  buffer += "<input type=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"";
  if (helper = helpers.placeholder) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.placeholder); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"";
  if (helper = helpers.style) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.style); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.confirmButon), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deleteButon), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["assets/js/common/keyboard/templates/keyboard.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<table class=\"table\">\r\n    <tr>\r\n        <td><a href=\"#\" data-input=\"1\" class=\"btn insert vibrate\">1</a></td>\r\n        <td><a href=\"#\" data-input=\"2\" class=\"btn insert vibrate\">2</a></td>\r\n        <td><a href=\"#\" data-input=\"3\" class=\"btn insert vibrate\">3</a></td>\r\n    </tr>\r\n    <tr>\r\n        <td><a href=\"#\" data-input=\"4\" class=\"btn insert vibrate\">4</a></td>\r\n        <td><a href=\"#\" data-input=\"5\" class=\"btn insert vibrate\">5</a></td>\r\n        <td><a href=\"#\" data-input=\"6\" class=\"btn insert vibrate\">6</a></td>\r\n    </tr>\r\n    <tr>\r\n        <td><a href=\"#\" data-input=\"7\" class=\"btn insert vibrate\">7</a></td>\r\n        <td><a href=\"#\" data-input=\"8\" class=\"btn insert vibrate\">8</a></td>\r\n        <td><a href=\"#\" data-input=\"9\" class=\"btn insert vibrate\">9</a></td>\r\n    </tr>\r\n    <tr>\r\n        <td class=\"dot\"><a href=\"#\" data-input=\".\" class=\"btn insert vibrate\">,</a></td>\r\n        <td><a href=\"#\" data-input=\"0\" class=\"btn insert vibrate\">0</a></td>\r\n        <td><a href=\"#\" class=\"btn delete vibrate\"><i class=\"icon-delete\"></i></a></td>\r\n    </tr>\r\n    <tr class=\"tr-ok\">\r\n        <td colspan=\"3\"><a href=\"#\" data-value=\"\" class=\"btn confirm vibrate\">OK</a></td>\r\n    </tr>\r\n</table>";
  });

this["JST"]["assets/js/common/loading/templates/loading.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <img src=\"assets/images/loading.gif\" style=\"";
  if (helper = helpers.style) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.style); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"loading\">\r\n</div>\r\n\r\n<style>\r\n    .loading {\r\n        height: 40px;\r\n        width: 40px;\r\n        position: absolute;\r\n        margin-left: 48%;\r\n        margin-top: 25%;\r\n    }\r\n</style>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/map/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"map-container\">\r\n    <div id=\"mappa\" style=\"width: 100%; height: 300px; position:absolute;\"></div>\r\n</div>\r\n";
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/form.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <div id=\"top-navigation\" class=\"menu-in detailed\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <div class=\"amount sufficient-sts\">\r\n            <p>Invia Denaro</p>\r\n            <span>Puoi spendere &euro; <i class=\"sts-left\">";
  if (helper = helpers.sts) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sts); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i></span>\r\n        </div>\r\n        <div class=\"amount insufficient-sts\">\r\n            <p>\"Puoi spendere\" superato</p>\r\n            <span>Devi recuperare &euro; <i class=\"sts-left\"></i></span>\r\n        </div>\r\n\r\n        <div class=\"amount insufficient-balance\" >\r\n            <p>\"Puoi spendere\" superato</p>\r\n            <span>Non &egrave; possibile inviare denaro</span>\r\n        </div>\r\n    </div>\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n    <div id=\"top-navigation\" class=\"menu-in\">\r\n        <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n        <div class=\"amount sufficient-sts\">\r\n            <p>Richiedi Denaro</p>\r\n        </div>\r\n    </div>\r\n    ";
  }

function program5(depth0,data) {
  
  
  return "\r\n                    <h4>Richiedi ad ognuno</h4>\r\n                    ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                    <h4>Invia</h4>\r\n                    ";
  }

function program9(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Causale</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <textarea name=\"description\" placeholder=\"Inserisci la causale\" id=\"entity-description\"></textarea>\r\n                    </div>\r\n                </div>\r\n                <span class=\"help-inline info\">Ancora <i class=\"js-chars-left\">40</i> caratteri a disposizione</span>\r\n            </div>            \r\n            ";
  }

function program11(depth0,data) {
  
  
  return "\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-field\">\r\n                    <h4>Messaggio</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <textarea name=\"description\" placeholder=\"Inserisci un messaggio\" id=\"entity-description\"></textarea>\r\n                    </div>\r\n                </div>\r\n                <span class=\"help-inline info\">Ancora <i class=\"js-chars-left\">150</i> caratteri a disposizione</span>\r\n            </div>\r\n            ";
  }

  buffer += "<div id=\"main-region\">\r\n\r\n    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "payment", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "payment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <div class=\"money-transfer-form panel-content scrollable\">\r\n        <div class=\"edit-block\">\r\n\r\n            <div class=\"amount-wrapper input-wrapper\">\r\n                <div class=\"amount-block\">\r\n                    ";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "request", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "request", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                    <input type=\"hidden\" class=\"js-hidden-amount\" name=\"amount\" value=\"";
  if (helper = helpers.amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                    <div class=\"amount-container\">\r\n                        <span class=\"euro\">&euro;</span>\r\n                        <div id=\"entity-amount\" class=\"amount\">";
  if (helper = helpers.amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div id=\"keyboard-region\" class=\"keyboard-container\">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div id=\"peers-region\">\r\n\r\n            </div>\r\n            <div id=\"contacts-region\">\r\n\r\n            </div>\r\n\r\n            <div class=\"input-wrapper\">\r\n                <div class=\"input-container transfer-field\">\r\n                    <span id=\"entity-peer\"></span>\r\n                </div>\r\n            </div>\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIban), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <div class=\"input-wrapper js-transferDateContainer\" style=\"display:none;\">\r\n                <div class=\"input-field\">\r\n                    <h4>Data</h4>\r\n                    <div class=\"input-container transfer-field\">\r\n                        <input type=\"date\" value=\"";
  if (helper = helpers.transferDate) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.transferDate); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"transferDate\" placeholder=\"gg/mm/aaaa\" id=\"entity-transferDate\" class=\"js-validate-element-transferDate\" />\r\n                    </div>\r\n                    <span id=\"entity-peer\"></span>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"padding\">\r\n                <a href=\"#\" class=\"js-submit glb-btn success\">CONFERMA<span class=\"icon-accept\"></span></a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div id=\"dates-region\"></div>\r\n    <div class=\"js-result\"></div>\r\n</div> ";
  return buffer;
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/peers_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"list-title\">\r\n    <h3 style=\"display: none\">\r\n        <div class=\"check\">\r\n            <input id=\"check\" type=\"checkbox\" value=\"\" class=\"\">\r\n            <label for=\"check\"></label> \r\n        </div>\r\n        <span class=\"js-split-amount-link\"></span>\r\n    </h3>\r\n</div>\r\n\r\n<div id=\"peers-list-container\">\r\n\r\n</div>\r\n\r\n<form id=\"destination-form-region\" style=\"display:none;\">\r\n    <div class=\"input-wrapper\">\r\n        <div class=\"input-field\">\r\n            <h4>Alias</h4>\r\n            <div class=\"input-container\">\r\n                <input type=\"text\" name=\"destination\" placeholder=\"Telefono, Email o IBAN\" value=\"";
  if (helper = helpers.destination) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.destination); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"entity-destination\" class=\"js-validate-element-destination\" />\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"input-wrapper\">\r\n        <div class=\"input-field\">\r\n            <h4>Nome</h4>\r\n            <div class=\"input-container\">\r\n                <input type=\"text\" name=\"firstName\" placeholder=\"es. Mario\" value=\"";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"entity-firstName\" class=\"js-validate-element-firstName\" />\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"input-wrapper\">\r\n        <div class=\"input-field\">\r\n            <h4>Cognome</h4>\r\n            <div class=\"input-container\">\r\n                <input type=\"text\" name=\"lastName\" placeholder=\"es. Rossi\" value=\"";
  if (helper = helpers.lastName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lastName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"entity-lastName\" class=\"js-validate-element-lastName\" />\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- <a href=\"#\" id=\"js-submit-destination\">OK!</a> -->\r\n    <a href=\"#\" id=\"js-close-form\" class=\"delete-peer\" style=\"display:none;\"><i class=\"icon-close\"></i></a>\r\n</form>";
  return buffer;
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/peers_list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image-block hype ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "); background-size: cover;\">\r\n                <div class=\"pin\">\r\n                    <i class=\"icon-phone-full\"></i>\r\n                </div>\r\n                <i class=\"hype-logo icon-hype-logo\"></i>\r\n            </div>\r\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"image-block ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"background-image: url(";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "); background-size: cover;\">\r\n                <div class=\"pin\">\r\n                    <i class=\"icon-phone-full\"></i>\r\n                </div>\r\n                <i class=\"hype-logo icon-hype-logo\"></i>\r\n            </div>\r\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n    <div class=\"image-block ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        "
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.firstName), (depth0 && depth0.lastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.firstName), (depth0 && depth0.lastName), options)))
    + "\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return " hype ";
  }

function program9(depth0,data) {
  
  
  return "\r\n        <i class=\"hype-logo icon-hype-logo\"></i>\r\n        ";
  }

function program11(depth0,data) {
  
  
  return "\r\n        <div class=\"pin\">\r\n            <i class=\"icon-phone-full\"></i>\r\n        </div>\r\n        ";
  }

  buffer += "<div class=\"info-block ";
  if (helper = helpers.clickable) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.clickable); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imageValue), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <div class=\"title-line ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.firstName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.firstName), options)))
    + " "
    + escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.lastName), options) : helperMissing.call(depth0, "capitalize", (depth0 && depth0.lastName), options)))
    + "\r\n        <small>";
  if (helper = helpers.destination) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.destination); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small>\r\n    </div>\r\n     \r\n    <a href=\"#\" id=\"js-delete-peer\" class=\"delete-peer\"><i class=\"icon-close\"></i></a>\r\n    <!--<a href=\"#\" class=\"js-delete\">elimina</a>-->\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/resume.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\r\n			<p>STAI CHIEDENDO</p>\r\n			";
  }

function program3(depth0,data) {
  
  
  return "\r\n			<p>STAI INVIANDO</p>\r\n			";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                        <div class=\"baloon\" style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.userImgValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userImgValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "); background-size: cover\">\r\n                        </div>\r\n                        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                        <div class=\"baloon no-image\">\r\n                            "
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.myself)),stack1 == null || stack1 === false ? stack1 : stack1.firstName), ((stack1 = (depth0 && depth0.myself)),stack1 == null || stack1 === false ? stack1 : stack1.lastName), options) : helperMissing.call(depth0, "initials", ((stack1 = (depth0 && depth0.myself)),stack1 == null || stack1 === false ? stack1 : stack1.firstName), ((stack1 = (depth0 && depth0.myself)),stack1 == null || stack1 === false ? stack1 : stack1.lastName), options)))
    + "\r\n                        </div>\r\n                        ";
  return buffer;
  }

  buffer += "\r\n<div class=\"modal-dialog resume-dialog\">\r\n	<div class=\"backdrop\"></div>\r\n	<div class=\"overdrop scrollable\">\r\n		<div class=\"top-title\">\r\n			";
  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.mode), "request", options) : helperMissing.call(depth0, "is", (depth0 && depth0.mode), "request", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</div>\r\n		<div class=\"amount-container\">\r\n			<div class=\"total-amount\">"
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.totalAmount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.totalAmount), options)))
    + "</div>\r\n		</div>\r\n\r\n		<div class=\"peers-container\">\r\n\r\n			<div id=\"peers-resume-sender-container\">\r\n				<div class=\"peer-item\">\r\n					<div class=\"baloon-container\">\r\n\r\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.userImgValue), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n					</div>\r\n					<h4>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.myself)),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\r\n				</div>\r\n			</div>\r\n			<div id=\"peer-arrow-container\">\r\n				<div class=\"peer-line\">\r\n					<i class=\"arrow\"></i>\r\n				</div>\r\n			</div>\r\n			<div id=\"peers-resume-container\">\r\n\r\n			</div>\r\n			<div class=\"clearfix\"></div>\r\n		</div>\r\n\r\n		<div class=\"message\">\r\n			<div class=\"content\">\r\n				";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n			</div>\r\n		</div>\r\n\r\n		<div class=\"actions\">\r\n			<a href=\"#\" class=\"glb-btn success js-confirm\">Conferma<i class=\"icon-accept\"></i></a>\r\n			<a href=\"#\" class=\"glb-btn delete js-cancel\">Annulla<i class=\"icon-reject\"></i></a>\r\n		</div>\r\n		\r\n		<div class=\"bottom-box\">\r\n			<div class=\"close-button\">\r\n				<a href=\"#\" class=\"js-cancel\">\r\n					<i class=\"icon-close\"></i>\r\n				</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/resumeItem.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hyper), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        \r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"baloon\" style=\"background-image: url(data:image/gif;base64,";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "); background-size: cover\">\r\n        </div>\r\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"baloon\" style=\"background-image: url(";
  if (helper = helpers.imageValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.imageValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "); background-size:cover\">\r\n        </div>\r\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <div class=\"baloon no-image\">\r\n        "
    + escapeExpression((helper = helpers.initials || (depth0 && depth0.initials),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.firstName), (depth0 && depth0.lastName), options) : helperMissing.call(depth0, "initials", (depth0 && depth0.firstName), (depth0 && depth0.lastName), options)))
    + "\r\n    </div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"baloon-container\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imageValue), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n<h4>";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n<div class=\"multiple-amount price x-small\">\r\n    <div class=\"amount\">\r\n        "
    + escapeExpression((helper = helpers.formatNumber || (depth0 && depth0.formatNumber),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.amount), options) : helperMissing.call(depth0, "formatNumber", (depth0 && depth0.amount), options)))
    + "\r\n    </div>\r\n</div> \r\n";
  return buffer;
  });

this["JST"]["assets/js/common/p2p/hypeTransfer/templates/transferDates.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"input-wrapper\">\r\n	<p>scegli una data compresa tra <span class=\"start-date\">";
  if (helper = helpers.DateStart) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.DateStart); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> e\r\n	<span class=\"end-date\">";
  if (helper = helpers.DateStop) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.DateStop); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></p>\r\n\r\n	<div class=\"input-field\">\r\n		<h4>Data di invio</h4>\r\n		<div class=\"input-container\">\r\n			<input type=\"date\" id=\"entity-transferDate\" placeholder=\"GG/MM/AAAA\" name=\"transferDate\" value=\"";
  if (helper = helpers.defaultDate) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.defaultDate); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n		</div>\r\n		<div class=\"clearfix\"></div>\r\n	</div>\r\n</div>";
  return buffer;
  });

this["JST"]["assets/js/common/panel/templates/container.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["assets/js/common/placeholder/templates/goals_placeholder.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image goals\"></div>\r\n<span class=\"title\">\r\n    Non hai ancora pensato\r\n    <br />\r\n    al prossimo viaggio?\r\n</span>";
  });

this["JST"]["assets/js/common/placeholder/templates/movements_placeholder.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image movements\"></div>\r\n<span class=\"title\">\r\n    Neanche un caffè,\r\n    <br />\r\n    per provare la tua carta?\r\n</span>";
  });

this["JST"]["assets/js/common/placeholder/templates/notifications_placeholder.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"image notifications\"></div>\r\n<span class=\"title\">\r\n    Aggiungi le notifiche\r\n    <br />    che vuoi ricevere!\r\n</span>\r\n<span class=\"label padding\">\r\n    In questa sezione puoi impostare\r\n    <br />le <strong>notifiche</strong> relative ai movimenti\r\n    <br />della tua carta, del Puoi Spendere e degli obiettivi.\r\n</span>";
  });

this["JST"]["assets/js/common/share/show/templates/share.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-in\">\r\n    <a href=\"#\" class=\"icon-arrow js-back\"></a>\r\n    <p>INVITA I TUOI AMICI AD HYPE</p>\r\n</div>\r\n<div class=\"panel-content scrollable\">\r\n    <p class=\"share-element big-title\">\r\n        Invita i tuoi amici<br />a provare HYPE\r\n    </p>\r\n    <div class=\"share-image-container share-element\">\r\n        <div class=\"share-image\"></div>\r\n    </div>\r\n    <div class=\"page-description share-element\">\r\n        Semplice, gratuito, per tutti\r\n    </div>\r\n    <a href=\"#\" class=\"js-share glb-btn complete share-element\">\r\n        INVIA INVITO\r\n        <i class=\"icon-share\"></i>\r\n    </a>\r\n    <!-- <div class=\"share-element\">\r\n        <a href=\"#\">\r\n            termini e condizioni\r\n        </a>\r\n    </div> -->\r\n</div>";
  });

this["JST"]["assets/js/global/error/templates/error.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"error confirm-dialog \">\r\n	<div class=\"backdrop\">\r\n	</div>\r\n	<div class=\"top-title\">\r\n		Attenzione\r\n	</div>\r\n	<div class=\"title\">\r\n		Errore Generico\r\n	</div>\r\n	<div class=\"description\">\r\n		Errore Generico prova molto bella\r\n	</div>\r\n</div>";
  });

this["JST"]["assets/js/global/loading/templates/loading.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"preloader\"> \r\n	<div class=\"backdrop\">\r\n	</div>\r\n	<div class=\"status\">\r\n		<div class=\"spinner\"></div>\r\n		<span>Attendi</span>\r\n\r\n		<!--div class=\"loading-text\">\r\n			<div class=\"message text-1\">\r\n				Qualche istante di attesa.<br/>\r\n				Approfittane per un po’ di stretching alle dita.\r\n			</div>\r\n			<div class=\"message text-2\">\r\n				Solo qualche istante.<br/>\r\n				Una piccola attesa, per una grande esperienza. \r\n			</div>\r\n			<div class=\"message text-3\">\r\n				Solo qualche secondo.<br/> \r\n				Intanto guarda lontano, aiuta a riposare la vista.\r\n			</div>\r\n		</div-->\r\n	</div>\r\n</div>";
  });

this["JST"]["assets/js/global/notification/templates/show.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\r\n\r\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"in-app-notify-wrapper\">\r\n    <i class=\"icon-notify\"></i>\r\n    <div class=\"message\">\r\n        ";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n</div>\r\n";
  return buffer;
  }

  stack1 = (helper = helpers.is || (depth0 && depth0.is),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.message), "", options) : helperMissing.call(depth0, "is", (depth0 && depth0.message), "", options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

return this["JST"];

});