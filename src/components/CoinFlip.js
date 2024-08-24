import React, { useState } from 'react';
import { Button, VStack, Text, Input, Box, HStack } from '@chakra-ui/react';
import { useWallet } from '../contexts/WalletContextProvider';
import { ethers } from 'ethers';

const CoinFlip = () => {
  const { signer, balance, address } = useWallet();
  const [betAmount, setBetAmount] = useState('');
  const [side, setSide] = useState('');
  const [result, setResult] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleFlip = async () => {
    if (!signer || !betAmount || !side) return;

    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const abi = [
      "function flipCoin(bool guess) external payable returns (bool)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.flipCoin(side === 'heads', {
      value: ethers.utils.parseEther(betAmount)
    });

    await tx.wait();

    const flipResult = Math.random() < 0.5 ? 'heads' : 'tails'; // Simulate result for now
    setResult(flipResult);
    setShowResult(true);

    if (flipResult === side) {
      setWins(wins + 1);
    } else {
      setLosses(losses + 1);
    }

    setTimeout(() => {
      setSide('');
      setShowResult(false);
    }, 3000);
  };

  return (
    <Box bg="gray.800" minHeight="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} bg="gray.900" p={12} borderRadius="xl" boxShadow="2xl" width="400px">
        <Text fontSize="2xl" color="white">Address: {address}</Text>
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
      </VStack>
    </Box>
  );
};

export default CoinFlip;