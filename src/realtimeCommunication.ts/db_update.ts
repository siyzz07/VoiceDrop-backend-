import mongoose from "mongoose";
import { log } from "node:console";

// Using MongoDB Atlas replica set for real-time updates with change streams
export const database = (io: any) => {
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB... listening for changes");

    const collection = db.collection("rooms");

    const changeStream = collection.watch();

    changeStream.on("change", async (change: any) => {
      try {
        const allDocuments = await collection.find({}).toArray();

        io.emit("data-updated", allDocuments);
      } catch (err) {
        console.error("Error fetching documents after change:", err);
      }
    });

    changeStream.on("error", (err) => {
      console.error("Change stream error:", err);
    });

    changeStream.on("close", () => {
      console.log("Change stream closed. Attempting to reconnect...");
    });
  });
};
