import { environment } from 'src/environments/environment';

export class TransactionDisplay
{
    hash: string;
    from: string;
    timeStamp: Date;
    to: string;
    value: string;
    tokenName: string;
    tokenSymbol: string;
    sign: string;

    getUrl(): string {
        return environment.etherscan + '/tx/' + this.hash;
    }
}