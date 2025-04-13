import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Spinner,
  useToast,
  Flex,
  Heading,
  Button,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import "./FeedsCard.css"; // 🔁 Import the CSS file
 
function FeedsCard() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [interestedDomains, setInterestedDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [selectedDomain, setSelectedDomain] = useState(null);
 
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const currentUserId = userInfo?._id;
 
  const fetchPosts = async () => {
    try {
      setLoading(true);
 
      const postsResponse = await axios.get("http://localhost:5000/posts/getPosts");
      const receivedData = postsResponse.data;
      if (Array.isArray(receivedData)) {
        setPosts(receivedData);
      } else if (receivedData && Array.isArray(receivedData.data)) {
        setPosts(receivedData.data);
      } else {
        throw new Error("Received unexpected data format");
      }
 
      if (currentUserId) {
        const userResponse = await axios.get(`http://localhost:5000/user/getDomains/${currentUserId}`);
        if (userResponse.data.success) {
          setInterestedDomains(userResponse.data.interest || []);
        } else {
          setInterestedDomains([]);
        }
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
 
  useEffect(() => {
    fetchPosts();
  }, [toast, currentUserId]);
 
  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    const filteredPosts = posts.filter((post) => post.domain === domain);
    setPosts(filteredPosts.length > 0 ? filteredPosts : []);
  };
 
  const handleGeneralClick = () => {
    setSelectedDomain(null);
    fetchPosts();
  };
 
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
<div className="feeds-wrapper">
      {currentUserId && (
<Box className="sticky-sidebar">
<Heading size="md" mb={4}>Your Interests</Heading>
          {interestedDomains.length > 0 ? (
<VStack align="start" spacing={3}>
              {interestedDomains.map((domain, index) => (
<Text
                  key={index}
                  fontSize="sm"
                  fontWeight="medium"
                  color={domain === selectedDomain ? "blue.800" : "blue.600"}
                  cursor="pointer"
                  onClick={() => handleDomainClick(domain)}
                  _hover={{ color: "blue.800" }}
>
                  {domain}
</Text>
              ))}
</VStack>
          ) : (
<Text fontSize="sm" color="gray.500">No interests added</Text>
          )}
<Box mt={6}>
<Heading size="md" mb={4}>General</Heading>
<Text
              fontSize="sm"
              color={selectedDomain === null ? "blue.800" : "blue.600"}
              cursor="pointer"
              onClick={handleGeneralClick}
              _hover={{ color: "blue.800" }}
>
              General Option
</Text>
</Box>
</Box>
      )}
 
      <Box className="scrollable-content">
        {posts.length === 0 ? (
<Box textAlign="center" py={10} borderRadius="lg" bg="gray.50" p={6}>
<Heading size="md" mb={2} color="gray.600">
              No posts available
</Heading>
<Text color="gray.500">
              Be the first to create a post!
</Text>
            {!currentUserId && (
<Button mt={4} colorScheme="blue" onClick={() => window.location.href = "/login"}>Login to Post</Button>
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
<Heading as="h2" size="lg" mb={2}>{post.title}</Heading>
                {post.domain && (
<Text fontSize="sm" fontWeight="bold" color="blue.600" mb={2}>
                    Domain: {post.domain}
</Text>
                )}
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
</div>
  );
}
 
export default FeedsCard;