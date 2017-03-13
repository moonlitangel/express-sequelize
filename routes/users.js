var models  = require('../models');
var express = require('express');
var router  = express.Router();
var hasher = require('wordpress-hash-node');
var passport = require('passport');
var auth = require('./auth');

router.get('/', function(req, res) {
  models.wd_users.findAll().then(function(wduser) {
    res.json(wduser);
  });
}); //유저 전체 불러오기

router.get('/userauth', function(req, res) {
  models.Userauth.findAll({
    order: 'id ASC',
    include: [{ 
      model: models.store,
      attributes: ['id', 'name']
    }, {
      model: models.wd_users,
      attributes: ['id', 'user_login', 'user_nickname']
    }]
  }).then(function(userauth) {
    res.json(userauth);
  });
}); // 유저 권한 불러오기 (가게 + 권한)

router.get('/auth', function(req, res) {
  models.wd_users.findAll({
    include: [{ 
      model: models.Userauth,
      attributes: ['id', 'auth']
    }]
  }).then(function(wduser) {
    res.json(wduser);
  });
}); // 권한 유저

router.get('/nick', function(req, res) {
  models.wd_users.findAll({
    attributes: ['id', 'user_nickname']
  }).then(function(wduser) {
    res.json(wduser);
  });
}); // 닉네임 불러오기 (추후 삭제)

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).send({error: error});
    models.Userauth.findOne({
      where: { wdUserId: user.id }
    }).then(function(userauth) {
      var token = auth.signToken(user.id, userauth.auth);
      res.json({ access_token: token, auth: userauth.auth, storeId: userauth.storeId });
    });
  })(req, res, next);
}); // 로그인 인증 후 토큰 반환

router.post('/auth/:user_id', function(req, res) {
  models.Userauth.create({
    auth: req.body.auth,
    storeId: req.body.storeId,
    wdUserId: req.params.user_id
  }).then(function() {
    res.json({result: '권한 부여'});
  });
}) // 권한 부여 생성 (추후 삭제)

router.post('/createwd', function(req, res) {
  var hash = hasher.HashPassword(req.body.password);
  models.wd_users.create({
    user_login: req.body.id,
    user_pass: hash,
    user_nickname: req.body.nickname
  }).then(function(user) {
    models.Userauth.create({
      auth: 'normal',
      wdUserId: user.id
    });
    res.json({result: '아이디가 생성됨'});
  });
});  // 계정 생성

router.put('/update', function(req, res) {
  models.Userauth.update(
    req.body, {
      where: { id: req.body.id }
    }).then((userauth) => {
      res.json({result:1});
  });
}); // 계정 권한 수정

router.delete('/:user_id/destroy', function(req, res) {
  models.wd_users.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.json({result: '아이디가 삭제됨'});
  });
}); // 계정 삭제

module.exports = router;
