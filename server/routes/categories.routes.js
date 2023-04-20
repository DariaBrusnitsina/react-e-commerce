const express = require('express')
const Categories = require('../models/Categories')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Categories.find()
        res.status(200).send(list)

    }catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

module.exports = router