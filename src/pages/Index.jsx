import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Link, Box, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const storyIds = await response.json();
        const topFiveStoryIds = storyIds.slice(0, 5);

        const storyPromises = topFiveStoryIds.map(async (id) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyResponse.json();
        });

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4} overflowY="auto" maxH="80vh" width="100%">
          {stories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Link href={story.url} color="teal.500" isExternal>Read more</Link>
              <Text mt={2}>Upvotes: {story.score}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;