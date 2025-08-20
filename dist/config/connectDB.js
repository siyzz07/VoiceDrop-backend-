"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", true);
        const Mongodb_URL = process.env.MONGODB_URL || "";
        await mongoose_1.default.connect(Mongodb_URL);
        console.log("database connected.....");
    }
    catch (error) {
        console.log("error to connect database");
    }
};
exports.default = connectDB;
