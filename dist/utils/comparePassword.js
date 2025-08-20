"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class ComparePassword {
    async passwordCompare(passowrd, hashPasswod) {
        const match = await bcrypt.compare(passowrd, hashPasswod);
        if (match) {
            console.log("Passwords match!");
            return true;
        }
        else {
            console.log("Passwords do not match.");
            return false;
        }
    }
}
exports.default = new ComparePassword();
