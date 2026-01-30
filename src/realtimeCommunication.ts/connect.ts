import { Server } from "socket.io";
import room_repositore from "../repositories/room_repositore";
import roomSevice from "../services/room-sevice";
import Room from "../model/room-model";
import { error, log } from "node:console";
import roomController from "../controllers/room-controller";

/**
 *
 * send room data --
 * add joining room -- add participants --
 * get users in the room
 * exit form the room
 * delete from the room
 */

export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "https://voicedrop.vercel.app",
        "https://voice-drop-frontend.vercel.app",
        "http://localhost:5174",
        "http://localhost:5173",
      ],
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
        const data = await roomSevice.getAllRooms();
        socket.emit("room_data", data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    });

    // Handle joining a room
    socket.on("join-room", async ({ roomId, userId }) => {
      try {
        socket.join(roomId);
        const room = await Room.findOne({ roomId });
        if (room) {
          await roomSevice.addParticipant(roomId, userId);
          const roomParticipants = await roomSevice.getRoomUsers(roomId);

          io.to(roomId).emit("users-data", roomParticipants);
        }

        // Notify other users
        const usedId = socket.id;
        socket.to(roomId).emit("user-joined", { usedId });
      } catch (error) {
        console.error("Error handling join-room:", error);
      }
    });

    // Get users in the room
    socket.on("get-users", async (roomId) => {
      try {
        const roomParticipants = await roomSevice.getRoomUsers(roomId);
        io.to(roomId).emit("users-data", roomParticipants);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    });

    // Exit from a room
    socket.on("exit-participant", async ({ roomId, userId }) => {
      try {
        await roomSevice.removeParticipant(roomId, userId);
        const roomParticipants = await roomSevice.getRoomUsers(roomId);
        console.log("roomParticipants :>> ", roomParticipants);
        if (roomParticipants?.length == 0) {
          await roomSevice.deleteRoom(roomId);
          //  io.to(roomId).emit('room-delete')
          return;
        }
        io.to(roomId).emit("users-data", roomParticipants);
      } catch (error) {
        console.error("Error handling exit-participant:", error);
      }
    });

    // delete room
    socket.on("delete-Room", async (roomId: string) => {
      try {
        await roomSevice.deleteRoom(roomId);
        io.emit("roomDeleted");
      } catch (error: any) {
        console.error("Error deleting room:", error);
        socket.emit("error", { message: "Failed to delete room", roomId });
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
