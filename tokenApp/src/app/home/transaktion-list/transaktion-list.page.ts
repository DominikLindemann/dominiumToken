import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { Transaction } from '../../model/transaction.model';
import { environment } from '../../../environments/environment';
import { Token } from '../../model/token.model';
import { HttpClient } from '@angular/common/http';
import { TransactionDisplay } from '../../model/transactionDisplay.model';

@Component({
  selector: 'app-transaktion-list',
  templateUrl: './transaktion-list.page.html',
  styleUrls: ['./transaktion-list.page.scss'],
})
export class TransaktionListPage implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private web3Service: Web3Service) { }

  transactionList: TransactionDisplay[] = [];
  isLoaded = false;
  errorMessage: string;

  async ngOnInit() {
    this.loadData();
  }
  async loadData() {
    this.errorMessage = '';
    this.isLoaded = false;
    try {
      const address = await this.web3Service.getAddress();
      const data = await this.getTransactions(address);
      data.slice().reverse().forEach(item => {
        const transaction = new TransactionDisplay();
        transaction.hash = item.hash;
        transaction.from = item.from;
        transaction.timeStamp = new Date(+item.timeStamp * 1000);
        transaction.to = item.to;
        transaction.value = item.value;
        transaction.tokenName = item.tokenName;
        transaction.tokenSymbol = item.tokenSymbol;

        if (address.toLowerCase() === transaction.to.toLowerCase()) {
          transaction.sign = '+';
        } else {
          transaction.sign = '-';
        }

        this.transactionList.push(transaction);
      });

    } catch (error) {
      console.log('err', error);
      this.errorMessage = 'Sorry, something went wrong';
    }
    finally{
      this.isLoaded = true;
    }
  }

  async getTransactions(address: string) {

    let url1 = environment.urlTransactions + '?module=account&action=tokentx';
    url1 = url1 + '&address=' + address +  '&startblock=0&endblock=99999999&sort=asc';
    url1 = url1 + '&apikey=' + environment.transactionApiKey;

    const data = await this.httpClient.get<any>(url1).toPromise();
    return data.result;
  }

  doRefresh() {
    this.loadData();
  }
}
