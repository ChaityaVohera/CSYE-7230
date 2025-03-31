import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import FeedsCard from "./FeedsCard";
import feed from "../assets/feed.png";
import dashboard from "../assets/dashboard.png";
import interest from "../assets/interests.png";
import chat from "../assets/chat.png";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
const Feeds = () => {
  const [error, setError] = useState("");
  const [updatedUsers, setUpdatedusers] = useState([]);

  const [childData, setchildData] = useState(false);
  const handleFeedsCardData = (buttonClicked) => {
    setchildData(buttonClicked);
  };
  useEffect(() => {
    const showFeeds = async () => {
      try {
        const userID = sessionStorage.getItem("userID");
        const response = await axios.get("http://localhost:5000/user/getAll");
        console.log(response);
        if (response.status === 200) {
          const currentUser = response.data.find((user) => user._id === userID);
          if (currentUser) {
            const otherUsers = response.data.filter(
              (user) =>
                user._id !== userID && user.interested.includes(userID) !== true
            );
            console.log(otherUsers);
            setUpdatedusers(otherUsers);
            setchildData(true);
          } else {
            console.log("User not found");
          }
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while processing your request.");
        }
      }
    };

    showFeeds();
  }, [childData]);

  return (
    <div className="feedcentre">
      <div className="feedContents">
        <div className="feedmain">
          {updatedUsers.map((user) => (
            <div key={user._id}>
              {user && (
                <FeedsCard userData={user} onSendData={handleFeedsCardData} />
              )}
            </div>
          ))}
        </div>
        <div className="icons" aria-label="Basic example">
          <ButtonGroup variant="outline" spacing="6">
            <Button>
              <Link to="/feeds">
                <img style={{ width: "20px" }} src={feed} alt="" />
              </Link>
            </Button>
            <Button>
              <Link to="/chats">
                <img style={{ width: "20px" }} src={chat} alt="" />
              </Link>
            </Button>
            <Button>
              <Link to="/connections">
                <img style={{ width: "20px" }} src={interest} alt="" />
              </Link>
            </Button>
            <Button>
              <Link to="/dashboard">
                <img style={{ width: "20px" }} src={dashboard} alt="" />
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
