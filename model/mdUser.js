var request = require("request")

let mdUser = {
    getUser: async function (loginName) {
        let token = await getToken(req.session.login_name, req.session.password);
        const options = {
            uri: apiServer + "/USER",
            method: "GET",
            qs: {
                $filter: "login_name eq '" + loginName + "'",
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        var result = await requestSync(options);
        let response = JSON.parse(result);
        return response;
    },
    retrieveCommonCodeList: async function (param) {
        return 'retrieveCommonCodeList';
    },
    retrieveCommonCode: async function (groupCode) {
        return 'retrieveCommonCode';
    },
    updateCommonCode: async function (groupCode, param) {
        return 'updateCommonCode';
    },
    deleteCommonCode: async function (groupCode) {
        return 'deleteCommonCode';
    }
}


module.exports = mdUser;