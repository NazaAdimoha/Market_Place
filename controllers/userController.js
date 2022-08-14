const express = require("express");
const userServices = require("../services/userServices");

const userControls = {
  async getAllUsers(req, res) {
    try {
      const users = await userServices.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(404).res.json({ message: "Error getting all users" });
    }
  },
  async createUser(req, res) {
    try {
        const user = await userServices.createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).res.json({ message: "Error creating user" });
    }
  },
  async updateUser(req, res) {
    try {
        const user = await userServices.updateUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).res.json({ message: "Error updating user" });
    }
  },
  async deleteUser(req, res) {
    try {
        const user = await userServices.deleteUser(email);
        res.json(user);
    } catch (error) {
        res.status(500).res.json({ message: "Error deleting user" });
    }
  },
};

module.exports = userControls;
