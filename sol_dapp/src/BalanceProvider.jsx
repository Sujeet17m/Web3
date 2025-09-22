// BalanceProvider.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const BalanceContext = createContext();

export function useBalances() {
  return useContext(BalanceContext);
}

export function BalanceProvider({ children, pollInterval = 15000 }) {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [solBalance, setSolBalance] = useState(null);
  const [tokens, setTokens] = useState([]); // [{mint, uiAmount, decimals, account}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalances = useCallback(async () => {
    if (!publicKey || !connection) {
      setSolBalance(null);
      setTokens([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // SOL
      const lamports = await connection.getBalance(publicKey, "confirmed");
      setSolBalance(lamports / LAMPORTS_PER_SOL);

      // SPL tokens (parsed)
      const resp = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const parsed = resp.value
        .map((v) => {
          const info = v.account.data.parsed.info;
          const tokenAmount = info.tokenAmount;
          return {
            account: v.pubkey.toString(),
            mint: info.mint,
            uiAmount: tokenAmount.uiAmount,
            amountRaw: tokenAmount.amount,
            decimals: tokenAmount.decimals,
          };
        })
        .filter((t) => t.uiAmount && t.uiAmount > 0);

      setTokens(parsed);
    } catch (err) {
      console.error("fetchBalances error", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection]);

  // initial fetch + polling
  useEffect(() => {
    if (!connected) {
      setSolBalance(null);
      setTokens([]);
      setError(null);
      return;
    }

    fetchBalances();
    const id = setInterval(fetchBalances, pollInterval);
    return () => clearInterval(id);
  }, [connected, fetchBalances, pollInterval]);

  // expose function to let other components trigger refetch (e.g., after airdrop)
  const refreshBalances = useCallback(async () => {
    await fetchBalances();
  }, [fetchBalances]);

  return (
    <BalanceContext.Provider value={{ solBalance, tokens, loading, error, refreshBalances }}>
      {children}
    </BalanceContext.Provider>
  );
}
