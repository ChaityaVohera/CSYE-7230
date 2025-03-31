import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import "../dashboard/dashboard.css";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Flex, Spacer, Center, Box } from '@chakra-ui/react'

import InterestsComponent from "./InterestsComponent";
import { Link } from "react-router-dom";

// import ProtectedRoute from "../protectedroute/Protectedroute";
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
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
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
    <div className="dashboard-main">
      <Flex className="dashboard ">
        <Box w='30vh' className="dash-left ">
          <div>
            <Button h="1.75rem" size="sm" onClick={toggleForm}>
              Edit profile
            </Button>{" "}
          </div>
          <div>
            <Button h="1.75rem" size="sm" onClick={toggleInterest}>
              Interests
            </Button>{" "}
          </div>
          <div>
            <Link to="/feeds">
              <Button h="1.75rem" size="sm" variant="solid" colorScheme="green">
                Feeds
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/chats">
              <Button h="1.75rem" size="sm" variant="solid" colorScheme="green">
                Chat
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/connections">
              <Button h="1.75rem" size="sm" variant="solid" colorScheme="green">
                Connections
              </Button>
            </Link>
          </div>
        </Box>
        <Box  className="dash-right " >
          {showForm && (
            <form onSubmit={handleEditProfile}>
              <div className="mb-3">
                <FormControl >
                  <FormLabel className="formlable">Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormControl>
                <FormControl controlId="formGridUsername">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </div>
              <FormControl className="mb-3" controlId="formGridBio">
                <FormLabel>Course & Batch</FormLabel>
                <Input
                  placeholder="Bio"
                  onChange={(e) => setBio(e.target.value)}
                />
            </FormControl>
              <FormControl controlId="formGridGender">
                <FormLabel>Gender</FormLabel>
                <Input onChange={(e) => setGender(e.target.value)} />
              </FormControl>
              <Button h="1.75rem" size="sm" type="submit">
                Submit
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          )}
          {showInterest && (
            // <form>
            //   {/* Your form elements */}
            //   <input type="text" placeholder="Name" />
            //   {/* Add more form fields */}
            //   <button type="submit">Submit</button>
            //   {error && <p style={{ color: "red" }}>{error}</p>}
            // </form>

            <InterestsComponent />
          )}
        </Box>
      </Flex>
    </div>
    // <div className="">
    //   <h1>
    //     hi
    //   </h1>
    // </div>
  );
};

export default Dashboard;
