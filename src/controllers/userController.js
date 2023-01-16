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
    const {email, address, zipcode, interests} =req.body;
    try {
        await User.updateOne({email: email}, { $set: {address: address, zipcode: zipcode, interests: interests}}).exec();
        res.status(201).json({
            message: 'User updated successfully'
        });
    } catch(err) {
        console.error(err);
    }
}

module.exports = {getAllUsers, updateUser}