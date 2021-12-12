let util = require('../com/com');
const axios = require("axios");

let svcCommon = {
    getMenuList: async (token, id) => {
        let sql = `EXEC M_Menu ${id}`;
        let res = await axios.post(global.apiServer + "/method.CS_CallProcedure",
            { sql: sql }, { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data.Item;
    },
    getItemType: async (token, itemTypeId) => {
        let sql = `
        select name
          from innovator.ITEMTYPE A with(nolock)
         where ID = '${itemTypeId}'`;

        let res = await axios.post(global.apiServer + "/method.ZX_Apply_SQL",
            { sql: sql }, { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"].ApplyItemResponse.Result.Item;
    },
    getForm: async (token, itemTypeId, classification) => {
        if (!classification) classification = '';
        let sql = `
   select A.FORM_CLASSIFICATION
        , D.CONTAINER
        , D.FIELD_TYPE
        , D.PROPERTYTYPE_ID
        , D.HTML_CODE
        , D.IS_VISIBLE
        , D.IS_DISABLED
        , D.NAME
        , D.LABEL
        , D.POSITIONING
        , D.WIDTH
        , CASE WHEN D.POSITIONING = 'static' THEN 0 ELSE D.X END AS X
        , CASE WHEN D.POSITIONING = 'static' THEN 0 ELSE D.Y END AS Y
        , D.LEGEND
        , D.ORIENTATION
		, E.NAME AS Prop_Name
        , CASE WHEN ISNULL(D.CONTAINER,'') = '' then 0 ELSE 1 END AS sort
     from innovator.[view] A with(nolock)
    inner join innovator.form B with(nolock) 
       on A.RELATED_ID = B.ID
    inner join innovator.body C with(nolock)
       on B.ID = C.SOURCE_ID
    inner join innovator.field D with(nolock)
       on D.SOURCE_ID = C.ID
     left outer join innovator.property E with(nolock)
	   on E.ID = D.PROPERTYTYPE_ID
    where A.SOURCE_ID = '${itemTypeId}'
      AND FIELD_TYPE != 'html'
      AND ISNULL(A.FORM_CLASSIFICATION,'') = '${classification}'
    order by sort, ROUND(D.Y,-1), D.X, D.SORT_ORDER`;

        let res = await axios.post(global.apiServer + "/method.ZX_Apply_SQL",
            { sql: sql }, { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"].ApplyItemResponse.Result.Item;
    },

    getPermission: async (token, userId, itemTypeId) => {
        let sql = `EXEC M_Permission ${userId} ${itemTypeId}`;

        let res = await axios.post(global.apiServer + "/method.CS_CallProcedure",
            { sql: sql }, { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data.Item;
    }



}


module.exports = svcCommon;