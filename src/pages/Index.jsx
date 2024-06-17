// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Button, useColorMode } from "@chakra-ui/react";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
      <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
