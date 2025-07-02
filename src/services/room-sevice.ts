import { log } from "console";
import room_repositore, { room } from "../repositories/room_repositore";

class RoomService {
  //--------add room---------
  async addRoom(values: room) {
    let room = await room_repositore.createRoom(values);
    return room;
  }

  //------ check the room exist or not
  async roomExistCheck(roomId: string) {
    let checkValue = await room_repositore.getRoomExist(roomId);
    
    return checkValue;
  }

  // -----------------add users to specific room
  async addPrticipants(roomId:any,userId:any){
        await room_repositore.addParticipants(roomId,userId)
  }

  //----------------take specific room users 
  async roomUsers(roomId:string){
    let users=await room_repositore.getRoomUsers(roomId)
    return users
    
  }

  // ----------------- remove participants from particular room
  async removeParticipant(roomId:any,userId:any){
    await room_repositore.romovePaticipant(roomId,userId)
  }

  //-------------------- get datas of specific rooms
  async specificRoomdata(roomId:string){
    let room=await room_repositore.getSpecificRoomData(roomId)
    return room
    
  }



}

export default new RoomService();
