const userModel = require('../models/userModel');

const userServices = {
    async getAllUsers() {
        const users = await userModel.find();
        return users;
    },
    async createUser(data) {
        const user = new userModel(data);
        return await user.save()
    },
    async updateUser(data) {
        const user = await userModel.findOneAndUpdate({email: data.email}, data);
        return user;
    },
    async deleteUser(data) {
        const user = await userModel.findOneAndDelete({email: data.email});
        return user;
    }
}

module.exports =  userServices ;

