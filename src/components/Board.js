import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Timer from "./Timer";
import Card from "./Card";
import { Link } from "react-router-dom";
import RankTable from "./RankTable";

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
  const [div1State, setDiv1State] = useState(false);
  const [div2State, setDiv2State] = useState(false);

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
      card.done = true;
      cards.forEach(function (item) {
        if (item.type === newCheckers[0].type) {
          item.done = true;
        }
      });
      if (cards.filter((e) => e.done === false).length === 0) {
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
        }
        setCheckers([]);
      }, time);
    }
  };

  useEffect(() => {
    if (endGame === true) {
      console.log(endGame);
      setDiv2State(true);
      props.refApp.current.style.backgroundColor = "gray";
      setIsActive(false);
    }
  }, [endGame, div2State, props]);

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

  const showRankDiv1 = () => {
    // if (ref1.current.style.display === "block") {
    //   ref1.current.style.display = "none";
    //   props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    // } else {
    //   ref1.current.style.display = "block";
    //   props.refApp.current.style.backgroundColor = "gray";
    // }
    if (!div1State) {
      setDiv1State(true);
      props.refApp.current.style.backgroundColor = "gray";
      // props.setDivApp(true);
    } else {
      setDiv1State(false);
      // props.setDivApp(false);
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    }
    setIsActive(!isActive);
  };

  const showRankDiv2 = () => {
    if (!div2State) {
      setDiv2State(true);
      props.refApp.current.style.backgroundColor = "gray";
      // props.setDivApp(true);
    } else {
      setDiv2State(false);
      // props.setDivApp(false);
      props.refApp.current.style.backgroundColor = `rgb(242, 242, 242, 1)`;
    }
    setIsActive(!isActive);
  };

  const ExitButtonAll = () => {
    showRankDiv1();
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

  const ExitButtonAll2 = () => {
    showRankDiv2();
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
  const timeHandler = (timeInput) => {
    setTime(timeInput);
  };
  return (
    <div className="board-main">
      <div
        className="ranking"
        id="ranking"
        style={{
          display: div1State === false ? "none" : "block",
        }}
      >
        <div className="time-2">Your Time: {time}</div>
        <div className="rank-div">
          <RankTable rankPlayers={props.rankPlayers} name={props.name} />
          <div className="rank-buttons">
            <Button variant="dark" onClick={showRankDiv1}>
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
      <div
        className="ranking-2"
        id="ranking-2"
        style={{
          display: div2State === false ? "none" : "block",
        }}
      >
        <div className="time-2">Your Time: {time}</div>
        <div className="rank-div">
          <RankTable rankPlayers={props.rankPlayers} name={props.name} />
          <div className="rank-buttons">
            <Button variant="dark" onClick={showRankDiv2}>
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
        <Timer
          players={props.players}
          name={props.name}
          isActive={isActive}
          timeHandler={timeHandler}
        />
        <Button variant="secondary" onClick={showRankDiv1}>
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
