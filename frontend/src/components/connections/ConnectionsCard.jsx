import React, {useState} from "react";
// import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button';
import { Button } from "@chakra-ui/button";
import axios from "axios";

const ConnectionsCard = ({userData}) => {
  const [error, setError] = useState("");
  const handleAcceptConnect = async (_id) => {
    // console.log(userID);
    try {
      const userID = sessionStorage.getItem("userID");
      const updateAcceptConnect = await axios.put(
        `http://localhost:3000/user/connected/` + userID,
        {
          connected: _id,
        }
      );
      if (updateAcceptConnect.status === 200) {
        alert("interest updated successfully");
        
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };
  return (
    <div className="feed">
      <div class="card" style={{ width: "24rem", marginBottom: "20px" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <div >
        <h1 class="header">{userData.userName}</h1>
        <p class="message">wants to connect</p>
        <div>
          <Button h="1.75rem" size="sm" variant="outline"  colorScheme="green" onClick={() => handleAcceptConnect(userData._id)} >Accept</Button>
          {/* <Button variant="outline-danger">Reject</Button> */}
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ConnectionsCard;
