import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import "./CreatePost.css";
 
const categories = [
  "Front-end",
  "HTML/CSS",
  "Angular",
  "Backend",
  "Devops",
  "SQL/NoSQL",
  "FullStack",
  "React",
  "Node.js",
  "Web-developer",
  "Java",
  "Python",
  "ComputerScience",
  "UI/UX",
  "Figma",
  "Express",
  "JavaSvript",
];
 
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
 
  const handleCreatePost = async () => {
    if (!title || !text) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and text fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
 
    try {
      const userID = sessionStorage.getItem("userID");
      if (!userID) {
        toast({
          title: "Error",
          description: "User is not logged in.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
 
      const postData = {
        title,
        text,
        domain: category || null,
        userId: userID,
      };
 
      const response = await axios.post("http://localhost:5000/posts/create", postData);
 
      if (response.status === 200) {
        toast({
          title: "Post Created!",
          description: "Your post has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTitle("");
        setText("");
        setCategory("");
      }
    } catch (error) {
      setError("An error occurred while creating the post.");
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
 
  return (
<Flex className="page-container">
<Box className="form-container">
<Heading size="lg" textAlign="center" mb={6} color="teal.600">
          Create a New Post
</Heading>
<VStack spacing={4} align="stretch">
<Input
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
<Textarea
            placeholder="Write your post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
          />
<Select
            placeholder="(Optional) Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
>
            {categories.map((cat, index) => (
<option key={index} value={cat}>
                {cat}
</option>
            ))}
</Select>
<Button colorScheme="teal" onClick={handleCreatePost}>
            Create Post
</Button>
          {error && (
<Text fontSize="sm" color="red.500" mt={2}>
              {error}
</Text>
          )}
</VStack>
</Box>
</Flex>
  );
};
 
export default CreatePost;