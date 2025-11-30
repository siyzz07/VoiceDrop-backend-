"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repositories_1 = __importDefault(require("../repositories/user-repositories"));
class UserService {
    // Check if user exists
    async checkUserExist(email) {
        const user = await user_repositories_1.default.findByEmail(email);
        return user || false;
    }
}
exports.default = new UserService();
