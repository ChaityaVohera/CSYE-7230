import React, { useState } from "react";
import { Button, Input, Textarea, Select, useToast } from "@chakra-ui/react";
import axios from "axios";

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
  const [title, setTitle] = useState("");    // State for post title
  const [text, setText] = useState("");      // State for post text
  const [category, setCategory] = useState(""); // State for category (optional)
  const [error, setError] = useState("");    // State for error message
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
        title,
        text,
        domain: category || null, // Send category if selected, else null
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
        setCategory(""); // Reset category
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
      <Select
        placeholder="(Optional) Select Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb={4}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      <Button onClick={handleCreatePost} colorScheme="teal">
        Create Post
      </Button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default CreatePost;

