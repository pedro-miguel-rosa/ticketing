"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
const stan = node_nats_streaming_1.default.connect("ticketing", "abc", { url: "http://localhost:4222" });
stan.on("connect", () => {
    console.log("Publisher connected to NATS");
});
