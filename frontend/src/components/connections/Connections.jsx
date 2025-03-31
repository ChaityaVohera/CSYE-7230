import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import feed from "../assets/feed.png";
import dashboard from "../assets/dashboard.png";
import interest from "../assets/interests.png";
import chat from "../assets/chat.png";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import ConnectionsCard from "./ConnectionsCard";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
const Connections = () => {
  const [error, setError] = useState("");
  const [updatedConnections, setUpdatedConnections] = useState([]);
  useEffect(() => {
    const showConnections = async () => {
      try {
        const userID = sessionStorage.getItem("userID");
        const response = await axios.get("http://localhost:3000/user/getAll");
        if (response.status === 200) {
          const currentUser = response.data.find((user) => user._id === userID);
          console.log(userID);
          if (currentUser) {
            const connectedUsersID = currentUser.interested;
            console.log(connectedUsersID);
            const connectedUsers = [];
            connectedUsersID.forEach((whole) => {
              connectedUsers.push(
                ...response.data.filter((user) => user._id === whole)
              );
            });
            // const connectedUsers = response.data.filter((user) => user._id === connectedUsersID)
            console.log(connectedUsers);
            setUpdatedConnections(connectedUsers);
          } else {
            console.log("No connections found");
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

    showConnections();
  }, []);

  return (
    <div className="feedcentre">
      <div className="feedContents">
        <div className="feedmain">
          {updatedConnections.map((user) => (
            <div key={user._id}>
              {user && <ConnectionsCard userData={user} />}
            </div>
          ))}
        </div>
        <div className="icons" aria-label="Basic example">
          <ButtonGroup variant="outline" spacing="6">
            <Button>
              <Link className="navbar-brand-link" to="/feeds">
                <img style={{ width: "20px" }} src={feed} alt="" />
              </Link>
            </Button>
            <Button>
              <Link to="/chats">
                <img style={{ width: "20px" }} src={chat} alt="" />
              </Link>
            </Button>
            <Button>
              <Link className="navbar-brand-link" to="/connections">
                <img style={{ width: "20px" }} src={interest} alt="" />
              </Link>
            </Button>
            <Button>
              <Link className="navbar-brand-link" to="/dashboard">
                <img style={{ width: "20px" }} src={dashboard} alt="" />
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Connections;
