cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
        {
            "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
            "id": "org.apache.cordova.vibration.notification",
            "merges": [
                "navigator.notification",
                "navigator"
            ]
        },
        {
            "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
            "id": "org.apache.cordova.camera.Camera",
            "clobbers": [
                "Camera"
            ]
        },
        {
            "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
            "id": "org.apache.cordova.camera.CameraPopoverOptions",
            "clobbers": [
                "CameraPopoverOptions"
            ]
        },
        {
            "file": "plugins/org.apache.cordova.camera/www/Camera.js",
            "id": "org.apache.cordova.camera.camera",
            "clobbers": [
                "navigator.camera"
            ]
        },
        {
            "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
            "id": "org.apache.cordova.camera.CameraPopoverHandle",
            "clobbers": [
                "CameraPopoverHandle"
            ]
        },
        {
                 "file": "plugins/cordova.plugins.barcodeScanner/www/barcodescanner.js",
                 "id": "cordova.plugins.barcodeScanner",
                 "clobbers": [
                     "BarcodeScanner"
                 ]
        }
    ];
    module.exports.metadata = 
    // TOP OF METADATA
    {
        "org.apache.cordova.vibration": "0.3.12-dev",
        "org.apache.cordova.camera": "0.3.3",
        "cordova.plugins.barcodeScanner": "0.3.3"
    }
    // BOTTOM OF METADATA
});