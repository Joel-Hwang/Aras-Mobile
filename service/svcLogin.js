let util = require('../com/com');
const axios = require("axios");

let svcLogin = {
    login: async (id, pw) => {
        let token = await util.getToken(id, pw);
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
        return res.data.value[0];
        /*const options = {
            url: global.apiServer + "/user",
            method: "GET",
            responseType:"JSON",
            qs: {
                $filter: "login_name eq '" + id + "'",
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        var result = await util.send(options);

        return JSON.parse(result);*/

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