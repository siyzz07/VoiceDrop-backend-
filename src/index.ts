import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import { initializeSocket } from "./realtimeCommunication.ts/connect";
import { database } from "./realtimeCommunication.ts/db_update";
import userRoute from "./routes/userRoutes";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
connectDB();

app.use(express.json());
app.use(cors({ origin: "https://voicedrop.vercel.app", methods: ["GET", "POST"], credentials: true }));

const PORT = process.env.PORT || 7001;

const io = initializeSocket(httpServer);
database(io);

app.use("/api", userRoute);

httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
