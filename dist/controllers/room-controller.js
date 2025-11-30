"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_sevice_1 = __importDefault(require("../services/room-sevice"));
class RoomController {
    //-------- create a user -----------------
    async createRoom(req, res) {
        try {
            req.body.owner = req.user.userId;
            let addroom = await room_sevice_1.default.addRoom(req.body);
            if (addroom) {
                return res
                    .status(201)
                    .json({
                    message: "Room created successfuly",
                    roomId: addroom.roomId,
                });
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    //--------------------------------------------------------------------------check the roomexist or not
    async checkRoomExistandRoomUsers(req, res) {
        try {
            let roomId = req.params.roomId;
            let bool = await room_sevice_1.default.roomExists(roomId);
            let room = [];
            if (bool == true) {
                room = await room_sevice_1.default.getRoomData(roomId);
            }
            return res.json({ check: bool, room: room });
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.default = new RoomController();
