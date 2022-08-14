const express = require('express');
const userControls = require("../controllers/userController");


const userRoutes = require('express').Router();

//-- create CRUD routes for user --//

userRoutes.get('/allusers', userControls.getAllUsers);

userRoutes.post('/createuser', userControls.createUser);

userRoutes.put('/updateuser', userControls.updateUser);

userRoutes.delete('/deleteuser', userControls.deleteUser);



module.exports = userRoutes;