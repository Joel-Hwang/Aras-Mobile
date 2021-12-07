let util = require('../com/com');

let svcCommon = {
    getMenuList: async (token,id) => {
        
        let sql = `EXEC M_Menu ${id}`;
        const options = {
            uri: global.apiServer + "/method.CS_CallProcedure",
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body:{
                sql:sql
            },
            json:true,
          };
          var result = await util.requestSync(options);
  
          return result.Item;
    },

    getForm: async (token,itemTypeId,classification) => {
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
        , D.LABEL_KO
        , D.POSITIONING
        , D.WIDTH
        , D.X
        , D.Y
     from innovator.[view] A with(nolock)
    inner join innovator.form B with(nolock) 
       on A.RELATED_ID = B.ID
    inner join innovator.body C with(nolock)
       on B.ID = C.SOURCE_ID
    inner join innovator.field D with(nolock)
       on D.SOURCE_ID = C.ID
    where A.SOURCE_ID = '${itemTypeId}'
      AND ISNULL(A.FORM_CLASSIFICATION,'') = '${classification}'`;

        const options = {
            uri: global.apiServer + "/method.ZX_Apply_SQL",
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body:{
                sql:sql
            },
            json:true,
          };
          var result = await util.requestSync(options);
  
          return result.Item;
    }

}


module.exports = svcCommon;