let util = require('../com/com');

let svcCommon = {
    getMenuList: async (id) => {
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
            }
        ];

        return result;

    }

}


module.exports = svcCommon;