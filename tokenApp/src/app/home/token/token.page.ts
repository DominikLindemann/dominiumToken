import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Web3Service } from '../../services/web3.service';
import { Token } from '../../model/token.model';
import { HomePage } from '../home.page';
import { CoingekoService } from 'src/app/services/coingeko.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {

  balanceEth: any;
  balanceToken: any;
  token: Token;
  isLoaded = false;
  errorGetData: boolean;
  isLoadedCoingeko = false;
  errorCoingeko: boolean
  balanceEuro = 0;
  constructor(
    private homepage: HomePage,
    private navController: NavController,
    private web3Service: Web3Service,
    private coingekoService: CoingekoService) { }
  ngOnInit(): void {

    this.homepage.refreshSubject.subscribe(data => {
      this.loadData();
    })
  }

  async loadData() {
    this.isLoaded = false;
    this.token = null;
    this.errorGetData = false;
    this.isLoadedCoingeko = false;
    this.errorCoingeko = false;
    try {
      this.token = await this.web3Service.getTokenInfo();
      this.isLoaded = true;
      this.loadCoingeko(this.token.balanceEth);
    } catch (error) {
      console.log('err', error);
      this.errorGetData = true;
      this.isLoaded = true;
    }
  }

  async loadCoingeko(balanceEth: number) {
    try {
      this.coingekoService.getdataForId('ethereum').subscribe(data => {

        this.balanceEuro = data.market_data.current_price['eur'] * balanceEth;
        this.isLoadedCoingeko = true;
      });

    } catch (error) {
      console.log('err', error);
      this.errorCoingeko = true;
      this.isLoadedCoingeko = true;
    }
  }

  doRefresh() {
    this.loadData();
  }
  onRefresh() {
    this.loadData();
  }
  onReceive(){
    this.navController.navigateForward('receive-detail');
  }

  onSend() {
    this.navController.navigateForward('send-detail');
  }
}
