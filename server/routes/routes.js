const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/items', require('./items.routes'))
router.use('/categories', require('./categories.routes'))


module.exports = router