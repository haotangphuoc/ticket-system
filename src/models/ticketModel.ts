import mongoose, { Schema, Document } from 'mongoose';

export type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED" | "ON HOLD" | "CANCELLED";

export interface ITicketActivity extends Document {
  status: TicketStatus;
  comments?: string;
}

export interface ITicket extends Document {
  title: string;
  description: string;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  status: TicketStatus;
  startDate: Date;
  endDate: Date;
  activities: ITicketActivity[];
}

const ticketActivitySchema: Schema = new Schema({
  status: { type: String, enum: ["OPEN", "IN PROGRESS", "RESOLVED", "ON HOLD", "CANCELLED"], required: true },
  comments: { type: String }
});

const ticketSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ["OPEN", "IN PROGRESS", "RESOLVED", "ON HOLD", "CANCELLED"], default: "OPEN" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  activities: [ticketActivitySchema]
});

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
