let fieldFactory = {
    createText: (label, value, disabled) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group input-group-sm mb-3" style="max-width: 200px;">
            <span class="input-group-text" id="inputGroup-sizing-sm">${label}</span>
            <input type="text" class="form-control" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" ${disabled ? 'disabled' : ''} value="${value}">
        </div> `;
        return div.firstElementChild;
    },
    createTextArea: (label, value, disabled) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group">
            <span class="input-group-text">${label}</span>
            <textarea class="form-control" aria-label="${label}" ${disabled ? 'disabled' : ''}>${value}</textarea>
        </div> `;
        return div.firstElementChild;
    },
    createCheckBox: (label, value, disabled) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group mb-3">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="${value}" ${disabled ? 'disabled' : ''}  ria-label="Checkbox for following text input">
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" disabled value="${label}">
        </div>`;
        return div.firstElementChild;
    },
    createDropDown: (label, value, disabled) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">${label}</span>
          <select class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected>${value?value:'Select'}</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>`;
        return div.firstElementChild;
    },
    create: (fieldType, label, value = '', disabled) => {
        switch (fieldType) {
            case "text":
                return fieldFactory.createText(label, value, disabled);
                break;
            case "textarea":
                return fieldFactory.createTextArea(label, value, disabled);
                break;
            case "checkbox":
                return fieldFactory.createCheckBox(label, value, disabled);
                break;
            case "dropdown":
                return fieldFactory.createDropDown(label, value, disabled);
                break;

            default:
                return fieldFactory.createText(label, value, disabled);
                break;
        }
    }
}


