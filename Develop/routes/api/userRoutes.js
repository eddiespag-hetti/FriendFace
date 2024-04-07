const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
} = require('../../contollers/userController');



module.exports = router;