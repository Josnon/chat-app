export interface MessageType {
  id: number;
  body: string;
  authorId: number;
  authorName?: string;
  timestamp: number | Date;
  likes?: number[];
  status?: "pending" | "ok" | "error";
}
