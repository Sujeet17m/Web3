import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

// the useWallet hook gives you access to the wallet object which has info about the connected wallet here useWallet 'hook' 'provides' the wallet variable inside the Airdrop function component

//because of the useWallet hook we can access the wallet object and check if the wallet is connected or not and also get the public key of the connected wallet
//because i wrapped the Airdrop component inside the WalletProvider in App.jsx file
export function Airdrop() {
  //hooks in react
  const wallet = useWallet();
  // alert(wallet.connected);
  // alert(wallet.publicKey.toString());

  //define the function inside the component body
  function sendAirdropToUser() {
    alert("Airdrop sent to " + wallet.publicKey.toString());
    Connection.requestAirdrop(wallet.publicKey, 10);
  }

  return (
    <div>
      {/* {wallet.connected ? wallet.publicKey.toString() : "Not connected"} */}
      <input type="text" placeholder="Amount" />
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  );
}
