export default interface IEvent {
  id: number;
  description: string;
  date: Date;
  time: string;
  privateEvent: boolean;
  ticketsQuantity: number | null;
  needTicket: boolean;
}
