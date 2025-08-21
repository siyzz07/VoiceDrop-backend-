"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const connect_1 = require("./realtimeCommunication.ts/connect");
const db_update_1 = require("./realtimeCommunication.ts/db_update");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
(0, connectDB_1.default)();
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://voicedrop.vercel.app'
// ];
app.use(express_1.default.json());
const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://voicedrop.vercel.app",
    "https://voice-drop-frontend.vercel.app"
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // allow non-browser requests
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
// app.use(cors({ origin: ['https://voicedrop.vercel.app'], methods: ["GET", "POST"], credentials: true }));
const PORT = process.env.PORT || 7001;
const io = (0, connect_1.initializeSocket)(httpServer);
(0, db_update_1.database)(io);
app.use("/api", userRoutes_1.default);
httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
