requirejs.config({
    catchError: true,
    baseUrl: "assets/js",
    paths: { //indico dove si trovano le diverse libraries
        backbone: "vendor/backbone",
        "backbone.syphon": "vendor/backbone.syphon",
        //'backbone.customSync': 'apps/config/backbone/custom',
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
        fastclick: 'vendor/fastclick',
        //Cordova Android
        cordova: '../../cordova-android/cordova',
        DeviceInfoPlugin: '../../cordova-android/DeviceInfoPlugin',
        PhoneCallPlugin: '../../cordova-android/PhoneCallPlugin',
        RequestHttpsPlugin: '../../cordova-android/RequestHttpsPlugin',
        WebViewPlugin: '../../cordova-android/WebViewPlugin',
        PDFReaderPlugin: '../../cordova-android/PDFReaderPlugin',
        PushNotificationPlugin: '../../cordova-android/PushNotificationPlugin',
        ContactsPlugin: '../../cordova-android/ContactsPlugin',
        SendEmailPlugin: '../../cordova-android/SendEmailPlugin',
        AppToAppPlugin: '../../cordova-android/AppToAppPlugin',
        FingerPrintPlugin: '../../cordova-android/FingerPrintPlugin',
        FacebookEventLoggerPlugin: '../../cordova-android/FacebookEventLoggerPlugin',
        LogDB: '../../cordova-android/LogDB',
        SellaShell: '../../sella-shell/commons',
        sjcl: 'vendor/sjcl/sjcl',
        SocialSharing: '../../cordova-android/SocialSharing'
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
        "backbone.syphon": ["backbone"],
        //"backbone.customSync": ["backbone"],
    }

});

require(["app", // cordova etc. =>
    'fastclick',
    'sjcl',
    'global/bucket',
    'cordova',
    'DeviceInfoPlugin',
    'PhoneCallPlugin',
    'RequestHttpsPlugin',
    'WebViewPlugin',
    'PDFReaderPlugin',
    'PushNotificationPlugin',
    'ContactsPlugin',
    'SendEmailPlugin',
    'AppToAppPlugin',
    'FacebookEventLoggerPlugin',
    'FingerPrintPlugin',
    'LogDB',
    'SellaShell',
    'apps/navigation/android/navigation_app',
    'SocialSharing'
], function(Appersonam, FastClick, sjcl) {
    LogDB.cypher = sjcl;
    document.addEventListener('deviceready', function() {
            console.log("Start App");
            Appersonam.start();

            FastClick.attach(document.body);

        },
        false);
});
requirejs.onError = function(error) {
    LogDB.log('Require error => ' + error);
};