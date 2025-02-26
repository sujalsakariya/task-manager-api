const USER = require('./model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.read = async function (req, res, next) {
    try {  
       
        let data = await USER.find();

        res.status(200).json({
            status:'success',
            message:'read succescfully',
            data,
            
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}
exports.Signup = async function (req, res, next) {
    try {  
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new Error("Please enter valid name, email and password")
        }
        req.body.password = bcrypt.hashSync(password, 10)
        const newUser = await USER.insertMany(req.body)

        const token = jwt.sign({ id: newUser._id }, "ADMIN-TEST")

        res.status(201).json({
            data: newUser,
            token
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

exports.login = async function (req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("Please enter valid email and password")
        }

        const checkUser = await USER.findOne({email})

        if (!checkUser) {
            throw new Error("Please enter valid email");
        }

        const checkpass = bcrypt.compareSync(password, checkUser.password)

        if (!checkpass) {
            throw new Error("Please enter valid password")
        }

        const token = jwt.sign({ id: checkUser._id }, "ADMIN-TEST")

        res.status(200).json({
            data: checkUser,
            token
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}