const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.patch('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId

        if (userId === req.body._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
            res.status(200).send(updatedUser)
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

router.delete('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const removedUser = await User.findById(userId)

        if (removedUser.userId.toString() === req.user._id) {
            await removedUser.remove()
            return res.send(null)
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    }catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const list = await User.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})


module.exports = router