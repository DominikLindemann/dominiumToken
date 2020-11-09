import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token } from '../model/token.model';
import { Web3Service } from '../services/web3.service';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const { Clipboard } = Plugins;

@Component({
  selector: 'app-tokeninfo',
  templateUrl: './tokeninfo.page.html',
  styleUrls: ['./tokeninfo.page.scss'],
})
export class TokeninfoPage implements OnInit {
  token: Token;
  isLoaded = false;

  errorGetData: boolean;
  network: string;
  contractAddress: string
  txLink: string;
  
  constructor(
    private toastController: ToastController,
    private web3Service: Web3Service) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoaded = false;
    this.errorGetData = false;
    this.txLink = null;
    try {
      this.token = await this.web3Service.getTokenInfo();
      this.network = environment.chainName + ' id: ' + environment.chainId;
      this.contractAddress = environment.contractAddress;
      this.txLink = environment.etherscan + '/address/' + this.contractAddress;
    } catch (error) {
      this.errorGetData = true;
    }
    this.isLoaded = true;

  }

  onRefresh(){
    this.loadData();
  }

  async onCopy() {
    if(this.contractAddress) {
      Clipboard.write({
        string: this.contractAddress
      });

      const toast = await this.toastController.create({
        message: 'address copied',
        duration: 2000
      });
      toast.present();
    }
  }
}
