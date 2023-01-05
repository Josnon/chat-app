import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Messages } from "../data/messages";
import { mockUserDetails } from "../data/users";
import { MessageType } from "../types/message";
import { UserType } from "../types/user";
export const mockMessages = Router();

mockMessages.get("/", (req: Request, res: Response) => {
  const MessagesWithNames: MessageType[] = Messages.map(
    (message: MessageType) => {
      const author = mockUserDetails.find(
        (user: UserType) => user.id === message.authorId
      );
      const authorName = author && author.name;
      return { ...message, authorName };
    }
  );
  res.send(MessagesWithNames);
});

mockMessages.post("/", bodyParser.json(), (req: Request, res: Response) => {
  const newMessage: MessageType = req.body;
  newMessage.likes = [];
  newMessage.authorName = mockUserDetails.find(
    (user: UserType) => user.id === newMessage.authorId
  )?.name;
  Messages.push(newMessage);
  res.sendStatus(200);
});

mockMessages.post("/like", bodyParser.json(), (req: Request, res: Response) => {
  const newMessage: {
    messageId: number;
    userId: number;
    like: boolean;
  } = req.body;

  Messages.forEach((message) => {
    if (message.id === newMessage.messageId) {
      const userLiked = message.likes?.indexOf(newMessage.userId) || 0;
      newMessage.like === false
        ? message.likes?.push(newMessage.userId)
        : message.likes?.splice(userLiked, 1);
    }
  });

  res.sendStatus(200);
});
