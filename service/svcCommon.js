let util = require('../com/com');

let svcCommon = {
    getMenuList: async (id,pw) => {
        let sql = `
        WITH TREE_QUERY
        AS (
        	SELECT C.ID, C.NAME
        	  FROM innovator.[USER] A
        	 INNER JOIN innovator.ALIAS B ON B.SOURCE_ID = A.ID
        	 INNER JOIN innovator.[IDENTITY] C ON B.RELATED_ID = C.ID
        	 WHERE A.LOGIN_NAME = '${id}'
        	 UNION ALL
        	 SELECT A.ID, A.NAME FROM innovator.[IDENTITY] A where a.NAME = 'world'
        	 UNION ALL
        	 SELECT C.ID, C.NAME
        	  FROM innovator.MEMBER B
        	  INNER JOIN innovator.[IDENTITY] C ON C.ID = B.SOURCE_ID
        	  INNER JOIN TREE_QUERY D ON D.ID =  B.RELATED_ID
        
        )

        select A.ID, A.LABEL, B.CATEGORY, C.NAME
          from innovator.ITEMTYPE A
         inner join innovator.TOC_ACCESS B ON A.ID = B.SOURCE_ID
         inner join innovator.[IDENTITY] C on B.RELATED_ID = C.ID
         where c.id in (SELECT ID from TREE_QUERY)
         order by B.CATEGORY, A.LABEL
        `;
        let token = await util.getToken(id,pw);
        const options = {
            uri: global.apiServer + "/method.ZX_Apply_SQL",
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            form:{
                sql:sql
            }
          };
          var result = await util.requestSync(options);
  
          return JSON.parse(result);
/*
        let result = [
            {
                name: "My Project",
                form: "Project",
                view: "../../../guide.html",
                path: "PMS"
            },
            {
                name: "Lab Test",
                form: "CS_LabTest",
                view: "",
                path: "4. Lab Test"
            },
            {
                name: "PFC",
                form: "CS_PFC",
                view: "",
                path: "5. PFC"
            },
            {
                name: "AddinHelper",
                form: "CS_AddinHelper",
                view: "",
                path: "Administarator/Utils"
            }
        ];

        return result;*/

    }

}


module.exports = svcCommon;