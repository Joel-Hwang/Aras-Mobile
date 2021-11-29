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


router.get('/menu/list', async function (req, res) {
  let id = req.session.userId||'';
  let result = await svc.getMenuList(id);

  res.send({ 
    status: 200,
    menulist:result
  });
 
});

router.post('/logout', async function (req, res) {
  //let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send('');
});



module.exports = router;