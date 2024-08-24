import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';

const Result = ({ result, transactionHash }) => {
  return (
    <Box bg="gray.800" minHeight="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} bg="gray.900" p={10} borderRadius="xl" boxShadow="2xl">
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Coin Flip Result
        </Text>
        <Text fontSize="2xl" color="yellow.400">
          {result}
        </Text>
        {transactionHash && (
          <Text fontSize="lg" color="white">
            View transaction on Etherscan: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'yellow.400' }}>{transactionHash}</a>
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Result;