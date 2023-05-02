const express = require('express')
const Items = require('../models/Items')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Items.find()
        res.status(200).send(list)

    } catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const newItem = await Items.create({
            ...req.body
        });
        res.status(201).send(newItem);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

router.patch('/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Items.findById(itemId);
        for (let key in req.body) {
            item[key] = req.body[key];
        }
        await item.save();
        return res.send(item);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

router.delete('/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const removedItem = await Items.findById(itemId);
        await removedItem.remove();
        return res.send(null);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

module.exports = router