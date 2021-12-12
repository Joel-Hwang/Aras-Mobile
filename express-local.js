var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
var fs = require('fs');
let commonSvc = require('./service/svcCommon');
let util = require('./com/com');
const http = require('http').createServer(app);

//global.apiServer = "http://203.228.101.197/digitalpcc/server/odata";
//global.authServer = "http://203.228.101.197/digitalpcc/oauthserver/connect/token";
//global.databaseName = "DigitalPCC_Test";
global.apiServer = "http://192.168.0.4/innovatorServer/server/odata";
global.authServer = "http://192.168.0.4/innovatorServer/oauthserver/connect/token";
global.databaseName = "InnovatorSolutions";


app.locals.pretty = true;
app.use(cors());
app.use(express.static('view'));

app.use('/', require('./controller/ctrCommon'));
app.use('/', require('./controller/ctrLogin'));

app.use(
    session({
        secret: '@#@$MYSIGN#@$#$',
        resave: false,
        saveUninitialized: true,
    })
);

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
    if (fs.existsSync(__dirname + '/view/' + itemType.name + '.html')) {
        fileName = itemType.name;
    } else {
        fileName = 'arasbody';
    }

    
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + '/view/' + fileName + '.html'));
});

http.listen(9000, async function () {

    console.log('9000 connected');
});