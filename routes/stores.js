var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.store.findAll({
    include: [{ 
      model: models.tag,
      attributes: ['name']
    }, {
      model: models.storeImage,
      attributes: ['img']
    }, {
      model: models.like,
      attributes: ['id']
    }, {
      model: models.store_reply,
      attributes: ['id', 'star']
    }]
  }).then(function(stores) {
    return Promise.all(stores.map((store) => {
      store.likeCount = store.likes.length;
      store.replyCount = store.store_replies.length;
      return store;
    }));
  }).then((store) => {
    console.log('완료');
    res.json(store);
  });
}); // 스토어 전체 불러오기

router.get('/count', function(req, res) {
  models.store.count().then(function(count) {
    res.json(count);
  })
})

// router.get('/category/:category', function(req, res) {
//   models.store.findAll({
//     where: {category: req.params.category}
//   }).then(function(stores) {
//     res.json(stores);
//   });
// }); // 스토어 카테고리별로 불러오기

// router.get('/detail/:id', function(req, res) {
//   models.store.findOne({
//     where: {id: req.params.id},
//     include: [ models.store_reply ]
//   }).then(function(stores) {
//     res.json(stores);
//   });
// }); // 가게 상세 정보 불러오기

router.get('/simple', function(req, res) {
  models.store.findAll({
    attributes: ['id', 'name']
  }).then(function(stores) {
    res.json(stores);
  });
}); // 가게 간단한 정보 불러오기 (가게 권한 부여에서 사용)

// router.get('/search/:name', function(req, res) {
//   models.store.findOne({
//     where: {name: req.params.name}
//   }).then(function(stores) {
//     res.json(stores);
//   });
// }); // 스토어 한개 불러오기 (검색)

// router.get('/store/:name', function(req, res) {
//   models.store.findOne({
//     where: {name: req.params.name},
//     include: [ models.store_reply ]
//   }).then(function(stores) {
//     res.json(stores);
//   });
// }); // 스토어 한개 불러오기(댓글 포함) - 바꿀 예정

router.post('/create', function(req, res) {
  models.store.create({
    name: req.body.name,
    addr: req.body.addr,
    tel: req.body.tel,
    category: req.body.category,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    intro: req.body.intro,
    weekendOpen: req.body.weekendOpen,
    weekendClose: req.body.weekendClose,
    couponName: req.body.couponName,
    couponAmount: req.body.couponAmount,
    lat: req.body.lat,
    lng: req.body.lng,
    imgsMenu: req.body.imgsMenu
  }).then(function() {
    res.json({result: '생성되었습니다.'});
  });
}); // 스토어 생성

router.post('/createtag', function(req, res) {
  models.tag.create({
    storeId: req.body.storeId,
    name: req.body.name
  }).then(function() {
    res.json({result: '태그생성'});
  });
})

router.post('/createimg', function(req, res) {
  models.storeImage.create({
    storeId: req.body.storeId,
    img: req.body.img
  }).then(function() {
    res.json({result: '이미지등록'});
  });
})

router.get('/favorite/:storeId/:userId', function(req, res) {
  models.favorite.findAll({
    where: { 
      userId: req.params.userId,
      storeId: req.params.storeId
    }
  }).then(function(favorite) {
    res.json(favorite);
  })
})



router.put('/update', function(req, res) {
  models.store.update(
    req.body, {
      where: {id: req.body.id, name: req.body.name}
    }).then((store) => {
      res.json({result:1});
  });
}); // 스토어 수정

router.delete('/destroy/:store_id', function (req, res) {
  models.store.destroy({
    where: {
      id: req.params.store_id
    }
  }).then(function() {
    res.json({result: '삭제되었습니다'});
  });
});


module.exports = router;
