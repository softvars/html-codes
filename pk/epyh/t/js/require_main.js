requirejs.config({
    catchError: true,
    baseUrl: "assets/js",
    paths: { //indico dove si trovano le diverse libraries
        backbone: "vendor/backbone",
        "backbone.syphon": "vendor/backbone.syphon",
        //'backbone.customSync': 'config/backbone/custom',
        jquery: "vendor/jquery",
        json2: "vendor/json2.min",
        marionette: "vendor/backbone.marionette",
        underscore: "vendor/underscore",
        handlebars: 'vendor/handlebars',
        templates: 'templates',
        helpers: 'vendor/handlebars.helpers',
        moment: 'vendor/moment-with-langs',
        text: 'vendor/text',
        pickadate: 'vendor/pickadate/picker',
        pickerDate: 'vendor/pickadate/picker.date',
        pickerLegacy: 'vendor/pickadate/legacy',
        pickerLng: 'vendor/pickadate/translations/it_IT',
        d3: "vendor/d3",
        iban: "vendor/iban",
        //mapbox: 'vendor/mapbox/dist/mapbox-copied-from-online',
        waypoints: 'vendor/waypoints',
        'facebook': 'vendor/fb.sdk',
        'mapbox': 'vendor/mapbox',
        // Hammer
        hammerjs: 'vendor/hammer/jquery.hammer-full',
        'backbone.hammer': 'vendor/hammer/backbone.hammer',
        //Cordova fake
        //cordova: '../../cordova-fake/cordova-2.5.0',
        DeviceInfoPlugin: '../../cordova-fake/DeviceInfoPlugin',
        //PhoneCallPlugin: '../../cordova-fake/PhoneCallPlugin',
        RequestHttpsPlugin: '../../cordova-fake/RequestHttpsPlugin',
        WebViewPlugin: '../../cordova-fake/WebViewPlugin',
        PDFReaderPlugin: '../../cordova-fake/PDFReaderPlugin',
        PushNotificationPlugin: '../../cordova-fake/PushNotificationPlugin',
        SendEmailPlugin: '../../cordova-fake/SendEmailPlugin',
        AppToAppPlugin: '../../cordova-fake/AppToAppPlugin',
        FingerPrintPlugin: '../../cordova-fake/FingerPrintPlugin',
        FacebookEventLoggerPlugin: '../../cordova-fake/FacebookEventLoggerPlugin',
        LogDB: '../../cordova-fake/LogDB',
        SellaShell: '../../sella-shell/commons',
        Contacts: '../../cordova-fake/fake-contacts',
        GeoLoc: '../../cordova-fake/fake-geoloc',
        VibrationPlugin: '../../cordova-fake/VibrationPlugin',
        sjcl: 'vendor/sjcl/sjcl',
        SocialSharing: '../../cordova-fake/SocialSharing'
        //ga: 'vendor/analytics_debug'
    },
    shim: { //shim per le libraries che non supportano AMD
        underscore: {
            exports: "_"
        },
        /*ga: {
            exports: "ga"
        },*/
        'classic.css': {
            deps: ['pickadate']
        },
        'classic.date.css': {
            deps: ['pickadate']
        },
        handlebars: {
            exports: "Handlebars"
        },
        iban: {
            exports: "iban"
        },
        sjcl: {
            exports: 'sjcl'
        },
        'mapbox.css': {
            deps: ['mapbox']
        },
        'facebook': {
            exports: 'FB'
        },
        'jquery.fullPage.css': {
            deps: ['fullPage']
        },
        backbone: {
            deps: ["jquery", "underscore", 'handlebars', 'helpers', "json2"], //dichiaro che backbone dipende da jquery underscore e json2, quindi queste dipendenze verranno caricate prima di backbone
            exports: "Backbone" //indico che la variabile globale Backbone verrà restituita nella funzione di callback ('Backbone' diventa come '_' e '$' )
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette" //'Marionette' diventa come 'Backbone' '_' e '$'
        },
        "backbone.syphon": ["backbone"]
        //"backbone.customSync": ["backbone"],
    }
});

require(["app", //cordova etc.=>
    'sjcl',
    "global/bucket",
    'DeviceInfoPlugin',
    'RequestHttpsPlugin',
    'Contacts',
    'GeoLoc',
    'WebViewPlugin',
    'SellaShell',
    'PDFReaderPlugin',
    'PushNotificationPlugin',
    'SendEmailPlugin',
    'AppToAppPlugin',
    'FingerPrintPlugin',
    'FacebookEventLoggerPlugin',
    'LogDB',
    'VibrationPlugin',
    'apps/navigation/android/navigation_app',
    'SocialSharing'
    //'ga'
], function (Appersonam, sjcl) {

    var oldOnError = window.onerror;
    LogDB.cypher = sjcl;
    window.onerror = function (msg, fileName, line) {
        if (oldOnError) {
            oldOnError(msg, fileName, line);
        }
        LogDB.log(fileName + '@' + line + ' => ' + msg);
    };
    Appersonam.start();
});
//requirejs.onError = function(error) {
//    LogDB.log('Require error => ' + error);
//};
