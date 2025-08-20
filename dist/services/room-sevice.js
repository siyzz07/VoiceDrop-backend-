"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_repositore_1 = __importDefault(require("../repositories/room_repositore"));
class RoomService {
    //--------add room---------
    async addRoom(values) {
        let room = await room_repositore_1.default.createRoom(values);
        return room;
    }
    //------ check the room exist or not
    async roomExistCheck(roomId) {
        let checkValue = await room_repositore_1.default.getRoomExist(roomId);
        return checkValue;
    }
    // -----------------add users to specific room
    async addPrticipants(roomId, userId) {
        await room_repositore_1.default.addParticipants(roomId, userId);
    }
    //----------------take specific room users
    async roomUsers(roomId) {
        let users = await room_repositore_1.default.getRoomUsers(roomId);
        return users;
    }
    // ----------------- remove participants from particular room
    async removeParticipant(roomId, userId) {
        await room_repositore_1.default.romovePaticipant(roomId, userId);
    }
    //-------------------- get datas of specific rooms
    async specificRoomdata(roomId) {
        let room = await room_repositore_1.default.getSpecificRoomData(roomId);
        return room;
    }
    // ------------------------------------ Delete room service
    async roomDelete(roomId) {
        await room_repositore_1.default.deleteRoom(roomId);
    }
}
exports.default = new RoomService();
