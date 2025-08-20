import { log } from "console";
import Room from "../model/room-model";
import { v4 as uuidv4 } from "uuid";

export type room = {
  owner: string;
  topic: string;
  roomType: string;
  password?: string;
};

class RoomRepositories {
  //------- create room -----
  async createRoom(values: room) {
    let { owner, topic, roomType, password } = values;
    const roomId = uuidv4();
    if (roomType == "Private") {
      password = uuidv4();
    }

    const newRoom = new Room({
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
    let room = await Room.find({});
    return room;
  }

  //---------------check the romm exist or not -------------
  async getRoomExist(roomId: string) {
    let room = await Room.find({ roomId: roomId });

    if (room.length != 0) {
      return true;
    } else {
      return false;
    }
  }
  //---------------- specific room users----------------
  async getRoomUsers(roomId: string) {
    const room = await Room.findOne({ roomId }).populate(
      "participants",
      "name"
    );
    if (!room) {
      console.log("Room not found");
      return;
    }
    return room.participants;
  }

  //-------------------- get datas of specific rooms
  async getSpecificRoomData(roomId: any) {
    const room = await Room.findOne({ roomId }).populate(
      "participants",
      "name"
    );
    if (!room) {
      console.log("Room not found");
      return;
    }
    return room;
  }

  //--------------------- add users to specific rooms
  async addParticipants(roomId: any, userId: any) {
    const room = await Room.findOne({ roomId: roomId });

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
  async romovePaticipant(roomId: any, userId: any) {
    await Room.updateOne({ roomId }, { $pull: { participants: userId } });
  }

  // delete specific room
  async deleteRoom(roomId: string) {
    await Room.deleteOne({ roomId: roomId });
    return;
  }
}

export default new RoomRepositories();
