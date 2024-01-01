var express = require('express');
const {coinApi , coinListSource , coinListDest} = require('../api/coins.js')
var router = express.Router();

router.get('/fetchTopCoins', coinApi.fetchTopCoins)
router.get('/fetchCurrencies', coinApi.fetchCurrencies)
router.get('/convert/:amount.:source_currency.:target_currency' , coinApi.convert)

module.exports = router;
