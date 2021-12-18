let file = {
    upload: async function(){
        debugger;
        let transaction = await getRes('/transaction');
        let file_id = generateNewGuid();
        let my_file = getFileInput("_file");
        
        var upload_res = await uploadFile(my_file, file_id, transaction.id, transaction.token);
        var commit_res = await commitTransaction(my_file, file_id, transaction.id, transaction.token);
        var commit_str = commit_res.toString();
        commit_str = commit_str.substring(commit_str.indexOf("{"), commit_str.lastIndexOf("}") + 1);
        var commit_obj = JSON.parse(commit_str);
        console.log(commit_obj);
    },
    download: function(){
        
    }


}

function generateNewGuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxxxxxx4xxx8xxxxxxxxxxxxxxx'.replace(/x/g, randomDigit).toUpperCase();
}

function getFileInput(prop) {
    var file = document.getElementById(prop).files[0];
    if (file === undefined) {
        throw new Error("Please select a file to upload.");
    }
    return file;
}



async function uploadFile(file, file_id, transaction_id, token, chunk_size = 10000) {
    var results = [];
    var size = file.size;
    var start = 0;
    var end = 0;

    while (end < size - 1) {
        var end = start + chunk_size;
        if (size - end < 0) {
            end = size;
        }

        // get an array of headers for this upload request
        var headers = getUploadHeaders(escapeURL(file.name), start, end - 1, size, transaction_id, token);

        // make the request to upload this file content
        var upload_url = "http://192.168.0.4/innovatorServer/vault/odata/vault.UploadFile?fileId=" + file_id;
        var chunk = file.slice(start, end);
        var response = await httpRes("POST", upload_url, headers, chunk);
        results.push(response);

        start += chunk_size;
    }

    return Promise.all(results);
}

function escapeURL(url) {
    url = url.split('%').join('%25');
    url = url.split(' ').join('%20');
    url = url.split("'").join('%27');
    url = url.split('!').join('%21');
    url = url.split('"').join('%22');
    url = url.split('#').join('%23');
    url = url.split('$').join('%24');
    url = url.split('&').join('%26');
    url = url.split('(').join('%28');
    url = url.split(')').join('%29');
    url = url.split('*').join('%2A');
    url = url.split('+').join('%2B');
    url = url.split('?').join('%3F');

    return url;
}

function getUploadHeaders(escaped_name, start_range, end_range, file_size, transaction_id, token) {
    // start the upload headers array with a clone of the auth_headers array
    var headers = {
        "authorization": "Bearer " + token,
        "Content-Disposition": "attachment; filename*=utf-8''" + escaped_name,
        "Content-Range": "bytes " + start_range + "-" + end_range + "/" + file_size,
        "Content-Type": "application/octet-stream",
        "transactionid": transaction_id
    }
    return headers;
}

async function commitTransaction(file, file_id, transaction_id, token) {
    // build the headers and body for the commit request
    var boundary = "batch_" + file_id;
    var commit_headers = getCommitHeaders(boundary, transaction_id, token);
    var commit_url = "http://192.168.0.4/innovatorServer/vault/odata/vault.CommitTransaction";

    // it's important to use the \r\n end of line character, otherwise commit will fail
    var EOL = "\r\n";

    // build the commit body string
    var commit_body = "--";
    commit_body += boundary;
    commit_body += EOL;
    commit_body += "Content-Type: application/http";
    commit_body += EOL;
    commit_body += EOL;
    commit_body += "POST " + "http://192.168.0.4/innovatorServer/Server/odata/File HTTP/1.1";
    commit_body += EOL;
    commit_body += "Content-Type: application/json";
    commit_body += EOL;
    commit_body += EOL;
    commit_body += '{"id":"' + file_id + '",';
    commit_body += '"filename":"' + file.name + '",';
    commit_body += '"file_size":' + file.size + ',';
    commit_body += '"Located":[{"file_version":1,"related_id":"67BBB9204FE84A8981ED8313049BA06C"}]}';
    commit_body += EOL;
    commit_body += "--" + boundary + "--";

    // send the commit request to the vault server
    var result = await httpRes("POST", commit_url, commit_headers, commit_body);
    return result;
}

function getCommitHeaders(boundary, transaction_id, token) {
    var commit_headers ={
        "Content-Type": "multipart/mixed; boundary=" + boundary,
        "transactionid": transaction_id,
        "authorization": "Bearer " + token

    };
    return commit_headers;
}