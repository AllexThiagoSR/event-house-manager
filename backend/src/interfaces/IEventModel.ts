import { Create, Read } from "./ICRUD";
import IEvent from "./IEvent";

export default interface IEventModel extends Read<IEvent>, Create<IEvent>{}
