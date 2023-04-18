const express = require('express')
const Items = require('../models/Items')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Items.find()
        res.status(200).send(list)

    }catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

module.exports = router