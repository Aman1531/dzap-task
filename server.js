const express = require('express')

const app = express()
const port = 3001

app.use(require('./routes/routes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})