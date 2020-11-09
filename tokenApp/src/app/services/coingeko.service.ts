import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICoinmarketCurrency } from '../model/coinmarketCurrency.model';

@Injectable({ providedIn: 'root' })
export class CoingekoService {

    constructor(public http: HttpClient) {       
    }
    
    getdataForId(id: string): Observable<ICoinmarketCurrency> {
        var encId = encodeURIComponent(id);
        return this.http
          .get<ICoinmarketCurrency>(`${environment.coingekoApiUrl}/coins/${encId}`);
    }
}