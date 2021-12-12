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
    create: (fieldType, label, value, disabled) => {
        switch (fieldType) {
            case "text":
                return fieldFactory.createText(label, value, disabled);
                break;
            default:
                return fieldFactory.createText(label, value, disabled);
                break;
        }
    }
}


