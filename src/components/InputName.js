import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";

const InputName = (props) => {
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  const [similar1, setSimilar1] = useState(true);
  const [similar2, setSimilar2] = useState(false);
  const [similar3, setSimilar3] = useState(false);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // props.nameHandler(name);
    switch (true) {
      case selected1:
        props.sizeHandler(24);
        break;
      case selected2:
        props.sizeHandler(36);
        break;
      case selected3:
        props.sizeHandler(48);
        break;
      default:
        break;
    }
    switch (true) {
      case similar1:
        props.similarHandler(2);
        break;
      case similar2:
        props.similarHandler(3);
        break;
      case similar3:
        props.similarHandler(4);
        break;
      default:
        break;
    }
    props.nameHandler(name);
    // console.log(name);
    setName("");
  };

  const ConditionalLink = ({ children, to, condition }) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

  //   <ConditionalLink to="/path" condition={!isComingFromModal}
  //   conditional link
  // </ConditionalLink>

  const selectButton1 = (event) => {
    setSelected1(true);
    setSelected2(false);
    setSelected3(false);
  };
  const selectButton2 = (event) => {
    setSelected1(false);
    setSelected2(true);
    setSelected3(false);
  };
  const selectButton3 = (event) => {
    setSelected1(false);
    setSelected2(false);
    setSelected3(true);
  };

  const similarButton1 = () => {
    setSimilar1(true);
    setSimilar2(false);
    setSimilar3(false);
  };
  const similarButton2 = () => {
    setSimilar1(false);
    setSimilar2(true);
    setSimilar3(false);
  };
  const similarButton3 = () => {
    setSimilar1(false);
    setSimilar2(false);
    setSimilar3(true);
  };
  return (
    <div className="name-main">
      <div className="game-name">
        <h2>Matching Game</h2>
      </div>
      <Form style={{ marginTop: "50px" }}>
        <Form.Group controlId="formGridPassword">
          <Form.Control
            type="text"
            placeholder="inter your name"
            style={{ maxWidth: "40%", margin: "0 auto" }}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <ButtonGroup
          size="lg"
          className="mb-2"
          style={{ display: "block", marginTop: "10px" }}
        >
          <Form.Label className="button-label1">Number of cards:</Form.Label>
          <Button
            variant={selected1 ? "dark" : "danger"}
            onClick={selectButton1}
          >
            24
          </Button>
          <Button
            variant={selected2 ? "dark" : "danger"}
            onClick={selectButton2}
          >
            36
          </Button>
          <Button
            variant={selected3 ? "dark" : "danger"}
            onClick={selectButton3}
          >
            48
          </Button>
        </ButtonGroup>
        <ButtonGroup
          size="lg"
          className="mb-2"
          style={{ display: "block", marginTop: "10px" }}
        >
          <Form.Label className="button-label2">Similar cards:</Form.Label>
          <Button
            variant={similar1 ? "dark" : "danger"}
            onClick={similarButton1}
          >
            2
          </Button>
          <Button
            variant={similar2 ? "dark" : "danger"}
            onClick={similarButton2}
          >
            3
          </Button>
          <Button
            variant={similar3 ? "dark" : "danger"}
            onClick={similarButton3}
          >
            4
          </Button>
        </ButtonGroup>
        <Link to="/board">
          <Button
            variant="dark"
            type="submit"
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
            required
          >
            Start
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default InputName;
