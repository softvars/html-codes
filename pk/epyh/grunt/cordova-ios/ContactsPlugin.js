var ContactsPlugin = {
    getContacts: function (success, fail, resultType, fields, options) {
        try {
            navigator.contacts.find(fields, function (contacts) {//chiamo il plugin di cordova 
                success(JSON.stringify(contacts));
            }, fail, options);
        }
        catch (ex) {
            var error = {
                code: '666'
            }
            fail(error);
        }
    }
};