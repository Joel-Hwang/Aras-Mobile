let express = require('express');
let session = require('express-session');
let svc = require('../service/svcLogin');
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


router.post('/login', async function (req, res) {
  let id = req.body.userId;
  let pw = req.body.userPw;
  let result = await svc.login(id,pw);
  if(result == null) res.send({ status: 500 });

  req.session.keyed_name = result.keyed_name;
  req.session.userId = result.login_name;
  req.session.pw = pw;

  res.send({ 
    status: 200,
    userId:req.session.userId, 
    keyed_name:req.session.keyed_name 
  });
 
});

router.post('/logout', async function (req, res) {
  //let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send('');
});



module.exports = router;