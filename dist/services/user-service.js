"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repositories_1 = __importDefault(require("../repositories/user-repositories"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
class UserService {
    // Check if user exists
    async checkUserExist(email) {
        const user = await user_repositories_1.default.findByEmail(email);
        return user || false;
    }
    // Compare passwords
    async validatePassword(email, plainPassword) {
        const user = await user_repositories_1.default.findByEmail(email);
        if (!user)
            return false;
        return await comparePassword_1.default.passwordCompare(plainPassword, user.password);
    }
    // Register a new user
    async registerUser(data) {
        const { username, password, email } = data;
        const hashedPassword = await hashPassword_1.default.hashPasswod(password);
        const user = await user_repositories_1.default.createUser(username, email, hashedPassword);
        return user;
    }
}
exports.default = new UserService();
