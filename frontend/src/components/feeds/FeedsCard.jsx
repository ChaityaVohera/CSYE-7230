import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Spinner,
  useToast,
  Flex,
  Heading,
  Button
} from "@chakra-ui/react";
import axios from "axios";

function FeedsCard() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Check if user is logged in
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const currentUserId = userInfo?._id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/posts/getPosts");
        
        // Handle both array and object responses
        const receivedData = response.data;
        
        if (Array.isArray(receivedData)) {
          // Backend returns direct array
          setPosts(receivedData);
        } else if (receivedData && Array.isArray(receivedData.data)) {
          // Backend returns { data: [...] }
          setPosts(receivedData.data);
        } else {
          throw new Error("Received unexpected data format");
        }
      } catch (error) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  if (loading) {
    return (
      <Flex justify="center" mt={10}>
        <Spinner size="xl" thickness="3px" emptyColor="gray.200" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" maxWidth="800px" mx="auto" px={4} py={6}>
      {posts.length === 0 ? (
        <Box textAlign="center" py={10} borderRadius="lg" bg="gray.50" p={6}>
          <Heading size="md" mb={2} color="gray.600">
            No posts available
          </Heading>
          <Text color="gray.500">
            Be the first to create a post!
          </Text>
          {!currentUserId && (
            <Button mt={4} colorScheme="blue" onClick={() => window.location.href = "/login"}>
              Login to Post
            </Button>
          )}
        </Box>
      ) : (
        posts.map(post => (
          <Box 
            key={post._id}
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            mb={5}
            boxShadow="sm"
            bg="white"
          >
            <Box mb={4}>
              <Heading as="h2" size="lg" mb={3}>{post.title}</Heading>
              <Text fontSize="md" mb={4}>{post.text}</Text>
            </Box>

            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="gray.500">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </Text>
              {currentUserId && (
                <Text fontSize="sm" color="gray.500">
                  {post.userId === currentUserId ? "Your post" : "User's post"}
                </Text>
              )}
            </Flex>
          </Box>
        ))
      )}
    </Box>
  );
}

export default FeedsCard;