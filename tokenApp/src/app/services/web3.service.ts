import { Injectable } from '@angular/core';
import { SettingService } from './setting.service';
import Web3 from 'web3';
import { provider } from 'web3-core';
import { Token } from '../model/token.model';
import { environment } from '../../environments/environment';
import { CryptoService } from './crypto.service';

import { fromWei, toWei, toHex } from 'web3-utils';
import { Subject } from 'rxjs';
import { TxProgress } from '../model/txProgress.model';
import {TransactionReceipt, PromiEvent} from 'web3-core'

// https://ethereum.stackexchange.com/questions/73077/getting-tx-is-not-a-constructor-when-executing-this-program
const EthereumTransaction = require('ethereumjs-tx').Transaction;
const tokenAbi = require('../../assets/' + 'abi.json');


const TokenPriceWei = 900000000000000;

@Injectable({providedIn: 'root' })
export class Web3Service {
    web3Provider: provider = null;
    web3: Web3 = null;
    transTxReceipt: PromiEvent<TransactionReceipt> = null
    token: Token = null;
    account = null;
    txSubject = new Subject<any>();
    contract: any = null;

    txHash: string;
    constructor(

        private settingService: SettingService,
        private cryptoService: CryptoService) {
    }

    async initClass() {
        if (!this.web3) {
            await this.initWeb3();
        }

        if (!this.account) {
            await this.initAccount();
        }

        if (!this.token) {
            await this.initContract();
        }

        // const gwei = await this.web3.eth.getBalance(this.account.address)
        // const ethString = fromWei(gwei, 'ether');
        // this.token.balanceEth = +ethString;
        this.token.balanceToken = await this.contract.methods.balanceOf(this.account.address).call();
        const tokenInGwei = this.token.balanceToken * TokenPriceWei;
        const ethString = fromWei(tokenInGwei.toString(), 'ether');
        this.token.balanceEth = +ethString

        this.token.tokenPriceEth = +fromWei(TokenPriceWei.toString(), 'ether');
    }

    async initAccount() {
        const pKey = await this.settingService.getSettingValueById(this.settingService.KeyToken);
        const decryptedText = this.cryptoService.decrypt(pKey);
        this.account = await this.web3.eth.accounts.privateKeyToAccount(decryptedText);
    }

    async initWeb3(): Promise<void> {
        this.web3Provider = new Web3.providers.HttpProvider(environment.httpProvider);
        this.web3 = new Web3(this.web3Provider);      
    }


    async initContract(): Promise<void> {

        this.contract = new this.web3.eth.Contract(tokenAbi, environment.contractAddress);

        this.token = new Token();
        this.token.address = environment.contractAddress;
        this.token.tokenName = await this.contract.methods.name().call();
        this.token.tokenSymbol = await this.contract.methods.symbol().call();
        this.token.tokenStandard = await this.contract.methods.tokenstandard().call();
        this.token.meaningDE = await this.contract.methods.meaningDE().call();
        this.token.meaningEN = await this.contract.methods.meaningEN().call();
    }

    async getTokenInfo(): Promise<Token> {
        await this.initClass();
        return this.token;
    }

    async transfer(toAddress: string, tokens: number, gasPriceGwei: number) {
        this.txHash = null;
        if (!this.web3) {
            await this.initWeb3();
        }

        if (!this.token) {
            await this.initContract();
        }

        const pKey = await this.settingService.getSettingValueById(this.settingService.KeyToken);
        const decryptedText = await this.cryptoService.decrypt(pKey);
        this.account = await this.web3.eth.accounts.privateKeyToAccount(decryptedText);
        
        let txCountPen = await this.web3.eth.getTransactionCount(this.account.address, 'pending');
 
        const myContract = new this.web3.eth.Contract(tokenAbi, environment.contractAddress);
        // const myData = myContract.methods.transfer(toAddress,  1, {from: this.account.address}).encodeABI();
        const myData = myContract.methods.transfer(toAddress,  tokens).encodeABI();

        // const gasPrice = await this.web3.eth.getGasPrice();
        // console.log('gasPrice',gasPrice);
        const gasPrice = toWei(gasPriceGwei.toString(), 'Gwei');
        console.log('gasPrice1',gasPrice);
        const gasLimit = (await this.web3.eth.getBlock("latest")).gasLimit;
        const txObject = {
            nonce: txCountPen,
            from: this.account.address, 
            to: environment.contractAddress,
            value: '0x0',
            data: myData,
            gasPrice: toHex(gasPrice),
            gasLimit: toHex(gasLimit),
            chainId: '0x0' + environment.chainId
        };

        const senderPrivateKeyHex = Buffer.from(decryptedText.slice(2), 'hex');
        let transaction = new EthereumTransaction(txObject, {chain: environment.chainName});
        transaction.sign(senderPrivateKeyHex);

        const serializedTransaction = transaction.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');

        console.log('send trans', raw);
        
        this.transTxReceipt = this.web3.eth.sendSignedTransaction(raw)
            .on('receipt', (transactionReceipt) => {
                console.log("transactionReceipt: " + transactionReceipt);
            })
            .on('transactionHash', (txHash) => {
                this.sendProgress(txHash, 0, null)
            })
            .on('confirmation', (conf) => {
                this.sendProgress(null, conf, null)
            })
            .on('error', (err) => {
                this.sendProgress(null, 0, err.message)
            });
        return
   }

   sendProgress(txHash: string, conf: number, err: string) {

    if(!this.txHash) {
        this.txHash = txHash;
    }

    const txProgress: TxProgress = {
        txHash: this.txHash, 
        confirmations: conf, 
        error: err
    }
    this.txSubject.next(txProgress);
   }

    async getAddress(): Promise<string>{
        if (!this.web3) {
            await this.initWeb3();
        }
        await this.initAccount();
        return this.account.address;
    }

    reset() {
        this.transTxReceipt = null;
        this.web3 = null;
    }
}