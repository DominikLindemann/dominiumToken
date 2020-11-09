import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { provider } from 'web3-core';

import { TokenSale } from './model/tokenSale.model';
import { Token } from './model/token.model';

const contract = require('@truffle/contract');

const tokenAbiSale = require('../assets/' + environment.contractSaleFileName);
const tokenAbi = require('../assets/' + environment.contractFileName);

// const tokenAbiSale = require('../../../build/contracts/' + environment.contractSaleFileName);
// const tokenAbi = require('../../../build/contracts/' + environment.contractFileName);

import MetaMaskOnboarding from '@metamask/onboarding';
import { environment } from '../environments/environment';
const currentUrl = new URL(window.location.href);
const forwarderOrigin = currentUrl.hostname === 'localhost'
  ? 'http://localhost:4200'
  : undefined

const { ethereum } = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokenToBuy = 1;
  tokenSaleContract = null;
  tokenContract = null;

  account = '';
  accountEth: any;

  web3Provider: provider = null;
  web3: Web3 = null;
  progressPercent = 0;

  isLoaded = false;
  isBuying = false;

  tokenSale: TokenSale;
  token: Token;

  tokenName = 'Dominium Token';
  tokenSymbol = 'DOM';
  tokenSaleTokens: number;

  showError: boolean;
  errorMessage: string;

  onboarding: any;

  errorButtonNr = 0;

  errorBuyText: string;

  myClass: any;

  constructor() {   }

  async ngOnInit(): Promise<void> {
    try {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = true;
        window.ethereum.on('accountsChanged', this.handleNewAccounts);
        console.log('init window.ethereum');
      }
    }
    catch {
      console.log('error on init in  window.ethereum');
    }

    await this.loadData();
  }



  async loadData() {
    this.clearError();

    try {
      this.onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    } catch (error) {
      console.error(error);
      return;
    }

    if (!this.isMetaMaskInstalled()){
      this.showError = true;
      this.errorMessage = 'Please install MetaMask!';
      this.errorButtonNr = 1;
    } else {
      await this.initWeb3();
      if (!this.isAccountSet()) {
        this.errorMessage = ' Metamask is not connected';
        this.errorButtonNr = 2;
        this.showError = true;
      } else {
        try {
          await this.initContractSale();
          await this.initContract();

          if (this.token && this.token.error) {
            this.showError = true;
            this.errorMessage = this.token.error;
          } else {
            this.tokenName = this.token.tokenName;
            this.tokenSymbol = this.token.tokenSymbol;
          }
        }
        catch {
          console.log('catch');
          this.showError = true;
          this.errorMessage = 'Can\'t init token sale';
          this.errorButtonNr = 3;
        }
      }
    }

    this.isLoaded = true;
  }

  isMetaMaskInstalled(): boolean {
    const ethereum  = window.ethereum;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  isAccountSet(): boolean {
    const isSet = this.account && this.account !== '';
    return isSet;
  }

  async initWeb3(): Promise<void> {
    this.web3Provider = window.web3.currentProvider;
    this.web3 = new Web3(this.web3Provider);

    let accountError;
    await this.web3.eth.getCoinbase().then(address => {
      if (address) {
        this.account = address;
      } else {
        accountError = 'account is empty. Sometimes Metamask ist not connected to the site';
      }
    }).catch(err => {
      accountError = 'can not read account ' + err;
      console.log(accountError);
    });

    if (accountError) {
      this.errorMessage = accountError;
      this.showError = true;
      return;
    }

    const balanceEthWei = await this.web3.eth.getBalance(this.account);
    this.accountEth = this.weiToEther(balanceEthWei);
  }

  async initContractSale(): Promise<void> {
    this.tokenSaleContract = contract(tokenAbiSale);
    this.tokenSaleContract.setProvider(this.web3Provider);
    const instanceSaleContract = await this.tokenSaleContract.deployed();

    this.tokenSale = new TokenSale();
    this.tokenSale.address = await instanceSaleContract.address;
    this.tokenSale.tokenPriceWei = +await instanceSaleContract.tokenPrice();
    this.tokenSale.tokenPrice = this.weiToEther(this.tokenSale.tokenPriceWei);
    this.tokenSale.tokensSold = await instanceSaleContract.tokensSold();
    this.tokenSale.tokensAvailable = await instanceSaleContract.tokensAvailable();

    this.progressPercent = (Math.ceil(this.tokenSale.tokensSold) / this.tokenSale.tokensAvailable) * 100;
    console.log('tokenSale contract loaded');
  }

  async initContract(): Promise<void> {
    this.tokenContract = contract(tokenAbi);
    this.tokenContract.setProvider(this.web3Provider);
    const instanceContract = await this.tokenContract.deployed();

    this.token = new Token();
    this.token.balanceToken = await instanceContract.balanceOf(this.account);
    this.token.address = await instanceContract.address;
    this.token.tokenName = await instanceContract.name();
    this.token.tokenSymbol = await instanceContract.symbol();
    this.token.tokenStandard = await instanceContract.tokenstandard();

    this.tokenSaleTokens = await instanceContract.balanceOf(this.tokenSale.address);

    console.log('token contract loaded');
  }

  clearError(): void {
    this.errorButtonNr = 0;
    this.errorMessage = '';
    this.showError = false;
    this.isLoaded = false;
  }

  async onInstall() {
    // this.progressText = 'Onboarding in progress';
    // onboardButton.disabled = true
    await this.onboarding.startOnboarding();
  }

  async onConnect() {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.handleNewAccounts(newAccounts);
    } catch (error) {
      console.error(error);
    }
  }

  async onRefresh() {
    await this.loadData();
  }

  handleNewAccounts(newAccounts) {
    window.location.reload();
  }

  async onBuyClick(): Promise<void> {
    try {
      this.errorBuyText = '';
      this.isBuying = true;
      const instanceSaleContract = await this.tokenSaleContract.deployed();
      const data = await instanceSaleContract.buyTokens(this.tokenToBuy, {
        from: this.account,
        value: this.tokenToBuy * this.tokenSale.tokenPriceWei,
        gas: 500000 // Gas limit
      });
      console.log('Tokens bought...');
      await this.initContractSale();
      await this.initContract();
    } catch (error) {
      let message = error;
      if(error.message) {
        message = error.message;
      }
      this.errorBuyText = 'Can \'t buy. ' + message;
    }
    finally{
      this.isBuying = false;
    }
  }

  weiToEther(priceInWei: any): number{
    return +this.web3.utils.fromWei(priceInWei.toString(), 'ether');
  }
}
