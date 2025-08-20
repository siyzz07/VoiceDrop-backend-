"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../model/room-model"));
const uuid_1 = require("uuid");
class RoomRepositories {
    //------- create room -----
    async createRoom(values) {
        let { owner, topic, roomType, password } = values;
        const roomId = (0, uuid_1.v4)();
        if (roomType == "Private") {
            password = (0, uuid_1.v4)();
        }
        const newRoom = new room_model_1.default({
            roomId,
            owner,
            topic,
            type: roomType,
            password,
        });
        let room = newRoom.save();
        return room;
    }
    //----- get room data ----------
    async getRoomData() {
        let room = await room_model_1.default.find({});
        return room;
    }
    //---------------check the romm exist or not -------------
    async getRoomExist(roomId) {
        let room = await room_model_1.default.find({ roomId: roomId });
        if (room.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }
    //---------------- specific room users----------------
    async getRoomUsers(roomId) {
        const room = await room_model_1.default.findOne({ roomId }).populate("participants", "name");
        if (!room) {
            console.log("Room not found");
            return;
        }
        return room.participants;
    }
    //-------------------- get datas of specific rooms
    async getSpecificRoomData(roomId) {
        const room = await room_model_1.default.findOne({ roomId }).populate("participants", "name");
        if (!room) {
            console.log("Room not found");
            return;
        }
        return room;
    }
    //--------------------- add users to specific rooms
    async addParticipants(roomId, userId) {
        const room = await room_model_1.default.findOne({ roomId: roomId });
        if (!room) {
            return;
        }
        if (room.participants.includes(userId)) {
            return;
        }
        room.participants.push(userId);
        await room.save();
    }
    // remove user from particular room
    async romovePaticipant(roomId, userId) {
        await room_model_1.default.updateOne({ roomId }, { $pull: { participants: userId } });
    }
    // delete specific room
    async deleteRoom(roomId) {
        await room_model_1.default.deleteOne({ roomId: roomId });
        return;
    }
}
exports.default = new RoomRepositories();
