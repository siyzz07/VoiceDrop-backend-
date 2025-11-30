import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import { initializeSocket } from "./realtimeCommunication.ts/connect";
import { database } from "./realtimeCommunication.ts/db_update";
import userRoute from "./routes/userRoutes";
import { globalErrorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
connectDB();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://voicedrop.vercel.app'
// ];

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5174", 
  "http://localhost:5173",
  "https://voicedrop.vercel.app",
"https://voice-drop-frontend.vercel.app"
];


app.use(cors({
    origin:allowedOrigins,
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}))

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // allow non-browser requests
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
// }));

// app.use(cors({ origin: ['https://voicedrop.vercel.app'], methods: ["GET", "POST"], credentials: true }));

const PORT = process.env.PORT || 7001;

const io = initializeSocket(httpServer);
database(io);

app.use("/api", userRoute);


app.use(globalErrorHandler)

httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
