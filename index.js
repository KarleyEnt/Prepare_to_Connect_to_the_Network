let {Web3} = require('web3');
let EthereumTransaction = require("ethereumjs-tx").Transaction;
let url = 'HTTP://127.0.0.1:7545';
let web3 = new Web3(url);
let sendingAddress = '0xf9a3Fde78DbCE7d6f20E237229DDf98C25Ed343b';
let receivingAddress = '0xb37eFF298b38A91F7D621552033554000e743Da6';
let sendingAddressBalance;
web3.eth.getBalance(sendingAddress).then(bal => {sendingAddressBalance = bal; console.log(sendingAddressBalance) }).catch(() => console.log('error'));
let receivingAddressBalance;
web3.eth.getBalance(receivingAddress).then(bal => {receivingAddressBalance = bal; console.log(receivingAddressBalance)}).catch(() => console.log('error'));;
let rawTransaction = {
  nonce: 0,
  gasPrice: 200000,
  gasLimit: 3000,
  value: 1,
  receivingAddress
};
let senderPrivateKey = '523ed5af758fdb9c01e63c3d135a338f7104039580081acf16041503a31f9c60';
let senderPrivateKeyHex = Buffer.from(senderPrivateKey, 'hex');
let transaction = new EthereumTransaction(rawTransaction);
transaction.sign(senderPrivateKeyHex);
let serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);
