var ContactsPlugin = {
    getContacts: function (success, fail, resultType, fields, options) {
        try {
            return cordova.exec(success, fail, "ContactsPlugin", "getAllContacts", [resultType]);
        }
        catch (ex) {
            var error = {
                code: '666'
            }
            fail(error);
        }
    }
};
