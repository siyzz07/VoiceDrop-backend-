"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const room_repositore_1 = __importDefault(require("../repositories/room_repositore"));
const room_sevice_1 = __importDefault(require("../services/room-sevice"));
const room_model_1 = __importDefault(require("../model/room-model"));
const initializeSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: ["https://voicedrop.vercel.app"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        // Handle message receipt
        socket.on("give", (msg) => {
            socket.emit("message-received", `Server received: ${msg}`);
        });
        // Send room data
        socket.on("get_data", async () => {
            try {
                const data = await room_repositore_1.default.getRoomData();
                socket.emit("room_data", data);
            }
            catch (error) {
                console.error("Error fetching room data:", error);
            }
        });
        // Handle joining a room
        socket.on("join-room", async ({ roomId, userId }) => {
            try {
                socket.join(roomId);
                const room = await room_model_1.default.findOne({ roomId });
                if (room) {
                    await room_sevice_1.default.addPrticipants(roomId, userId);
                    const roomParticipants = await room_sevice_1.default.roomUsers(roomId);
                    io.to(roomId).emit("users-data", roomParticipants);
                }
                // Notify other users
                const usedId = socket.id;
                socket.to(roomId).emit("user-joined", { usedId });
            }
            catch (error) {
                console.error("Error handling join-room:", error);
            }
        });
        // Get users in the room
        socket.on("get-users", async (roomId) => {
            try {
                const roomParticipants = await room_sevice_1.default.roomUsers(roomId);
                io.to(roomId).emit("users-data", roomParticipants);
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        });
        // Exit from a room
        socket.on("exit-participant", async ({ roomId, userId }) => {
            try {
                await room_sevice_1.default.removeParticipant(roomId, userId);
                const roomParticipants = await room_sevice_1.default.roomUsers(roomId);
                console.log('roomParticipants :>> ', roomParticipants);
                if (roomParticipants?.length == 0) {
                    await room_sevice_1.default.roomDelete(roomId);
                    //  io.to(roomId).emit('room-delete')
                    return;
                }
                io.to(roomId).emit("users-data", roomParticipants);
            }
            catch (error) {
                console.error("Error handling exit-participant:", error);
            }
        });
        // delete room 
        socket.on('delete-Room', async (roomId) => {
            try {
                await room_sevice_1.default.roomDelete(roomId);
                io.emit('roomDeleted');
            }
            catch (error) {
                console.error('Error deleting room:', error);
                socket.emit('error', { message: 'Failed to delete room', roomId });
            }
        });
        socket.on("roomRmovel", (roomId) => {
            io.to(roomId).emit("romovelCoundown");
        });
        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
