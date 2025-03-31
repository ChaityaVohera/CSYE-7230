import React, { useState } from "react";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");  // State for post title
  const [text, setText] = useState("");    // State for post text
  const [error, setError] = useState("");  // State for error message
  const toast = useToast();  // To display success/error messages

  // Handle the form submission to create a post
  const handleCreatePost = async () => {
    if (!title || !text) {
      toast({
        title: "Validation Error!",
        description: "Please fill in both title and text fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const userID = sessionStorage.getItem("userID");
      if (!userID) {
        toast({
          title: "Error!",
          description: "User is not logged in.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Prepare the data to be sent to the backend
      const postData = {
        title: title,
        text: text,
        userId: userID,
      };

      // Make the POST request to create a new post
      const response = await axios.post("http://localhost:5000/posts/create", postData);

      if (response.status === 200) {
        toast({
          title: "Post Created!",
          description: "Your post has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTitle("");  // Reset title field
        setText("");   // Reset text field
      }
    } catch (error) {
      setError("An error occurred while creating the post.");
      toast({
        title: "Error!",
        description: "Failed to create post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <Textarea
        placeholder="Write your post"
        value={text}
        onChange={(e) => setText(e.target.value)}
        mb={4}
      />
      <Button onClick={handleCreatePost} colorScheme="teal">
        Create Post
      </Button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default CreatePost;
