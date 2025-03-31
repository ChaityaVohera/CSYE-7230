import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
const ViewProfile = () => {
    const [error, setError] = useState("");

    useEffect(()=>{
        const showProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/getAll");
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.error);
                  } else {
                    setError("An error occurred while processing your request.");
                  }
            }
        };
    }, []);


  return (
    <Container className="feedcentre">
      <Row>
        <Col className="feedmain">
          <Card
            style={{
              width: "24rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>hi</Card.Title>
              <Card.Text>hi</Card.Text>
              <Card.Title>Interests:</Card.Title>
              <Card.Text>hi</Card.Text>
              <div>
                <Button variant="outline-success">Connect</Button>
                {/* <Button  variant="outline-danger">Not Interested</Button> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProfile;
