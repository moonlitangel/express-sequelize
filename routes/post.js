var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

  models.post.findAll().then(function(post) {
    res.json(post);
  });


}); // 댓글 전체 불러오기


router.post('/', function(req, res) {
  models.post.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category
  }).then(function() {
    res.json({result: '공지 생성됨'});
  });
});



// router.get('/review/:store_id', function(req, res) {
//   models.store_reply.findAll({
//     order: 'id DESC',
//     where: {storeId: req.params.store_id},
//     include: [{
//       model: models.reply,
//       include: [{
//         model: models.user,
//         attributes: ['user_nickname']
//       }],
//       attributes: ['id', 'content']
//     }, {
//       model: models.user,
//       attributes: ['id', 'user_nickname']
//     }, {
//       model: models.replyImage,
//       attributes: ['id', 'img']
//     }]
//   }).then(function(reply) {
//     res.json(reply);
//   });
// }); // 가게별 댓글 불러오기
//
// router.get('/review/user/:user_id', function(req, res) {
//   models.store_reply.findAll({
//     order: 'id DESC',
//     where: {userId: req.params.user_id},
//     include: [{
//       model: models.reply,
//       include: [{
//         model: models.user,
//         attributes: ['user_nickname']
//       }],
//       attributes: ['id', 'content']
//     }, {
//       model: models.user,
//       attributes: ['id', 'user_nickname']
//     }, {
//       model: models.replyImage,
//       attributes: ['id', 'img']
//     }]
//   }).then(function(reply) {
//     res.json(reply);
//   });
// }); // 가게별 댓글 불러오기
//
// router.post('/:reply_id/reply/:user_id', function(req, res) {
//   models.reply.create({
//     content: req.body.content,
//     storeReplyId: req.params.reply_id,
//     userId: req.params.user_id
//   }).then(function() {
//     res.json({result: '댓글생성'});
//   }).catch(function(error) {
//     res.json(error);
//   });
// });

// router.get('/user/:user_id', function(req, res) {
//   models.store.findAll({
//     where: {wdUserId: req.params.user_id}
//   }).then(function(reply) {
//     res.json(reply);
//   });
// }); // 유저별 댓글 불러오기
//
// router.post('/:store_id/review/:user_id', function(req, res) {
//   models.store_reply.create({
//     content: req.body.content,
//     star: req.body.star,
//     storeId: req.params.store_id,
//     userId: req.params.user_id
//   }).then(function(review) {
//     res.json(review);
//   }).catch(function(error) {
//     res.json({error: error});
//   });
// }); // 댓글 생성
//
// router.post('/image', function(req, res) {
//   models.replyImage.create({
//     img: req.body.img,
//     storeReplyId: req.body.storeReplyId
//   }).then(function() {
//     res.json({result: '생성되었습니다.'});
//   }).catch(function(error) {
//     res.json({error: error});
//   });
// }); // 사진

// router.put('/update', function(req, res) {
//   models.store_reply.update(
//     req.body, {
//       where: {wdUserId: req.body.wdUserId, id: req.body.id}
//     }).then((store) => {
//       res.json({result:1});
//   });
// }); // 댓글 수정
//
// router.delete('/:store_id/reply/:reply_id/destroy', function (req, res) {
//   //jwt으로 유저id확인해서 where에 wdUserId를 집어넣어줍니다.
//   models.store_reply.destroy({
//     where: {
//       id: req.params.reply_id,
//       storeId: req.params.store_id
//     }
//   }).then(function() {
//     res.json({result: '삭제되었습니다'});
//   });
// });


module.exports = router;
