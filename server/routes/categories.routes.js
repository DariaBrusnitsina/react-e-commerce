const express = require('express')
const Categories = require('../models/Categories')
const Items = require("../models/Items");
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

router.post('/', async (req, res) => {
    try {
        const newCategory = await Categories.create({
            ...req.body
        });
        res.status(201).send(newCategory);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

router.patch('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Categories.findById(categoryId);
        for (let key in req.body) {
            category[key] = req.body[key];
        }
        await category.save();
        return res.send(category);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

router.delete('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const removedCategory = await Categories.findById(categoryId);
        await removedCategory.remove();
        return res.send(null);
    } catch (error) {
        res
            .status(500)
            .json({ message:"Server error. Try again later..." });
    }
})

module.exports = router