import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import Card from "./Card";
import { Link } from "react-router-dom";

const Board = (props) => {
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
  const [time, setTime] = useState("00:00:00");
  const [isActive, setIsActive] = useState(true);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

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
      if (ref2.current.style.display === "block") {
        ref2.current.style.display = "none";
        props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
      } else {
        ref2.current.style.display = "block";
        props.refApp.current.style.backgroundColor = "gray";
      }
      setIsActive(false);
    }
  }, [endGame, props.refApp]);

  function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (let i = 0; i < x.length; i++) {
      if (x[i].flipped !== y[i].flipped) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  useEffect(() => {
    const newCards = cards.map((card) => ({
      ...card,
      flipped:
        checkers.find((c) => c.id === card.id) || completed.includes(card.type),
    }));
    if (!objectsAreSame(cards, newCards)) {
      setCards(newCards);
    }
    // setCards(cards => ({
    //   cards: cards.map(
    //     el => checkers.find((c) => c.id === el.id) || completed.includes(el.type)? { ...el, flipped: true }: el
    //   )
    // }))
    // setCards(cards=> ({

    //   cards: cards.map(
    //     el => checkers.find((c) => c.id === el.id) || completed.includes(el.type)? { ...el, flipped: true }: el
    //   )

    // }))
    // if(cards !== newCards) {
    //   setCards(newCards);
    // }
    // setCards(cards.forEach(function (item) {
    //   item.flipped = checkers.find((c) => c.id === item.id) || completed.includes(item.type)
    // }))
    // cards.forEach(function (item) {
    //   item.flipped = checkers.find((c) => c.id === item.id) || completed.includes(item.type)
    // })
    // for(let item of cards) {
    //   item = {
    //     ...item,
    //     flipped: checkers.find((c) => c.id === item.id) || completed.includes(item.type),
    //   }
    //   // if(checkers.find((c) => c.id === item.id) || completed.includes(item.type)) {
    //   //   item.flipped = true
    //   // } else {
    //   //   item.flipped = false
    //   // }
    // }
  }, [checkers, completed, cards]);

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
    if (ref1.current.style.display === "block") {
      ref1.current.style.display = "none";
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    } else {
      ref1.current.style.display = "block";
      props.refApp.current.style.backgroundColor = "gray";
    }
    setIsActive(!isActive);
  };

  const ExitButtonAll = () => {
    if (ref1.current.style.display === "block") {
      ref1.current.style.display = "none";
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    } else {
      ref1.current.style.display = "block";
      props.refApp.current.style.backgroundColor = "gray";
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
        time: time,
        end: endGame,
        similar: props.similar,
        size: props.size,
      },
    ]);
  };

  const PlayAgain = () => {
    if (ref2.current.style.display === "block") {
      ref2.current.style.display = "none";
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    } else {
      ref2.current.style.display = "block";
      props.refApp.current.style.backgroundColor = "gray";
    }
    setIsActive(!isActive);
  };

  const ExitButtonAll2 = () => {
    if (ref2.current.style.display === "block") {
      ref2.current.style.display = "none";
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    } else {
      ref2.current.style.display = "block";
      props.refApp.current.style.backgroundColor = "gray";
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
          time: time,
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

  const timeHandler = (timeInput) => {
    setTime(timeInput);
  };
  return (
    <div className="board-main">
      <div className="ranking" id="ranking" ref={ref1}>
        <div className="time-2">Your Time: {time}</div>
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
      <div className="ranking-2" id="ranking-2" ref={ref2}>
        <div className="time-2">Your Time: {time}</div>
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
        <Timer
          players={props.players}
          name={props.name}
          isActive={isActive}
          timeHandler={timeHandler}
        />
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
