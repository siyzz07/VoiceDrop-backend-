import mongoose, { Types, Document, Schema, model } from "mongoose";


interface IRoom extends Document {
  roomId:string;
  owner: Types.ObjectId; 
  topic: string;         
  type: string;   
  password?:string ;    
  participants: Types.ObjectId[]; 
}


const RoomSchema = new Schema<IRoom>({
  roomId:{type:String},
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  topic: { type: String, required: true },                             
  type: { type: String, required: true,enum:["Open","Private"] }, 
  password:{type:String},                          
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],        
}, { timestamps: true });


const Room = model<IRoom>("Room", RoomSchema);
export default Room;
