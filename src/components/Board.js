import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Timer from "./Timer";
import Card from "./Card";
import { Link } from "react-router-dom";
import $ from 'jquery';
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

const Board = (props) => {
  const [cards, setCards] = useState(props.cards);
  const [checkers, setCheckers] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);

  const onCardClick = (card) => () => {
    if (checkersFull(checkers) || cardAlreadyInCheckers(checkers, card) || card.done) return;
    const newCheckers = [...checkers, card];
    setCheckers(newCheckers);
    const cardsInCheckersMatched = validateCheckers(newCheckers);
    if (cardsInCheckersMatched) {
      setCompleted([...completed, newCheckers[0].type]);
      // setCards(cards.filter(card => card.type !== newCheckers[0].type))
      console.log("matched");
    }
    if (checkersFull(newCheckers)) {
      resetCheckersAfter(1000);
    }
    function validateCheckers(checkers) {
      return checkers.length === 2 && checkers[0].type === checkers[1].type;
    }
    function cardAlreadyInCheckers(checkers, card) {
      return checkers.length === 1 && checkers[0].id === card.id;
    }
    function checkersFull(checkers) {
      return checkers.length === 2;
    }
    function resetCheckersAfter(time) {
      setTimeout(() => {
        if(cardsInCheckersMatched) {
          // setCards(cards.filter(card => card.type !== checkers[0].type))
          card.done = true; // opacity must be 0
        }
        setCheckers([]);
      }, time);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 3600);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        let computedHour =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHour);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    // setCounter(0);
    // setSecond("00");
    // setMinute("00");
    // setHour("00");
  }

  useEffect(() => {
    const newCards = cards.map((card) => ({
      ...card,
      flipped:
        checkers.find((c) => c.id === card.id) || completed.includes(card.type),
    }));
    setCards(newCards);
  }, [checkers, completed]);

  const ExitButton = () => {
    // var searchbar = document.getElementsByClassName("ranking");
    // searchbar.style.display = "block";
    if (document.getElementById("ranking").style.display === "block") {
      document.getElementById("ranking").style.display = "none";
      // $('#App').css("webkitFilter","blur(0px)");
      $('#App').css("background-color","rgb(242, 242, 242, 1)");
      $('#img-card').css("background-color","");
    } else {
      document.getElementById("ranking").style.display = "block";
      $('#App').css("background-color","gray");
      $('#img-card').css("background-color","gray");
      // $('#App').css("webkitFilter","blur(3px)");
      // $('#ranking').css("webkitFilter","blur(0px)");
      // document.getElementById("App").style.webkitFilter = "blur(3px)";
      // document.getElementById("rancking").style.webkitFilter = "blur(0px)";
    }
    setIsActive(!isActive);
  };

  return (
    <div className="board-main">
      <div className="ranking" id="ranking">
        <div className="time-2">Your Time:{hour}:{minute}:{second}</div>
        {/* <span className="text-2">Your Time:</span>
        <span className="time-2">
          <span className="hour-2">{hour}</span>
          <span>:</span>
          <span className="minute-2">{minute}</span>
          <span>:</span>
          <span className="second-2">{second}</span>
        </span> */}
        <div className="rank-div">
          <Table striped hover  variant="gray">
            <thead>
              <tr>
                <th>Rate</th>
                <th>Name</th>
                <th colSpan="2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
            </tbody>
          </Table>
          <div className="rank-buttons">
            <Button variant="dark" onClick={ExitButton}>
              PLAY AGAIN
            </Button>
            <Link to="/">
              <Button variant="secondary" onClick={ExitButton}>EXIT</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="board-name">
        <h3 style={{ textAlign: "left", margin: "auto 0" }}>Matching Game</h3>
        <h4 style={{ textAlign: "left", margin: "auto 0" }}>{props.name}</h4>
        {/* <h3>timer:</h3> */}
        {/* <Timer counter={counter} setCounter={setCounter} /> */}
        {/* <Link to="/"> */}
        <div class="container">
          <span>Time:</span>
          <span class="time">
            <span class="hour">{hour}</span>
            <span>:</span>
            <span class="minute">{minute}</span>
            <span>:</span>
            <span class="second">{second}</span>
          </span>
        </div>
        <Button variant="secondary" onClick={ExitButton}>
          Exit
        </Button>
        {/* </Link> */}
      </div>
      <hr />
      <div className="Board">
        {cards.map((card) => (
          <Card {...card} onClick={onCardClick(card)} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
