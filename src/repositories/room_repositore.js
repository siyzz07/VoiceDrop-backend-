"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var room_model_1 = require("../model/room-model");
var uuid_1 = require("uuid");
var RoomRepositories = /** @class */ (function () {
    function RoomRepositories() {
    }
    //------- create room -----
    RoomRepositories.prototype.createRoom = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, topic, roomType, password, roomId, newRoom, room;
            return __generator(this, function (_a) {
                owner = values.owner, topic = values.topic, roomType = values.roomType, password = values.password;
                roomId = (0, uuid_1.v4)();
                if (roomType == "Private") {
                    password = (0, uuid_1.v4)();
                }
                newRoom = new room_model_1.default({
                    roomId: roomId,
                    owner: owner,
                    topic: topic,
                    type: roomType,
                    password: password,
                });
                room = newRoom.save();
                return [2 /*return*/, room];
            });
        });
    };
    //----- get room data ----------
    RoomRepositories.prototype.getRoomData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.find({})];
                    case 1:
                        room = _a.sent();
                        return [2 /*return*/, room];
                }
            });
        });
    };
    //---------------check the romm exist or not -------------
    RoomRepositories.prototype.getRoomExist = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.find({ roomId: roomId })];
                    case 1:
                        room = _a.sent();
                        if (room.length != 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //---------------- specific room users----------------
    RoomRepositories.prototype.getRoomUsers = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.findOne({ roomId: roomId }).populate("participants", "name")];
                    case 1:
                        room = _a.sent();
                        if (!room) {
                            console.log("Room not found");
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, room.participants];
                }
            });
        });
    };
    //-------------------- get datas of specific rooms
    RoomRepositories.prototype.getSpecificRoomData = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.findOne({ roomId: roomId }).populate("participants", "name")];
                    case 1:
                        room = _a.sent();
                        if (!room) {
                            console.log("Room not found");
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, room];
                }
            });
        });
    };
    //--------------------- add users to specific rooms
    RoomRepositories.prototype.addParticipants = function (roomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.findOne({ roomId: roomId })];
                    case 1:
                        room = _a.sent();
                        if (!room) {
                            return [2 /*return*/];
                        }
                        if (room.participants.includes(userId)) {
                            return [2 /*return*/];
                        }
                        room.participants.push(userId);
                        return [4 /*yield*/, room.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // remove user from particular room
    RoomRepositories.prototype.romovePaticipant = function (roomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.updateOne({ roomId: roomId }, { $pull: { participants: userId } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // delete specific room
    RoomRepositories.prototype.deleteRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_model_1.default.deleteOne({ roomId: roomId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RoomRepositories;
}());
exports.default = new RoomRepositories();
