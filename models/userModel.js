const express = require('express');

const mongoose = require('mongoose');

//-- create schema for user --//
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);

module.exports =  userModel ;