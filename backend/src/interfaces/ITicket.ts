export default interface ITicket {
  userId: number;
  eventId: number;
  ticketToken: string | null;
  used: boolean;
}