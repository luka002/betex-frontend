import {Tip} from './tip';

export class Ticket {
    public id: string;
    public price: number;
    public odds: number;
    public created: Date;
    public tips: Tip[];
}
