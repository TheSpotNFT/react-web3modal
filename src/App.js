import logo from "./logo.svg";
import './index.css';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import React, { useState, useEffect, useCallback } from 'react';
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import VideoPlayer from './Components/Vimeo';
import VideoForm from './Components/Url';
import UserList from "./Components/ActiveUsers";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserClick = (user) => {
    setSelectedUser(user.username);
    console.log('Selected user:', selectedUser);
  };
  console.log(process.env.INFURA_ID)
  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnect, // required
      options: {
        infuraId:  process.env.INFURA_ID// required
      }
    },
  
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Coinbase", // Required
        infuraId: process.env.INFURA_ID, // Required
        chainId: 4, //4 for Rinkeby, 1 for mainnet (default)
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "light", // optional, 'dark' / 'light',
    cacheProvider: false, // optional
    providerOptions, // required
  });

  const [connectedAccount, setConnectedAccount] = useState("");

  const connectWeb3Wallet = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await library.listAccounts();
      setConnectedAccount(web3Accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setConnectedAccount("");
  };

  return (
    <div className="">
      <header className="pt-4 pl-4 pb-4">
        {connectedAccount && <p>Connected to {connectedAccount}</p>}
        {!connectedAccount ? (
          <button className="rounded-lg px-4 md:px-8 xl:px-12 py-1 text-xs md:text-l 2xl:text-xl font-mono text-orange-500 bg-slate-900 bg-opacity-80 
          hover:bg-spot-yellow hover:border-white hover:text-orange-300 hover:bg-opacity-100 duration-300" onClick={connectWeb3Wallet}>Connect Wallet</button>
        ) : (
          <button className="rounded-lg px-4 md:px-8 xl:px-12 py-1 text-xs md:text-l 2xl:text-xl font-mono text-orange-500 bg-slate-900 bg-opacity-80 
          hover:bg-spot-yellow hover:border-white hover:text-orange-300 hover:bg-opacity-100 duration-300" onClick={disconnectWeb3Modal}>Disconnect</button>
        )}
      </header>
      <div className="flex">
      <div className='bg-white w-1/2 h-full border-2 border-black p-8'> <UserList selectedUser={selectedUser} handleUserClick={handleUserClick} /></div>
      <div className='bg-white w-3/4 h-full border-2 border-black p-8'> <VideoPlayer selectedUser={selectedUser} /></div>
    </div></div>
  );
}

export default App;
//   <div className='bg-white w-1/2 h-full border-2 border-black p-8'> <VideoForm/></div>