const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/items', require('./items.routes'))

module.exports = router