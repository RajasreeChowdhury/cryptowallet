import React from 'react';
import { Button, VStack, Text, Box, Image } from '@chakra-ui/react';
import { useWallet } from '../contexts/WalletContextProvider';
import EthereumIcon from '../assets/ethereum-icon.png';

const ConnectWallet = () => {
  const { connectWallet } = useWallet();

  return (
    <Box bg="gray.800" minHeight="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} bg="gray.900" p={10} borderRadius="xl" boxShadow="2xl">
      <Box bg="yellow.400" borderRadius="full" p={3}>
          <Image src={EthereumIcon} alt="Ethereum Icon" boxSize="50px" />
        </Box>
        <Text fontSize="4xl" fontWeight="bold" color="white">
          Welcome to Ethereum Coin Flip!
        </Text>
        <Text fontSize="2xl" color="white">
          Please connect your Wallet
        </Text>
        <Button 
          onClick={connectWallet} 
          bg="gray.600" 
          color="yellow.300"
          _hover={{ bg: "gray.500", color: "yellow.400" }}
          size="lg"
          fontWeight="bold"
          px={8}
          py={6}
        >
          Connect Wallet
        </Button>
      </VStack>
    </Box>
  );
};

export default ConnectWallet;