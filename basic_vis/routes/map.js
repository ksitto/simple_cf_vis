var express = require('express');
var router = express.Router();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var owfCreds = appEnv.getServiceCreds(/owf.*/);
var owfUrl = owfCreds ? owfCreds["url"] : 'localhost';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', { title: 'map', owfUrl: owfUrl });
});

module.exports = router;
