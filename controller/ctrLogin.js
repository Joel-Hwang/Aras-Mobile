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

  req.session.email = result.value[0].email;
  req.session.keyed_name = result.value[0].keyed_name;
  req.session.login_name = result.value[0].login_name;
  req.session.pw = pw;

  res.send({ 
    status: 200,
    email:req.session.email, 
    login_name:req.session.login_name, 
    keyed_name:req.session.keyed_name 
  });
 
});

router.post('/logout', async function (req, res) {
  //let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send('');
});



module.exports = router;