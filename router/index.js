const express = require('express')
const router = express.Router()

const index = require('../script/index')

router.all('/', async (req, res) => {
  req.userData = {}
  let data = await index(req, res)
  //console.log(data) // debug
  res.render('index', {data, sharedData: req.userData})
})

module.exports = router
