import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Timer from "./Timer";
import Card from "./Card";
import { Link } from "react-router-dom";
import $ from "jquery";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

const Board = (props) => {
  // const [cards, setCards] = useState(() => {
  //   for (const item of props.players) {
  //     if (item.name === props.name) {
  //       return item.cards;
  //     }
  //   }
  // });
  const [cards, setCards] = useState(props.cards);
  const [checkers, setCheckers] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [score, setScore] = useState(() => {
    for (const item of props.players) {
      if (item.name === props.name) {
        return item.score;
      }
    }
    return 0;
  });
  const [endGame, setEndGame] = useState(false);

  const [second, setSecond] = useState(() => {
    for (const item of props.players) {
      if (item.name === props.name) {
        return item.time.split(":")[2];
      }
    }
    return "00";
  });
  const [minute, setMinute] = useState(() => {
    for (const item of props.players) {
      if (item.name === props.name) {
        return item.time.split(":")[1];
      }
    }
    return "00";
  });
  const [hour, setHour] = useState(() => {
    for (const item of props.players) {
      if (item.name === props.name) {
        return item.time.split(":")[0];
      }
    }
    return "00";
  });
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(() => {
    for (const item of props.players) {
      if (item.name === props.name) {
        return (
          parseInt(item.time.split(":")[2]) +
          parseInt(item.time.split(":")[1]) * 60 +
          parseInt(item.time.split(":")[0]) * 3600
        );
      }
    }
    return 0;
  });

  const onCardClick = (card) => () => {
    document.querySelector(".Card").classList.toggle("is-flipped");
    if (
      checkersFull(checkers) ||
      cardAlreadyInCheckers(checkers, card) ||
      card.done
    )
      return;
    const newCheckers = [...checkers, card];
    setCheckers(newCheckers);
    const cardsInCheckersMatched = validateCheckers(newCheckers);
    if (cardsInCheckersMatched) {
      setCompleted([...completed, newCheckers[0].type]);
      setScore(score + props.similar);
      // setCards(cards.filtser(card => card.type !== newCheckers[0].type))
      card.done = true;
      cards.forEach(function (item) {
        if (item.type === newCheckers[0].type) {
          item.done = true;
        }
      });
      // console.log(completed.length);
      // console.log(props.size / props.similar);
      if (completed.length + 1 === props.size / props.similar) {
        setEndGame(true);
      }

      console.log("matched");
    }
    if (checkersFull(newCheckers)) {
      resetCheckersAfter(1000);
    }
    function validateCheckers(checkers) {
      if (props.similar === 2) {
        return checkers.length === 2 && checkers[0].type === checkers[1].type;
      } else if (props.similar === 3) {
        return (
          checkers.length === 3 &&
          checkers[0].type === checkers[1].type &&
          checkers[1].type === checkers[2].type
        );
      } else if (props.similar === 4) {
        return (
          checkers.length === 4 &&
          checkers[0].type === checkers[1].type &&
          checkers[1].type === checkers[2].type &&
          checkers[2].type === checkers[3].type
        );
      }
    }
    function cardAlreadyInCheckers(checkers, card) {
      if (checkers.length === 1) {
        return checkers[0].id === card.id;
      } else if (checkers.length === 2) {
        return checkers[0].id === card.id || checkers[1].id === card.id;
      } else if (checkers.length === 3) {
        return (
          checkers[0].id === card.id ||
          checkers[1].id === card.id ||
          checkers[2].id === card.id
        );
      }
    }
    function checkersFull(checkers) {
      return checkers.length === props.similar;
    }
    function resetCheckersAfter(time) {
      setTimeout(() => {
        if (cardsInCheckersMatched) {
          // console.log("empty");
          // card.done = true;
          // cards.forEach(function (item) {
          //   if (item.type === newCheckers[0].type) {
          //     item.done = true;
          //   }
          // });
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
  }, [isActive, counter, second, minute, hour]);

  function stopTimer() {
    setIsActive(false);
    // setCounter(0);
    // setSecond("00");
    // setMinute("00");
    // setHour("00");
  }

  function ResetTimer() {
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
  }

  useEffect(() => {
    if (endGame === true) {
      // props.setRankPlayers(
      //   [
      //     ...props.rankPlayers.filter((player) => player.name !== props.name),
      //     {
      //       id: Math.random() * 1000,
      //       name: props.name,
      //       cards: cards,
      //       score: score,
      //       time: [hour, minute, second].join(":"),
      //       end: endGame,
      //       similar: props.similar,
      //       size: props.size,
      //     },
      //   ].sort(compareTime)
      // );
      console.log(endGame);
      if (document.getElementById("ranking-2").style.display === "block") {
        document.getElementById("ranking-2").style.display = "none";
        $("#App").css("background-color", "rgb(242, 242, 242, 1)");
      } else {
        document.getElementById("ranking-2").style.display = "block";
        $("#App").css("background-color", "gray");
      }
      setIsActive(!isActive);
    }
  }, [endGame]);

  useEffect(() => {
    const newCards = cards.map((card) => ({
      ...card,
      flipped:
        checkers.find((c) => c.id === card.id) || completed.includes(card.type),
    }));
    setCards(newCards);
  }, [checkers, completed]);

  const toSecond = (timeStr) => {
    const nums = timeStr.split(":");
    return (
      parseInt(nums[0]) * 60 * 60 + parseInt(nums[1]) * 60 + parseInt(nums[2])
    );
  };

  const compareTime = (a, b) => {
    if (toSecond(a.time) < toSecond(b.time)) {
      return -1;
    }
    if (toSecond(a.time) > toSecond(b.time)) {
      return 1;
    }
    return 0;
  };

  const ExitButton = () => {
    // for (const item of props.rankPlayers) {
    //   var row = document.createElement("tr");
    //   var cell = document.createElement("td");
    //   cell.textContent = 1;
    //   row.appendChild(cell);
    //   var cell2 = document.createElement("td");
    //   cell.textContent = item.name;
    //   row.appendChild(cell2);
    //   var cell3 = document.createElement("td");
    //   cell.textContent = item.time;
    //   row.appendChild(cell3);
    //   document.getElementById("rank-table").appendChild(row);
    // }
    if (document.getElementById("ranking").style.display === "block") {
      document.getElementById("ranking").style.display = "none";
      $("#App").css("background-color", "rgb(242, 242, 242, 1)");
    } else {
      document.getElementById("ranking").style.display = "block";
      $("#App").css("background-color", "gray");
    }
    setIsActive(!isActive);
  };

  const ExitButtonAll = () => {
    if (document.getElementById("ranking").style.display === "block") {
      document.getElementById("ranking").style.display = "none";
      $("#App").css("background-color", "rgb(242, 242, 242, 1)");
    } else {
      document.getElementById("ranking").style.display = "block";
      $("#App").css("background-color", "gray");
    }
    setIsActive(!isActive);
    // let flag = false;
    // for (const item of props.players) {
    //   if (item.name === props.name) {
    //     flag = true
    //     item.cards = cards;
    //     item.score = score;
    //     item.time = [hour, minute, second].join(":");
    //     item.end = endGame;
    //   }
    // }
    props.setPlayers([
      ...props.players.filter((player) => player.name !== props.name),
      {
        id: Math.random() * 1000,
        name: props.name,
        cards: cards,
        score: score,
        time: [hour, minute, second].join(":"),
        end: endGame,
        similar: props.similar,
        size: props.size,
      },
    ]);
  };

  const PlayAgain = () => {
    if (document.getElementById("ranking-2").style.display === "block") {
      document.getElementById("ranking-2").style.display = "none";
      $("#App").css("background-color", "rgb(242, 242, 242, 1)");
    } else {
      document.getElementById("ranking-2").style.display = "block";
      $("#App").css("background-color", "gray");
    }
    setIsActive(!isActive);
  };

  const ExitButtonAll2 = () => {
    if (document.getElementById("ranking-2").style.display === "block") {
      document.getElementById("ranking-2").style.display = "none";
      $("#App").css("background-color", "rgb(242, 242, 242, 1)");
    } else {
      document.getElementById("ranking-2").style.display = "block";
      $("#App").css("background-color", "gray");
    }
    setIsActive(!isActive);
    props.setRankPlayers(
      [
        ...props.rankPlayers.filter((player) => player.name !== props.name),
        {
          id: Math.random() * 1000,
          name: props.name,
          cards: cards,
          score: score,
          time: [hour, minute, second].join(":"),
          end: endGame,
          similar: props.similar,
          size: props.size,
        },
      ].sort(compareTime)
    );
  };

  const renderTableData = () => {
    return props.rankPlayers.map((item, index) => {
      //  const { id, name, age, email } = student //destructuring
      return (
        <tr>
          <td className="highLight">{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.time}</td>
        </tr>
      );
    });
  };

  return (
    <div className="board-main">
      <div className="ranking" id="ranking">
        <div className="time-2">
          Your Time:{hour}:{minute}:{second}
        </div>
        <div className="rank-div">
          <Table striped hover variant="gray" id="rank-table">
            <thead>
              <tr>
                <th>Rate</th>
                <th>Name</th>
                <th colSpan="2">Time</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </Table>
          <div className="rank-buttons">
            <Button variant="dark" onClick={ExitButton}>
              CUNTINUE
            </Button>
            <Link to="/">
              <Button variant="secondary" onClick={ExitButtonAll}>
                EXIT
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="ranking-2" id="ranking-2">
        <div className="time-2">
          Your Time:{hour}:{minute}:{second}
        </div>
        <div className="rank-div">
          <Table striped hover variant="gray" id="rank-table">
            <thead>
              <tr>
                <th>Rate</th>
                <th>Name</th>
                <th colSpan="2">Time</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </Table>
          <div className="rank-buttons">
            <Button variant="dark" onClick={PlayAgain}>
              PLAY AGAIN
            </Button>
            <Link to="/">
              <Button variant="secondary" onClick={ExitButtonAll2}>
                EXIT
              </Button>
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
        <h5>Score: {score}</h5>
      </div>
      <hr />
      <div
        className={
          props.size === 24
            ? "Board-4-6"
            : props.size === 36
            ? "Board-6-6"
            : props.size === 48
            ? "Board-6-8"
            : ""
        }
      >
        {cards.map((card) => (
          <Card {...card} onClick={onCardClick(card)} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
