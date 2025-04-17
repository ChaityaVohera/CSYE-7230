import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import "../dashboard/dashboard.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";
import InterestsComponent from "./InterestsComponent";
import { Link } from "react-router-dom";
 
const Dashboard = () => {
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const userID = sessionStorage.getItem("userID");
  const toast = useToast();
 
  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-type": "application/json" } };
      await axios.put(
        "http://localhost:5000/user/edit/" + userID,
        {
          fullName: fullName,
          userName: username,
          bio: bio,
          gender: gender,
        },
        config
      );
      toast({
        title: "Edit Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
 
  const [showForm, setShowForm] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
 
  const toggleForm = () => {
    setShowForm(!showForm);
    setShowInterest(false);
  };
 
  const toggleInterest = () => {
    setShowInterest(!showInterest);
    setShowForm(false);
  };
 
  return (
<div className="dashboard-wrapper">
<Box className="dashboard-content">
<Heading size="md" mb={4}>
          Dashboard
</Heading>
 
        <Button h="2.2rem" w="100%" mb={3} onClick={toggleForm}>
          Edit Profile
</Button>
 
        <Button h="2.2rem" w="100%" mb={3} onClick={toggleInterest}>
          Interests
</Button>
 
        <Link to="/post">
<Button h="2.2rem" w="100%" mb={3} colorScheme="teal">
            Post
</Button>
</Link>
 
        <Link to="/chats">
<Button h="2.2rem" w="100%" mb={3} colorScheme="teal">
            Chat
</Button>
</Link>
 
        <Link to="/feed">
<Button h="2.2rem" w="100%" mb={3} colorScheme="teal">
            Feed
</Button>
</Link>
 
        <Box mt={6} w="100%">
          {showForm && (
<form onSubmit={handleEditProfile}>
<VStack spacing={4} align="stretch">
<FormControl>
<FormLabel>Name</FormLabel>
<Input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
</FormControl>
 
                <FormControl>
<FormLabel>Username</FormLabel>
<Input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
</FormControl>
 
                <FormControl>
<FormLabel>Course & Batch</FormLabel>
<Input
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                  />
</FormControl>
 
                <FormControl>
<FormLabel>Gender</FormLabel>
<Input onChange={(e) => setGender(e.target.value)} />
</FormControl>
 
                <Button type="submit" colorScheme="teal">
                  Submit
</Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
</VStack>
</form>
          )}
 
          {showInterest && <InterestsComponent />}
</Box>
</Box>
</div>
  );
};
 
export default Dashboard;