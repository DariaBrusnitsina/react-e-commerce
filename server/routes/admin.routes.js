const express = require('express')
const Admin = require('../models/Admin')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Admin.find()
        res.status(200).send(list)

    }catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

module.exports = router