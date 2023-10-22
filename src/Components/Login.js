import React, { useState } from 'react';
import { ethers } from 'ethers';

const LoginButton = ({ onLogin }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);

        if (onLogin) {
          onLogin(address);
        }
      } else {
        // Handle case when Ethereum provider is not available
        alert('Please install a Web3-enabled wallet (e.g., MetaMask) to connect.');
      }
    } catch (error) {
      // Handle error (e.g., user denied access)
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <p>Connected</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default LoginButton;
