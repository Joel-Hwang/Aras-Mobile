let express = require('express');
let svc = require('../service/svcLogin');
let util = require('../com/com');
let router = express.Router();
router.use(express.json());
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));
util.session(router);
router.post('/login', async function (req, res) {
  let id = req.body.userId;
  let pw = req.body.userPw;
  let result = await svc.login(id, pw);
  if (result == null) {
    res.status(500).send('wrong Information');
    return;
  }
  req.session.keyed_name = result.keyed_name;
  req.session.userId = result.login_name;
  req.session.pw = pw;
  req.session.save();

  res.status(200).send({
    userId: req.session.userId,
    keyed_name: req.session.keyed_name,
    token:result.token,
    cookie: {
      secure: false,
      httpOnly: false,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 1000
    },
  });

});

router.post('/logout', async function (req, res) {
  //let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send('');
});



module.exports = router;