"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_repositore_1 = __importDefault(require("../repositories/room_repositore"));
class RoomService {
    // Create room
    async addRoom(data) {
        return await room_repositore_1.default.createRoom(data);
    }
    // Check room existence
    async roomExists(roomId) {
        return await room_repositore_1.default.roomExists(roomId);
    }
    // add users to specific room
    async addParticipant(roomId, userId) {
        return await room_repositore_1.default.addParticipant(roomId, userId);
    }
    // Get users of a room
    async getRoomUsers(roomId) {
        return await room_repositore_1.default.getRoomUsers(roomId);
    }
    // Remove participant
    async removeParticipant(roomId, userId) {
        return await room_repositore_1.default.removeParticipant(roomId, userId);
    }
    // Get specific room data
    async getRoomData(roomId) {
        return await room_repositore_1.default.getRoomById(roomId);
    }
    // Delete room --
    async deleteRoom(roomId) {
        return await room_repositore_1.default.deleteRoom(roomId);
    }
    // Get all rooms
    async getAllRooms() {
        return await room_repositore_1.default.getAllRooms();
    }
}
exports.default = new RoomService();
