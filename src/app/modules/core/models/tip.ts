import {TipState} from './tip-state';
import {TipType} from './tip-type';

export class Tip {
  id: number;
  teamHome: string;
  teamAway: string;
  result: string;
  status: boolean;
  time: Date;
  odds: string;
  tipType: TipType;
  bet: string;
  tipState: TipState;
  league: string;
  ticketId: string;
}
