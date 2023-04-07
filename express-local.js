var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
var fs = require('fs');
let commonSvc = require('./service/svcCommon');
let util = require('./com/com');
const http = require('http').createServer(app);


global.apiServer = "http://203.228.101.197/digitalpcc/server/odata";
global.authServer = "http://203.228.101.197/digitalpcc/oauthserver/connect/token";
global.databaseName = "DigitalPCC_Test";
//global.apiServer = rootServer + "/server/odata";
//global.authServer = rootServer + "/oauthserver/connect/token";
//global.databaseName = "InnovatorSolutions";


app.locals.pretty = true;
app.use(cors({
    origin:['http://localhost:3000', 'http://203.228.117.46:3000'],
    credentials: true
  }));
app.use(express.static('view'));

app.use('/', require('./controller/ctrCommon'));
app.use('/', require('./controller/ctrLogin'));

app.get('/', function (req, res) {
    if (req.session.userId) {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + '/view/main.html'));
        return;
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + '/view/login.html'));
});

app.get('/main', function (req, res) {
    if (!req.session.userId) {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + '/view/login.html'));
        return;
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + '/view/main.html'));
});

app.get('/arasbody/:itemTypeId', async function (req, res) {
    if (!req.session.userId) {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + '/view/login.html'));
        return;
    }
    let token = await util.getToken(req);
    let itemTypeId = req.params.itemTypeId;
    let itemType = await commonSvc.getItemType(token, itemTypeId);
    let fileName = '';
    if (fs.existsSync(__dirname + '/view/' + itemType.name + '/detail.html')) {
        fileName = itemType.name + '/detail';
    } else {
        fileName = 'detail';
    }


    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + '/view/' + fileName + '.html'));
});

app.get('/view/:itemTypeId', async function (req, res) {
    if (!req.session.userId) {
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname + '/view/login.html'));
        return;
    }
    let token = await util.getToken(req);
    let itemTypeId = req.params.itemTypeId;
    let itemType = await commonSvc.getItemType(token, itemTypeId);
    let fileName = '';
    if (fs.existsSync(__dirname + '/view/' + itemType.name + '/search.html')) {
        fileName = itemType.name + '/search.html';
    } else {
        fileName = 'search';
    }


    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + '/view/' + fileName + '.html'));
});

http.listen(9000, async function () {

    console.log('9000 connected');
});