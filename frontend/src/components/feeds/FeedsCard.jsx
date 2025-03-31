import React, { useState } from "react";
// import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import { Heading } from '@chakra-ui/react'
import axios from "axios";


function FeedsCard({ userData, onSendData }) {
  console.log(userData)
  const [error, setError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleInterested = async (_id) => {
    // console.log(userID);
    try {
      const userID = sessionStorage.getItem("userID");
      const updateInterestResponse = await axios.put(
        `http://localhost:5000/user/interested/` + _id,
        {
          interested: userID,
        }
      );
      if (updateInterestResponse.status === 200) {
        alert("interest updated successfully");
        setButtonClicked(true);
        onSendData(buttonClicked);

      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  // const handleViewProfile = async()=>{
  //   try {
  //     const updateViewProfile = await axios.get(
  //       `http://localhost:3000/user/viewProfile/` + _id
  //     );
  //     console.log(updateViewProfile);
      
  //   } catch (error) {
  //     if (error.response) {
  //       setError(error.response.data.error);
  //     } else {
  //       setError("An error occurred while processing your request.");
  //     }
  //   }
  // }

  

  return (
    <div className="feed">
       <div class="card" style={{ width: "24rem", marginBottom: "20px" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <div >
        <Heading as='h2' size='lg' class="header">{userData.userName}</Heading>
        <p class="message">{userData.bio}</p>
        <Heading as='h2' size='lg' class="header">Domain</Heading>
        <p class="message">
          {userData.interest.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </p>
        <div class="actions">
        <Button h="1.75rem" size="sm"  colorScheme="green"  onClick={() => handleInterested(userData._id)}  variant="outline">Connect</Button>
        {/* <Button  variant="outline-danger">Not Interested</Button> */}
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default FeedsCard;
