import mongoose, { Schema, Document } from 'mongoose';

export type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED" | "ON HOLD" | "CANCELLED";

export interface ITicketActivity extends Document {
  status: TicketStatus;
  comment?: string;
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
  comment: { type: String }
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

ticketSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.startDate = returnedObject.startDate.toISOString().split('T')[0];
    returnedObject.endDate = returnedObject.endDate.toISOString().split('T')[0];
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
export const TicketActivity = mongoose.model<ITicketActivity>('TicketActivity', ticketActivitySchema);