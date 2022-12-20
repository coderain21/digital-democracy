const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch(err) {
        console.error(err)
    }
}

// only updates address, zipcode, interests
const updateUser = async (req, res) => {
    const {address, zipcode, interests} =req.body;
    try {
        await User.updateOne({email: req.email}, { $set: {address: address, zipcode: zipcode, interests: interests}}).exec();
        res.status(201).json({
            message: 'User updated successfully'
        });
    } catch(err) {
        console.error(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.email}).exec();
        if (!user) {
            return res.status(204).json({message: "User not found"});
        }
        res.status(200).json({email: user.email, address: user.address, zipcode: user.zipcode, interests: user.interests, message: "User found"});
    } catch(err) {
        console.error(err);
    }
}

module.exports = {getAllUsers, updateUser, getUser}