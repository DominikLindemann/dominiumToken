[[_TOC_]]
# ERC-20 Token Standard
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

## Dominium Token
- Symbol: DOM
- Bedeutung: 
  - DE: Dominium bedeutet: Besitz, Eigentumsrecht, Herrschaft;
  - EN: Dominium means: Ownership and control of property;
- TokenAdress: [0x6C31f05574e068f93DA875c072c8f433dE107b23](https://rinkeby.etherscan.io/address/0x6C31f05574e068f93DA875c072c8f433dE107b23)
- TokenSaleAdress: [0x5eFAd9D4Ac280A859465d0F0cEc9A6197362af47](https://rinkeby.etherscan.io/address/0x5eFAd9D4Ac280A859465d0F0cEc9A6197362af47)
- Running on Testnet [rinkeby](https://rinkeby.etherscan.io/)

## Running
- TokenSale Website: [http://dominiumtoken.ddns.net/](http://dominiumtoken.ddns.net/)
- TokenApp [PlayStore](https://play.google.com/store/apps/details?id=tech.munichconsultants.dominiumtoken)

#Techologie Stack:
angular, ionic, truffle, web3, ethereum, smartContracts, metamask, solidity, docker
#Setup:
- ganache: https://www.trufflesuite.com/ganache
- npm install truffle -g
- npm install angular-cli-g
- npm install inioc-cli-g

# Contracts
**Solidity > 0.5.0**
- TokenContract
- TokenSaleContract

# TokenSale
**Angular mit Angular Material**
Die Kommunikation zwischen der Website und dem Contract wird über das [Metamask](https://metamask.io/) Gateway realisiert.
Der SaleContract wird per Truffle direkt aus dem .sol File gelesen und steht damit zur Verfügung.
Die WebApp läuft im docker container auf einem Raspberry pi 3.

# TokenApp
**ionic Angular**
Die Ermittlung der Tokens und das Versenden erfolgt über [infura](https://infura.io/) 
Die Anzeige der Token Transaktionen wird über die [etherscan-api](https://api-rinkeby.etherscan.io/api) ausgelesen.
Die Trennung auf 2 Apis ist nur vorhanden, um beide Varianten auszuprobieren.

Für die Umrechnung von Eth in Euro werden die aktuellen Preise über die[coingeko api](https://www.coingecko.com/de/api) geladen.

###Tipps:
QR Code generator:
https://www.npmjs.com/package/ethereum-qr-code

Barcode Reader ist hier beschrieben:
https://enappd-apps.gitbook.io/apps/ionic-4-full-app/pro-pack-features/qr-and-barcode-scanning

# Grafik
[cashart73](https://www.instagram.com/\_cashart73_)