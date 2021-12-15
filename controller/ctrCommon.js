let express = require('express');
let session = require('express-session');

let svc = require('../service/svcCommon');
let util = require('../com/com');
let router = express.Router();
router.use(express.json());
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

router.get('/transaction', async (req,res) =>{
  let token = await util.getToken(req);
  let result = await svc.getTransaction(token);
  res.send(token);
});

router.get('/menu/list', async function (req, res) {
  let token = await util.getToken(req);
  let result = await svc.getMenuList(token, req.session.userId);

  res.send({
    status: 200,
    menulist: result
  });

});

router.get('/form/:itemTypeId', async function (req, res) {
  let token = await util.getToken(req);
  let itemTypeId = req.params.itemTypeId;
  let classification = req.body.classification;
  let result = await svc.getForm(token, itemTypeId, classification);

  res.send({
    status: 200,
    data: result
  });

});

router.get('/permission/:itemTypeId', async function (req, res) {
  let token = await util.getToken(req);
  let userId = req.session.userId;
  let itemTypeId = req.params.itemTypeId;

  let result = await svc.getPermission(token, userId, itemTypeId);

  res.send({
    status: 200,
    data: result
  });

});



router.post('/logout', async function (req, res) {
  //let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send('');
});



module.exports = router;