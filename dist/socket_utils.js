"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const index_1 = require("./index");
exports.io = new socket_io_1.Server(index_1.httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// let users = [];
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
//   io
// };
// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };
exports.io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    //take userId and socketId from user
    //   socket.on("addUser", (userId) => {
    //     addUser(userId, socket.id);
    //     io.emit("getUsers", users);
    //   });
    //send and get message
    //   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //     const user = getUser(receiverId);
    //     io.to(user.socketId).emit("getMessage", {
    //       senderId,
    //       text,
    //     });
    //   });
    //   //when disconnect
    //   socket.on("disconnect", () => {
    //     console.log("a user disconnected!");
    //     removeUser(socket.id);
    //     io.emit("getUsers", users);
    //   });
});
