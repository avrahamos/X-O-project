import express, { Express } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import "dotenv/config";

const app: Express = express();
const nodeServer = createServer(app);
const ioServer = new Server(nodeServer);

app.use(express.json());
app.use("/front", express.static("frontend"));
app.use("/auth");
app.use("/games");

app.listen(process.env.PORT, () => {
  console.log(
    `server is ap and running ,  http://localhost:${process.env.PORT}`
  );
});
