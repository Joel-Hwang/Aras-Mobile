let fieldFactory = {
    createText: (row) => {
        let div = document.createElement('div');
        let type = 'text';
        if(row.data_type == 'integer' || row.data_type == 'float' || row.data_type == 'decimal')
            type = 'number';
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3" style="max-width: 200px;">
            <span class="input-group-text" id="inputGroup-sizing-sm">${row.label}</span>
            <input type="${type}" class="form-control" id="${row.prop_name}" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" ${row.is_disabled === "1" ? 'disabled' : ''}>
        </div> `;
        return div.firstElementChild;
    },
    createDate: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3" style="max-width: 200px;">
            <span class="input-group-text" id="inputGroup-sizing-sm">${row.label}</span>
            <input type="date" class="form-control" id="${row.prop_name}" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" ${row.is_disabled === "1" ? 'disabled' : ''}>
        </div> `;
        return div.firstElementChild;
    },
    createTextArea: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text">${row.label}</span>
            <textarea class="form-control" rows="1" id="${row.prop_name}"  aria-label="${row.label}" ${row.is_disabled === "1" ? 'disabled' : ''}></textarea>
        </div> `;
        return div.firstElementChild;
    },
    createFile: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="mb-3" style="margin:0px 10px">
            <label for="formFileSm" class="form-label">${row.label}</label>
            <input class="form-control form-control-sm" id="${row.prop_name}" type="file">
        </div>`;
        return div.firstElementChild;
    },
    createImage: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="mb-3" style="margin:0px 10px">
            <label for="formFileSm" class="form-label">${row.label}</label>
            <input class="form-control form-control-sm" id="${row.prop_name}" type="file">
            <img src="/img/card2.jpg" width="50px"/>
        </div>`;
        return div.firstElementChild;
    },
    createCheckBox: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-text">
                <input class="form-check-input mt-0" id="${row.prop_name}" type="checkbox"  ${row.is_disabled === "1" ? 'disabled' : ''}  ria-label="Checkbox for following text input">
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" disabled value="${row.label}">
        </div>`;
        return div.firstElementChild;
    },
    createDropDown: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">${row.label}</span>
          <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="${row.prop_name}"  ${row.is_disabled === "1" ? 'disabled' : ''}>
            <option selected>'Select'</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>`;
        return div.firstElementChild;
    },
    createGrupbox: (row) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <h6 style=" background-color: white; margin-bottom: -20px; margin-left: 10px;">${row.legend ? row.legend : '&nbsp;'}</h6>
        <div id="${row.name}" style="display: flex;flex-wrap: wrap;border: 1px solid #ccc;padding: 20px 10px 0px 5px;margin: 20px 10px;">
        </div>`;
        return div;
    },
    create: (row) => {
        switch (row.field_type) {
            case "text":
                return fieldFactory.createText(row);
            case "date":
                return fieldFactory.createDate(row);
            case "textarea":
                return fieldFactory.createTextArea(row);
            case "checkbox":
                return fieldFactory.createCheckBox(row);
            case "dropdown":
                return fieldFactory.createDropDown(row);
            case "groupbox":
                return fieldFactory.createGrupbox(row);
            case "file item":
                return fieldFactory.createFile(row);
            case "image":
                return fieldFactory.createImage(row);
            default:
                return fieldFactory.createText(row);
        }
    },
    getValue: async (row) => {
        debugger;
        let fileId = '';
        switch(row.field_type){
            case "file item":
                fileId = await fileUtil.upload(row.prop_name);
                return fileId;
            break;
            case "image":
                fileId = await fileUtil.upload(row.prop_name);
                return fileId;
            break;
            case "text":
                return document.querySelector(`#${row.prop_name}`).value;
            break;
            case "checkbox":
                return document.querySelector(`#${row.prop_name}`).value==='on'?1:0;
            default:
                return null;
        }
    }
}


