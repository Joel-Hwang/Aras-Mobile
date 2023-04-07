let util = require('../com/com');
const axios = require("axios");

let svcLogin = {
    login: async (id, pw) => {
        let token = await util.getToken(id, pw);
        if(token == null) return null;
        let res = await axios.get(global.apiServer + "/user",
        {
            headers: {
                Authorization: "Bearer " + token,
            },
            params:{
                $filter: "login_name eq '" + id + "'",
            }

        });
        if(res == null || res.data == null) return null;
        res.data.value[0].token = token;
        return res.data.value[0];
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