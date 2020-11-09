import { environment } from 'src/environments/environment';

export class TxProgress {
    txHash: string;
    confirmations: number;
    error: string;
}