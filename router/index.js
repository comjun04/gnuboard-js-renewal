const express = require('express')
const router = express.Router()

const index = require('../script/index')

router.all('/', (req, res) => {
  req.userData = {}
  let data = index(req, res)
  res.render('index', {data, sharedData: req.userData})
})

module.exports = router
