"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const user_repositories_1 = __importDefault(require("../repositories/user-repositories"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
class UserServices {
    //-----------------------------------------chek user exist
    async checkUserExist(email) {
        const User = await user_repositories_1.default.checkUsrExist(email);
        if (User) {
            return User;
        }
        else {
            return false;
        }
    }
    //-------------------------------------------compare passowrd
    async comparePassword(eamil, passowrd) {
        let user = await user_repositories_1.default.findUser(eamil);
        let compare = await comparePassword_1.default.passwordCompare(passowrd, user?.password);
        return compare;
    }
    //------------------------------------------- register user
    async registerUser(data) {
        const { username, password, email } = data;
        const PasswordHash = await hashPassword_1.default.hashPasswod(password);
        const userData = { username, email, PasswordHash };
        const user = await user_repositories_1.default.registerUser(userData);
        return user;
    }
}
exports.default = new UserServices();
