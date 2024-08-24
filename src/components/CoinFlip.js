import React, { useState } from 'react';
import { Button, VStack, Text, Input, Box, HStack } from '@chakra-ui/react';
import { useWallet } from '../contexts/WalletContextProvider';
import { ethers } from 'ethers';

const CoinFlip = () => {
  const { signer, provider, address, balance, setBalance } = useWallet();
  const [betAmount, setBetAmount] = useState('');
  const [side, setSide] = useState('');
  const [result, setResult] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [flips, setFlips] = useState(0); // Counter for number of flips
  const [showResult, setShowResult] = useState(false); // Define showResult state

  const handleFlip = async () => {
    if (!signer || !betAmount || !side) return;

    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const abi = [
      'function flipCoin(bool guess) external payable returns (bool)'
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.flipCoin(side === 'heads', {
      value: ethers.utils.parseEther(betAmount)
    });

    setTransactionHash(tx.hash); // Capture the transaction hash

    // Show result immediately
    const flipResult = Math.random() < 0.5 ? 'heads' : 'tails'; 
    setResult(flipResult);
    setShowResult(true);

    if (flipResult === side) {
      setWins(wins + 1);
    } else {
      setLosses(losses + 1);
    }

    setFlips(flips + 1); // Increment the flip counter

    // Wait for the transaction to be confirmed and then update the balance
    tx.wait().then(() => {
      provider.getBalance(address).then((updatedBalance) => {
        setBalance(ethers.utils.formatEther(updatedBalance)); // Update the balance in your context
      });
    });

    // Reset UI after a short delay
    setTimeout(() => {
      setSide('');
      setShowResult(false);
      setTransactionHash(''); // Clear the transaction hash
    }, 3000);
  };

  return (
    <Box bg="gray.800" minHeight="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} bg="gray.900" p={12} borderRadius="xl" boxShadow="2xl" width="400px">
        <Text fontSize="lg" color="yellow.400">Number of Coins Flipped: {flips}</Text> {/* Display flip count */}
        <Text color="white">Address: {address}</Text>
        <Text fontSize="lg" color="yellow.400">Wins: {wins} | Losses: {losses}</Text>
        <Text fontSize="2xl" color="white">Balance: {balance} ETH</Text>
        <Input
          placeholder="Bet Amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          bg="white"
        />
        <HStack spacing={4}>
          <Button onClick={() => setSide('heads')} colorScheme={side === 'heads' ? 'yellow' : 'gray'}>
            Heads
          </Button>
          <Button onClick={() => setSide('tails')} colorScheme={side === 'tails' ? 'yellow' : 'gray'}>
            Tails
          </Button>
        </HStack>
        <Button onClick={handleFlip} colorScheme="blue">
          Flip Coin
        </Button>
        {showResult && (
          <Text fontSize="2xl" color={result === side ? 'green.400' : 'red.400'}>
            Result: {result.charAt(0).toUpperCase() + result.slice(1)}! You {result === side ? 'win' : 'lose'}!!
          </Text>
        )}
        {transactionHash && (
          <Text fontSize="sm" color="yellow.400">
            Transaction Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionHash}</a>
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default CoinFlip;