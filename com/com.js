
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

    getToken: async function(){
        switch(arguments.length){
            case 1:
                return await com.getToken3(arguments[0]);
                break;
            case 2:
                return await com.getToken2(arguments[0],arguments[1]);
            break;
        }
    },
    getToken2: async function (id, pw) {
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
    },
    getToken3: async function (req) {
        let id = req.session.login_name||'';
        let pw = req.session.pw||'';
        return await com.getToken2(id,pw);
    }
}

module.exports = com;