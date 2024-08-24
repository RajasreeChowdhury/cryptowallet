import React from 'react';
import { VStack, Text, Box, Flex } from '@chakra-ui/react';

const Result = ({ result, transactionHash }) => {
  return (
    <Box bg="gray.800" minHeight="100vh" width="100vw" display="flex" flexDirection="column" justifyContent="space-between">
      <VStack spacing={8} bg="gray.900" p={10} borderRadius="xl" boxShadow="2xl" alignItems="center" justifyContent="center" flexGrow={1}>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Coin Flip Result
        </Text>
        <Text fontSize="2xl" color="yellow.400">
          {result}
        </Text>
      </VStack>
      {transactionHash && (
        <Flex justifyContent="center" p={4} bg="gray.900">
          <Text fontSize="sm" color="white">
            View transaction on Etherscan: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'yellow.400' }}>{transactionHash}</a>
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Result;