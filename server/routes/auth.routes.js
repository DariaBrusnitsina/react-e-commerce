const express = require('express')
const router = express.Router({mergeParams: true})
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require("../models/User")
const TokenService = require('../services/token.service')


router.post('/signUp', [
    check('email', 'Uncorrected email').isEmail(),
    check('password', 'Min length is 8').isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                })
            }
            const {email, password } = req.body
            const existingUser = await User.findOne({email})

            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL EXISTS",
                        code: 400
                    }
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            console.log(req.body)

            const newUser = await User.create({
                ...req.body,
                password: hashedPassword
            })

            const tokens = TokenService.generate({_id: newUser._id})
            await TokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({...tokens, userId: newUser._id })
        }catch (e) {
            res.status(500).json({
                message: "Server error. Try again later..."
            })
        }
    }])

router.post('/signInWithPassword', [
    check('email', 'Uncorrected email').normalizeEmail().isEmail(),
    check('password', 'add pass').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                })
            }
            const {email, password} = req.body
            const existingUser = await User.findOne({email})

            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL NOT FOUND",
                        code: 400
                    }
                })
            }

            const isPassworsEqual = await bcrypt.compare(password, existingUser.password)

            if (!isPassworsEqual) {
                return res.status(400).json({
                    error: {
                        message: "INVALID PASSWORD",
                        code: 400
                    }
                })
            }
            const tokens = TokenService.generate({_id: existingUser._id})
            await TokenService.save(existingUser._id, tokens.refreshToken)
            res.status(201).send({...tokens, userId: existingUser._id })
        }catch (e) {
            res.status(500).json({
                message: "Server error. Try again later..."
            })
        }
    }])

function isTokenInvalid (data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', [async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body
        const data = TokenService.validateRefresh(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)

        if (isTokenInvalid (data, dbToken)) {
            return res.status(401).json({
                error: {
                    message: "Unauthorized",
                    code: 401
                }
            })
        }

        const tokens = TokenService.generate({_id: data._id})
        await TokenService.save( data._id, tokens.refreshToken)

        res.status(201).send({...tokens, userId: data._id})
    }catch (e) {
        res.status(500).json({
            message: "Server error. Try again later..."
        })
    }

}])
module.exports = router