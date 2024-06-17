import { Container, Text, VStack, Box, Link, useColorMode, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const topFiveStoryIds = storyIds.slice(0, 5);
        return Promise.all(
          topFiveStoryIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => response.json())
          )
        );
      })
      .then((stories) => setStories(stories));
  }, []);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container centerContent maxW="container.md" p={4}>
      <Box display="flex" justifyContent="space-between" width="100%" mb={4}>
        <Text fontSize="2xl">Hacker News Top Stories</Text>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Box>
      <Box as="input" placeholder="Search stories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} width="100%" p={2} borderRadius="md" borderColor="gray.300" />
      <VStack spacing={4} width="100%">
        {filteredStories.map((story) => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              {story.title}
            </Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>
              Read more
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;