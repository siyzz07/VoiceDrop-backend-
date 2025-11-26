"use strict";
// import Room from "../model/room-model";
// import { v4 as uuidv4 } from "uuid";
// export type RoomInput = {
//   owner: string;
//   topic: string;
//   roomType: "Public" | "Private";
//   password?: string;
// };
// class RoomRepository {
//   // Create a new room
//   async createRoom({ owner, topic, roomType, password }: RoomInput) {
//     const roomId = uuidv4();
//     // Auto-generate password for private room
//     if (roomType === "Private") {
//       password = uuidv4();
//     }
//     const room = new Room({
//       roomId,
//       owner,
//       topic,
//       type: roomType,
//       password,
//     });
//     return await room.save();
//   }
//   // Get all rooms
//   async getAllRooms() {
//     return await Room.find({});
//   }
//   // Check if room exists
//   async roomExists(roomId: string) {
//     const room = await Room.findOne({ roomId });
//     return !!room;   
//   }
//   // Get participants of a specific room
//   async getRoomUsers(roomId: string) {
//     const room = await Room.findOne({ roomId }).populate(
//       "participants",
//       "name"
//     );
//     return room?.participants || null;
//   }
//   // Get full room data
//   async getRoomById(roomId: string) {
//     return await Room.findOne({ roomId }).populate("participants", "name");
//   }
//   // Add participant to room
//   async addParticipant(roomId: string, userId: string) {
//     const room = await Room.findOne({ roomId });
//     if (!room) return null;
//     if (!room.participants.includes(userId)) {
//       room.participants.push(userId);
//       await room.save();
//     }
//     return room;
//   }
//   // Remove participant
//   async removeParticipant(roomId: string, userId: string) {
//     return await Room.updateOne(
//       { roomId },
//       { $pull: { participants: userId } }
//     );
//   }
//   // Delete room
//   async deleteRoom(roomId: string) {
//     return await Room.deleteOne({ roomId });
//   }
// }
// export default new RoomRepository();
