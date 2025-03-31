import React, { useState, useEffect } from 'react';
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
const InterestsComponent = () => {
  const [error, setError] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [allInterests, setAllInterests] = useState(['Devops', 'Front-end', 'FullStack', 'HTML/CSS', 'JavaSvript', 'React', 'Angular', 'Node.js', 'Express', 'Web-developer', 'Backend', 'Java', 'Python', 'ComputerScience', 'UI/UX', 'Figma', 'SQL/NoSQL']); 
  const userID = sessionStorage.getItem("userID");
  const toast = useToast();
  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const userID = sessionStorage.getItem("userID");
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
    // try {
    //   const userID = sessionStorage.getItem("userID");
    //   const updateUserResponse = await axios.put(
    //     `http://localhost:5000/user/interest/` + userID,
    //     {
    //       "interest": selectedInterests,
    //     }
    //   );
    //   if (updateUserResponse.status === 200) {
    //     alert("Interest updated successfully");
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     setError(error.response.data.error);
    //   } else {
    //     setError("An error occurred while processing your request.");
    //   }
    // }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/user/interest/" + userID,
        {
          "interest": selectedInterests,
        },
        config
      );

      toast({
        title: "interest Saved",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <div className='interests-main'>
      <div className='interests-top'>
        <Heading as='h3' size='lg'>All Domains</ Heading>
        {allInterests.map((interest, index) => (
          !selectedInterests.includes(interest) && (
            <ButtonGroup variant='outline' spacing='6'>
              <Button colorScheme='blue' key={index} onClick={() => moveInterest(interest)}>
              {interest}
            </Button>
            </ButtonGroup>
            
          )
        ))}
      </div>

      <div className='interests-bottom'>
        <Heading as='h3' size='lg'>Your Domains</Heading>
        {selectedInterests.map((interest, index) => (
          <ButtonGroup variant='outline' spacing='6'>
            <Button colorScheme='blue' key={index}>{interest}</Button>
          </ButtonGroup>
        ))}
        <Button colorScheme='green' onClick={handleSaveInterest} variant="outline-primary">Save</Button>
      </div>
    </div>
  );
};

export default InterestsComponent;
