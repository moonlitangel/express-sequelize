var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60*60; // 1 hour

// JWT 토큰 생성 함수
function signToken(id, auth) {
  return jwt.sign({id: id, auth: auth}, 'token_secret', {expiresIn: EXPIRES});
}

exports.signToken = signToken;