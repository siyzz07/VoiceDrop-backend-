"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../model/room-model"));
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
class RoomRepository {
    // Create a new room
    async createRoom({ owner, topic, roomType, password }) {
        const roomId = (0, uuid_1.v4)();
        // Auto-generate password for private room
        if (roomType === "Private") {
            password = (0, uuid_1.v4)();
        }
        const room = new room_model_1.default({
            roomId,
            owner,
            topic,
            type: roomType,
            password,
        });
        return await room.save();
    }
    // Get all rooms
    async getAllRooms() {
        return await room_model_1.default.find({});
    }
    // Check if room exists
    async roomExists(roomId) {
        const room = await room_model_1.default.findOne({ roomId });
        return !!room;
    }
    // Get participants of a specific room
    async getRoomUsers(roomId) {
        const room = await room_model_1.default.findOne({ roomId }).populate("participants", "name");
        return room?.participants || null;
    }
    // Get full room data
    async getRoomById(roomId) {
        return await room_model_1.default.findOne({ roomId }).populate("participants", "name");
    }
    // Add participant to room
    async addParticipant(roomId, userId) {
        const room = await room_model_1.default.findOne({ roomId });
        if (!room)
            return null;
        if (!room.participants.some((id) => id.toString() === userId)) {
            room.participants.push(new mongoose_1.default.Types.ObjectId(userId));
            await room.save();
        }
        return room;
    }
    // Remove participant
    async removeParticipant(roomId, userId) {
        return await room_model_1.default.updateOne({ roomId }, { $pull: { participants: userId } });
    }
    // Delete room
    async deleteRoom(roomId) {
        return await room_model_1.default.deleteOne({ roomId });
    }
}
exports.default = new RoomRepository();
