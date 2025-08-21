"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var connectDB_1 = require("./config/connectDB");
var connect_1 = require("./realtimeCommunication.ts/connect");
var db_update_1 = require("./realtimeCommunication.ts/db_update");
var userRoutes_1 = require("./routes/userRoutes");
dotenv_1.default.config();
var app = (0, express_1.default)();
var httpServer = http_1.default.createServer(app);
(0, connectDB_1.default)();
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://voicedrop.vercel.app'
// ];
app.use(express_1.default.json());
var allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://voicedrop.vercel.app",
    "https://voice-drop-frontend.vercel.app"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
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
var PORT = process.env.PORT || 7001;
var io = (0, connect_1.initializeSocket)(httpServer);
(0, db_update_1.database)(io);
app.use("/api", userRoutes_1.default);
httpServer.listen(PORT, function () {
    return console.log("Server running on http://localhost:".concat(PORT));
});
