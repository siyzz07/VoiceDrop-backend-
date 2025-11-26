"use strict";
// import { Request, Response } from "express";
// // import roomSevice from "../services/room-sevice";
// import { log } from "console";
// class RoomController {
//   //-------- create a user -----------------
//   async createRoom(req: Request, res: Response): Promise<any> {
//     try {
//   console.log("eraeee");
//       req.body.owner = req.user.userId;
//       let addroom = await roomSevice.addRoom(req.body);
//       if (addroom) {
//         return res
//           .status(201)
//           .json({
//             message: "Room created successfuly",
//             roomId: addroom.roomId,
//           });
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
// //--------------------------------------------------------------------------check the roomexist or not
//   async checkRoomExistandRoomUsers(req: Request, res: Response): Promise<any> {
//     try {
//       let roomId = req.params.roomId;
//       let bool = await roomSevice.roomExistCheck(roomId);
//       let room:any=[]
//       if(bool==true){
//           room=await roomSevice.specificRoomdata(roomId)
//       }
//       return res.json({ check: bool,room:room });
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
// }
// export default new RoomController();
