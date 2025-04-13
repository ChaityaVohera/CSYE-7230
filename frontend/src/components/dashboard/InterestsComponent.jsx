import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useToast, Heading, Button, ButtonGroup, Box, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import "./InterestsComponent.css";
 
const InterestsComponent = () => {
  const [error, setError] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([
    'Devops', 'Front-end', 'FullStack', 'HTML/CSS', 'JavaSvript', 'React',
    'Angular', 'Node.js', 'Express', 'Web-developer', 'Backend', 'Java',
    'Python', 'ComputerScience', 'UI/UX', 'Figma', 'SQL/NoSQL'
  ]);
  const userID = sessionStorage.getItem("userID");
  const toast = useToast();
 
  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        if (userID) {
          const response = await axios.get(`http://localhost:5000/user/interests/${userID}`);
          setSelectedInterests(response.data.interests);
        }
      } catch (error) {
        console.error("Error fetching user interests:", error);
      }
    };
    fetchUserInterests();
  }, []);
 
  const moveInterest = (interest) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
 
  const handleSaveInterest = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const userID = sessionStorage.getItem("userID");
      const { data } = await axios.put(
        "http://localhost:5000/user/interest/" + userID,
        { interest: selectedInterests },
        config
      );
 
      toast({
        title: "Interests Saved!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
 
  return (
<div className="interests-wrapper">
<Box className="interests-box">
<Heading size="lg" mb={4} textAlign="center" color="teal.600">
          Choose Your Interests
</Heading>
 
        <Box className="interests-section">
<Text className="section-title">Available Domains</Text>
<SimpleGrid columns={[2, 3, 4]} spacing={4} mb={6}>
            {allInterests.map((interest, index) => (
              !selectedInterests.includes(interest) && (
<Button
                  key={index}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => moveInterest(interest)}
                  className="interest-button"
>
                  {interest}
</Button>
              )
            ))}
</SimpleGrid>
</Box>
 
        <Box className="interests-section">
<Text className="section-title">Your Domains</Text>
<SimpleGrid columns={[2, 3, 4]} spacing={4} mb={6}>
            {selectedInterests.map((interest, index) => (
<Button
                key={index}
                colorScheme="green"
                variant="solid"
                className="interest-selected"
>
                {interest}
</Button>
            ))}
</SimpleGrid>
 
          <Flex justify="center">
<Button
              colorScheme="teal"
              variant="solid"
              size="md"
              onClick={handleSaveInterest}
>
              Save Interests
</Button>
</Flex>
</Box>
</Box>
</div>
  );
};
 
export default InterestsComponent;