let util = require('../com/com');
const axios = require("axios");

let svcCommon = {
    getTransaction: async (token) => {
        let res = await axios.post(global.rootServer + "/vault/odata/vault.BeginTransaction",
            {}, { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data.transactionId;
    },
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
    getCriteria: async (token, itemTypeId) => {
        let sql = `
    SELECT B.SORT_ORDER, B.NAME, B.LABEL, B.DATA_TYPE, B.DATA_SOURCE, B.IS_HIDDEN, B.IS_HIDDEN2
      FROM innovator.ITEMTYPE A WITH(NOLOCK)
     INNER JOIN innovator.PROPERTY B WITH(NOLOCK)
        ON B.SOURCE_ID = A.ID
     WHERE A.ID = '${itemTypeId}'
       AND B.IS_HIDDEN = 0
     ORDER BY sort_order
        `;
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
        , E.DATA_TYPE
		, E.DATA_SOURCE
		, E.FOREIGN_PROPERTY
		, E.SCALE
		, E.PREC
		, E.STORED_LENGTH
        , CASE WHEN D.FIELD_TYPE = 'IMAGE' THEN 999
               WHEN D.FIELD_TYPE = 'FILE ITEM' THEN 990
               WHEN ISNULL(D.CONTAINER,'') = '' then 0 
          ELSE 1 END AS sort
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
    },
    getItems: async(token, itemType, param) => {
        param = JSON.parse(param);
        let filter = '';
        let selector = 'id,keyed_name';
        for(let prop in param){
            selector += `,${prop}`;
            if(!param[prop]) continue;
            filter += `and contains(${prop},'${param[prop]}') `
        }
        filter = '$filter='+filter.substring(4);
        selector = '$select='+selector;
        let res = await axios.get(`${global.apiServer}/${itemType}?${filter}&${selector}`,
            { headers: { Authorization: "Bearer " + token, Prefer: "odata.maxpagesize=3" } }
        );
        return res.data
    },
    

    createItem: async (token, itemType, body) => {
        let res = await axios.post(`${global.apiServer}/${itemType}`, body,
            { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data;

    },

    updateItem: async (token, itemType, body) => {
        let res = await axios.patch(`${global.apiServer}/${itemType}('${body.id}')`, body,
            { headers: { Authorization: "Bearer " + token } });
        if (res == null || res.data == null) return null;
        return res.data;
    }



}


module.exports = svcCommon;