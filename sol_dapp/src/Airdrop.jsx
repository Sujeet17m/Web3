// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection } from "@solana/web3.js";

// // the useWallet hook gives you access to the wallet object which has info about the connected wallet here useWallet 'hook' 'provides' the wallet variable inside the Airdrop function component

// //because of the useWallet hook we can access the wallet object and check if the wallet is connected or not and also get the public key of the connected wallet
// //because i wrapped the Airdrop component inside the WalletProvider in App.jsx file
// export function Airdrop() {
//   //hooks in react
//   const wallet = useWallet();
//   // alert(wallet.connected);
//   // alert(wallet.publicKey.toString());

//   //define the function inside the component body
//   async function sendAirdropToUser() {
//     const amount = document.getElementById("publicKey").value;
//     await Connection.requestAirdrop(wallet.publicKey, amount * 1000000000); //1 SOL = 10^9 lamports
//     alert("Airdrop sent to " + wallet.publicKey.toString());
//   }

//   return (
//     <div>
//       {/* {wallet.connected ? wallet.publicKey.toString() : "Not connected"} */}
//       <input id="publicKey" type="text" placeholder="Amount" />
//       <button onClick={sendAirdropToUser}>Send Airdrop</button>
//     </div>
//   );
// }

// Updated Airdrop.jsx with proper airdrop functionality and error handling

import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Airdrop() {
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  
  // Create connection to Solana devnet
  const connection = new Connection(clusterApiUrl('devnet'));

  async function sendAirdropToUser() {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    // Validate input
    if (!amount || amount <= 0 || amount > 5) {
      alert("Please enter a valid amount (max 5 SOL for devnet)");
      return;
    }

    setLoading(true);
    
    try {
      // Request airdrop
      const signature = await connection.requestAirdrop(
        wallet.publicKey, 
        amount * LAMPORTS_PER_SOL
      );
      
      // Wait for confirmation
      await connection.confirmTransaction(signature);
      
      alert(`Airdrop of ${amount} SOL sent successfully!\nTransaction: ${signature}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Solana Devnet Airdrop</h2>
      
      {wallet.connected ? (
        <div>
          <p>Wallet: {wallet.publicKey?.toString()}</p>
          <input 
            id="amount" 
            type="number" 
            placeholder="Amount (SOL)" 
            min="0.1"
            max="5"
            step="0.1"
          />
          <button 
            onClick={sendAirdropToUser} 
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Airdrop"}
          </button>
          <p><small>Max 5 SOL per airdrop on devnet</small></p>
        </div>
      ) : (
        <p>Please connect your wallet to request an airdrop</p>
      )}
    </div>
  );
}