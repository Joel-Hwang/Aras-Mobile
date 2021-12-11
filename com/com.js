
var request = require("request");
const axios = require("axios");
var FormData = require('form-data');

let com = {
    requestSync: function (options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                resolve(body);
            });
        });
    },

    requestSyncFile: function (options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                resolve(response);
            }).pipe(fs.createWriteStream('sample.png'));
        });
    },

    getToken: async function () {
        switch (arguments.length) {
            case 1:
                return await com.getToken3(arguments[0]);
                break;
            case 2:
                return await com.getToken2(arguments[0], arguments[1]);
                break;
        }
    },
    getToken2: async function (id, pw) {
        let formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('scope','Innovator');
        formData.append('client_id','IOMApp');
        formData.append('username',id);
        formData.append('password',pw);
        formData.append('database',global.databaseName);

        let res = await axios.post(global.authServer, formData, { headers: formData.getHeaders() });
        if(res == null || res.data == null) return null;
        return res.data.access_token;

        /*const options = {
            uri: global.authServer,
            method: "POST",
            json: true,
            form: {
                grant_type: "password",
                scope: "Innovator",
                client_id: "IOMApp",
                username: id,
                password: pw,
                database: global.databaseName,
            }
        };
        var result = await com.requestSync(options);
        return result.access_token;*/
    },
    getToken3: async function (req) {
        let id = req.session.userId || '';
        let pw = req.session.pw || '';
        return await com.getToken2(id, pw);
    }
}

module.exports = com;