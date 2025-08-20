"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Using MongoDB Atlas replica set for real-time updates with change streams
const database = (io) => {
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB... listening for changes");
        const collection = db.collection("rooms");
        const changeStream = collection.watch();
        changeStream.on("change", async (change) => {
            try {
                const allDocuments = await collection.find({}).toArray();
                io.emit("data-updated", allDocuments);
            }
            catch (err) {
                console.error("Error fetching documents after change:", err);
            }
        });
        changeStream.on("error", (err) => {
            console.error("Change stream error:", err);
        });
        changeStream.on("close", () => {
            console.log("Change stream closed. Attempting to reconnect...");
        });
    });
};
exports.database = database;
