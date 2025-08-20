"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../model/user-model"));
class UserRepositories {
    //--------------------------------------------
    async checkUsrExist(email) {
        let user = await user_model_1.default.findOne({ email: email });
        return user;
    }
    //----------------------------------------------
    async findUser(email) {
        let user = await user_model_1.default.findOne({ email: email });
        return user;
    }
    //--------------------------------------------
    async registerUser(data) {
        const { username, PasswordHash, email } = data;
        const saveUser = new user_model_1.default({
            name: username,
            password: PasswordHash,
            email: email,
        });
        let user = saveUser.save();
        return user;
    }
}
exports.default = new UserRepositories();
