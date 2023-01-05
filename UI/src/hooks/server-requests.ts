import { Message } from "../types/message";

const PORT = 3000;
const endpoint = `http://localhost:${PORT}`; // todo: add endpoint (server) address (starting with http://)

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  const req = await fetch(`${endpoint}/messages`);
  const messages: {
    authorId: number;
    id: number;
    body: string;
    timestamp: number;
    likes: number[];
  }[] = await req.json();
  return messages;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const req = await fetch(`${endpoint}/users`);
  const res = await req.json();
  return res;
}

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const req = await fetch(`${endpoint}/users/${userId}`);
  const res = await req.json();
  return res;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message): Promise<boolean> {
  const res = await fetch(`${endpoint}/messages`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(
  messageId: number,
  userId: number,
  like: boolean
) {
  const message = {
    messageId,
    userId,
    like,
  };
  const response = await fetch(`${endpoint}/messages/like`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message),
  });
  return response.status;
}
