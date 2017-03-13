var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.store_reply.findAll().then(function(reply) {
    res.json(reply);
  });
}); // 댓글 전체 불러오기

router.get('/store/:store_id', function(req, res) {
  models.store_reply.findAll({
    where: {storeId: req.params.store_id}
  }).then(function(reply) {
    res.json(reply);
  });
}); // 가게별 댓글 불러오기

router.get('/reply/:store_id', function(req, res) {
  models.store_reply.findAll({
    where: {storeId: req.params.store_id},
    include: [{ 
      model: models.store,
      attributes: ['id', 'name']
    }, {
      model: models.wd_users,
      attributes: ['id', 'user_nickname']
    }]
  }).then(function(reply) {
    res.json(reply);
  });
}); // 가게별 댓글 불러오기

router.get('/user/:user_id', function(req, res) {
  models.store.findAll({
    where: {wdUserId: req.params.user_id}
  }).then(function(reply) {
    res.json(reply);
  });
}); // 유저별 댓글 불러오기

router.post('/:store_id/reply/:user_id', function(req, res) {
  models.store_reply.create({
    content: req.body.content,
    star: req.body.star,
    storeId: req.params.store_id,
    wdUserId: req.params.user_id
  }).then(function() {
    res.json({result: '생성되었습니다.'});
  }).catch(function(error) {
    res.json({error: error});
  });
}); // 댓글 생성

router.put('/update', function(req, res) {
  models.store_reply.update(
    req.body, {
      where: {wdUserId: req.body.wdUserId, id: req.body.id}
    }).then((store) => {
      res.json({result:1});
  });
}); // 댓글 수정

router.delete('/:store_id/reply/:reply_id/destroy', function (req, res) {
  //jwt으로 유저id확인해서 where에 wdUserId를 집어넣어줍니다.
  models.store_reply.destroy({
    where: {
      id: req.params.reply_id,
      storeId: req.params.store_id
    }
  }).then(function() {
    res.json({result: '삭제되었습니다'});
  });
});


module.exports = router;
