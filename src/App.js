import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { WalletProvider, useWallet } from './contexts/WalletContextProvider';
import ConnectWallet from './components/ConnectWallet';
import CoinFlip from './components/CoinFlip';

const AppContent = () => {
  const { address } = useWallet();

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
      {!address ? <ConnectWallet /> : <CoinFlip />}
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;