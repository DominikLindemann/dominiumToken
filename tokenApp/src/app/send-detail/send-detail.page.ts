import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '../model/token.model';
import { TxProgress } from '../model/txProgress.model';
import { Web3Service } from '../services/web3.service';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const { Clipboard } = Plugins;

const ethereumText = 'ethereum:';
const valueText = 'value=';
const gasText = 'gas=';

@Component({
  selector: 'app-send-detail',
  templateUrl: './send-detail.page.html',
  styleUrls: ['./send-detail.page.scss'],
})

export class SendDetailPage implements OnInit, OnDestroy {

  address: string;
  amount: number;
  gas: any;
  token: Token;
  error: string;

  subList: Subscription[] = [];
  doSpend = false;
  txProgress: TxProgress;
  txLink: string;
  gasPriceGwei = 75;

  constructor(
    private toastController: ToastController,
    private route: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    private web3Service: Web3Service) {
      this.subList.push(this.route.queryParams.subscribe(params => {
        if (params.spend) {
          console.log('a', params.spend);
          this.doSpend = params.spend;
        }
      }));
    }

  async ngOnInit() {
    if (this.doSpend){
      this.address = environment.addressMySelf;
      this.amount = 10;
    } else {
      this.address = '';
      this.amount = 1;
    }

    this.token = await this.web3Service.getTokenInfo();
  }

  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.splitBarcodeParty(barcodeData.text);
      if (!this.address.startsWith('0x')){
        this.address = '';
        alert('can\'t parse barcode');
      }
    }).catch(err => {
      this.address = '';
    });
  }

  splitBarcodeParty(input: string) {

    const seperator = /[?&]/;
    const parts = input.split(seperator);

    if (parts.length >= 1) {
      this.address = parts[0].replace(ethereumText, '');
    }
    if (parts.length >= 2) {
      this.amount = +parts[1].replace(valueText, '');
    }
    if (parts.length >= 3) {
      this.gas = parts[2].replace(gasText, '');
    }
  }

  async onSend() {
    this.error = null;
    this.txProgress = null;
    this.txLink = null;
    if (this.address === ''){
      this.error = 'Address is empty';
    } else if (this.amount < 1) {
      this.error = 'Amount must be > 0';
    }
    else if (this.amount > this.token.balanceToken) {
      this.error = 'You only have' + this.token.balanceToken + ' tokens.';
    }
    else {
      this.subList.push(this.web3Service.txSubject.subscribe(data => {
        this.txProgress = data;

        if(this.txProgress.error) {
          this.error = this.txProgress.error;
        }
        this.txLink = environment.etherscan + '/tx/' + this.txProgress.txHash;
      }));
      await this.web3Service.transfer(this.address, this.amount, this.gasPriceGwei);      
    }
  }

  async onCopy() {
    if(this.txProgress) {
      Clipboard.write({
        string: this.txProgress.txHash
      });

      const toast = await this.toastController.create({
        message: 'txHash copied',
        duration: 2000
      });
      toast.present();
    }
  }

  ngOnDestroy(): void {
    console.log('send ngOnDestroy')
    this.web3Service.reset();
    this.subList.forEach(subElement => subElement.unsubscribe());
  }
}
