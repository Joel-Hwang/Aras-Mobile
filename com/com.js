
var request = require("request");
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

    getToken: async function (id, pw) {
        const options = {
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
        return result.access_token;
    }
}

module.exports = com;