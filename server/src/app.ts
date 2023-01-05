import express from "express";
import cors from "cors";
import { mockMessages } from "./mock/mockMessages";
import { mockUsers } from "./mock/mockUsers";

const Server = express();
Server.use(cors());

Server.use("/messages", mockMessages);
Server.use("/users", mockUsers);

const PORT = 3000;
Server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
