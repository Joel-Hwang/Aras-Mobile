
function toast(msg) {
    var node = document.createElement('div');
    node.id = 'snackbar';
    node.textContent = msg;
    document.body.appendChild(node);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
        $(node).remove();
    }, 2000);
}

function templatePolyfill() {
    if ('content' in document.createElement('template')) {
        return false;
    }

    var templates = document.getElementsByTagName('template');
    var plateLen = templates.length;

    for (var x = 0; x < plateLen; ++x) {
        var template = templates[x];
        var content = template.childNodes;
        var fragment = document.createDocumentFragment();
        while (content[0]) {
            fragment.appendChild(content[0]);
        }
        template.content = fragment;
    }
}

async function getRes(url){
    const res = await fetch(url, {
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    });
    let resData = await res.json();
    return resData;
}

async function postRes(url,body){
    const res = await fetch(url, {
        method:'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-type':'application/json'
        }
    });
    let resData = await res.json();
    return resData;
}

async function httpRes(type, url, headers, body){
    const res = await fetch(url, {
        method:type,
        body: body,
        headers:headers
    });
    let resData = await res.text();
    return resData;
}

var common = {
    session: async function () {
        let result = await getRes('/session');
        return result;
    },
    getTimeString: function (time) {
        if (time === "") return "";

        if (typeof time === "string") {
            time = new Date(time);
        }
        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    },
    addZero: function (x, n) {
        while (x.toString().length < n) {
            x = '0' + x;
        }
        return x;
    },
    makeSearch: function (obj) {
        var result = {};
        for (var prop in obj) {
            if (obj[prop]) {
                result[prop] = obj[prop];
            }
        }
        return result;
    },
    ckbChange: function (headerId, name) {
        var isChecked = $('#' + headerId).is(":checked");
        $("input:checkbox[name='" + name + "']").prop("checked", isChecked);
    },
    showLoading: function () {
        var node = document.createElement('div');
        document.body.appendChild(node);
        node.outerHTML = '<div id="loadingImg" style="position: fixed;bottom: 0px;left: 0px;width: 100%;height: 100%;background-color: rgba(100,100,100,.3);z-index: 999;">' +
            '<img src="/img/loading.gif"style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);width: 30px;height: 30px;"></div>';

    },
    hideLoading: function () {
        var node = document.querySelector('#loadingImg');
        if (node) node.remove();
    }
}

