var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/:store_id', function(req, res) {
  models.menu.findAll({
    where: {storeId: req.params.store_id},
  }).then(function(menu) {
    res.json(menu);
  });
});

router.post('/create/:store_id', function(req, res) {
  models.menu.create({
    name: req.body.name,
    price: req.body.price,
    storeId: req.params.store_id,
  }).then(function() {
    res.json({result: '메뉴 생성됨'});
  });
});

router.put('/update', function(req, res) {
  models.menu.update(
    req.body, {
      where: {storeId: req.body.storeId, id: req.body.id}
    }).then((menu) => {
      res.json({result:1});
  });
}); // 메뉴 수정

router.delete('/destroy/:menu_id', function (req, res) {
  models.menu.destroy({
    where: {
      id: req.params.menu_id
    }
  }).then(function() {
    res.json({result: '삭제되었습니다'});
  });
});

module.exports = router;
