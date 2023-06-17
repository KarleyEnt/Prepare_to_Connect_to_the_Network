import Web3 from "web3";
import { Transaction } from "@ethereumjs/tx";
import { Common } from "@ethereumjs/common";

export const getWeb3 = () => {
  const url = "http://127.0.0.1:7545";
  const provider = new Web3.providers.HttpProvider(url);
  return new Web3(provider);
};

const web3 = getWeb3();
const privateKey =
  "0xd118417349d13f3a3492d09d4f237c0467214771e994090e3942fcdd865d9e5a";

const deploy = async () => {
  const rawTxOptions = {
    nonce: 0,
    to: '0xF024951B3aC2d49355FC127C9B4a970aad36CEbB',
    gasPrice: 875000000,
    gasLimit: 30000,
    value: '0x01',
    data: ""
  };
  const common = Common.custom(
    {
      chainId: 1337,
      defaultHardfork: "shanghai",
    },
    { baseChain: "mainnet" }
  );

  console.log("Creating transaction...");
  const tx = new Transaction(rawTxOptions, { common });
  console.log("Signing transaction...");
  const signed = tx.sign(Buffer.from(privateKey.slice(2), "hex"));
  console.log(signed);
  console.log("Serializing transaction...");
  var serializedTx = signed.serialize();
  console.log("Sending transaction...");
  const pTx = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex").toString("hex")
  );
  console.log("tx transactionHash: " + pTx.transactionHash);
};

deploy();