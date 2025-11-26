"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../model/user-model"));
class UserRepository {
    // Check if a user exists by email
    async findByEmail(email) {
        return await user_model_1.default.findOne({ email });
    }
    // Create a new user
    async createUser(username, email, hashedPassword) {
        const newUser = new user_model_1.default({
            name: username,
            email,
            password: hashedPassword,
        });
        return await newUser.save();
    }
}
exports.default = new UserRepository();
