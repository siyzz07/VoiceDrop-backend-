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
exports.initializeSocket = void 0;
var socket_io_1 = require("socket.io");
var room_repositore_1 = require("../repositories/room_repositore");
var room_sevice_1 = require("../services/room-sevice");
var room_model_1 = require("../model/room-model");
var initializeSocket = function (httpServer) {
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: ["https://voicedrop.vercel.app"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", function (socket) {
        console.log("User connected: ".concat(socket.id));
        // Handle message receipt
        socket.on("give", function (msg) {
            socket.emit("message-received", "Server received: ".concat(msg));
        });
        // Send room data
        socket.on("get_data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, room_repositore_1.default.getRoomData()];
                    case 1:
                        data = _a.sent();
                        socket.emit("room_data", data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching room data:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // Handle joining a room
        socket.on("join-room", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var room, roomParticipants, usedId, error_2;
            var roomId = _b.roomId, userId = _b.userId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        socket.join(roomId);
                        return [4 /*yield*/, room_model_1.default.findOne({ roomId: roomId })];
                    case 1:
                        room = _c.sent();
                        if (!room) return [3 /*break*/, 4];
                        return [4 /*yield*/, room_sevice_1.default.addPrticipants(roomId, userId)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, room_sevice_1.default.roomUsers(roomId)];
                    case 3:
                        roomParticipants = _c.sent();
                        io.to(roomId).emit("users-data", roomParticipants);
                        _c.label = 4;
                    case 4:
                        usedId = socket.id;
                        socket.to(roomId).emit("user-joined", { usedId: usedId });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _c.sent();
                        console.error("Error handling join-room:", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        // Get users in the room
        socket.on("get-users", function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
            var roomParticipants, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, room_sevice_1.default.roomUsers(roomId)];
                    case 1:
                        roomParticipants = _a.sent();
                        io.to(roomId).emit("users-data", roomParticipants);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error fetching users:", error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // Exit from a room
        socket.on("exit-participant", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var roomParticipants, error_4;
            var roomId = _b.roomId, userId = _b.userId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, room_sevice_1.default.removeParticipant(roomId, userId)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, room_sevice_1.default.roomUsers(roomId)];
                    case 2:
                        roomParticipants = _c.sent();
                        console.log('roomParticipants :>> ', roomParticipants);
                        if (!((roomParticipants === null || roomParticipants === void 0 ? void 0 : roomParticipants.length) == 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, room_sevice_1.default.roomDelete(roomId)
                            //  io.to(roomId).emit('room-delete')
                        ];
                    case 3:
                        _c.sent();
                        //  io.to(roomId).emit('room-delete')
                        return [2 /*return*/];
                    case 4:
                        io.to(roomId).emit("users-data", roomParticipants);
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _c.sent();
                        console.error("Error handling exit-participant:", error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        // delete room 
        socket.on('delete-Room', function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, room_sevice_1.default.roomDelete(roomId)];
                    case 1:
                        _a.sent();
                        io.emit('roomDeleted');
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Error deleting room:', error_5);
                        socket.emit('error', { message: 'Failed to delete room', roomId: roomId });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        socket.on("roomRmovel", function (roomId) {
            io.to(roomId).emit("romovelCoundown");
        });
        // Handle disconnection
        socket.on("disconnect", function () {
            console.log("User disconnected: ".concat(socket.id));
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
