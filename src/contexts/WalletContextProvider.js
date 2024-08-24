import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
        toast({
          title: "Wallet connected",
          description: "Your wallet has been successfully connected.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        toast({
          title: "Connection failed",
          description: "Failed to connect wallet. Please make sure MetaMask is installed and unlocked.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      console.error("MetaMask not detected");
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this app.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <WalletContext.Provider value={{ provider, signer, address, balance, setBalance, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);