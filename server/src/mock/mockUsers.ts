import { Router, Request, Response } from "express";
import { mockUserDetails } from "../data/users";
import { UserType } from "types/user";

export const mockUsers = Router();

mockUsers.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user: UserType = mockUserDetails.find((user) => user.id === +id);
  res.send(user);
});

mockUsers.get("/", (req: Request, res: Response) => {
  const users = mockUserDetails.map((user: UserType) => {
    return {
      id: user["id"],
      name: user["name"],
    };
  });
  res.send(users);
});
