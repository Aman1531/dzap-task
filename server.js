const express = require('express')
const {coinApi , coinListSource , coinListDest} = require('./api/coins.js')

const app = express()
const port = 3000

app.get('/fetchTopCoins', coinApi.fetchTopCoins)
app.get('/fetchCurrencies', coinApi.fetchCurrencies)
app.get('/convert/:amount.:source_currency.:target_currency' , coinApi.convert)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})