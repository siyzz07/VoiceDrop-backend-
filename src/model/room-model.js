"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RoomSchema = new mongoose_1.Schema({
    roomId: { type: String },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    type: { type: String, required: true, enum: ["Open", "Private"] },
    password: { type: String },
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
var Room = (0, mongoose_1.model)("Room", RoomSchema);
exports.default = Room;
