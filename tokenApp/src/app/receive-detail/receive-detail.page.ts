import { Component, OnInit } from '@angular/core';
import EthereumQRPlugin from 'ethereum-qr-code';
import { Web3Service } from '../services/web3.service';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const { Clipboard } = Plugins;

const qr = new EthereumQRPlugin();

@Component({
  selector: 'app-receive-detail',
  templateUrl: './receive-detail.page.html',
  styleUrls: ['./receive-detail.page.scss'],
})
export class ReceiveDetailPage implements OnInit {

  address: string;
  amount = 5;

  constructor(
    private toastController: ToastController,
    private web3Service: Web3Service) { }

  async ngOnInit() {
    this.address = await this.web3Service.getAddress();
    this.generetBarcode();
  }

  onGenerate() {
    this.generetBarcode();
  }

  increment() {
    this.amount++;
  }

  decrement() {
    this.amount--;
  }

  async onCopy() {
    Clipboard.write({
      string: this.address
    });
    const toast = await this.toastController.create({
      message: 'address copied',
      duration: 2000
    });
    toast.present();
  }

  generetBarcode(): void {

    if (!this.address){
      return;
    }

    const sendDetails = {
      to: this.address,
      value: this.amount,
      gas: 42000
     };
    const configDetails = {
      size: 220,
      selector: '#ethereum-qr-code',
      options: {
       margin: 5
      }
     };
    qr.toCanvas(sendDetails, configDetails);
  }
}
