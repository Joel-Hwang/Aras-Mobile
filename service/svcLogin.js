let util = require('../com/com');

let svcLogin = {
    login : async (id, pw) => {
        let token = await util.getToken(id,pw);
        const options = {
          uri: global.apiServer + "/user",
          method: "GET",
          qs: {
            $filter: "login_name eq '" + id + "'",
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        var result = await util.requestSync(options);

        return JSON.parse(result);
       
    },
    createCommonCode: async function (param) {
        
        return 'createCommonCode';
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


module.exports = svcLogin;