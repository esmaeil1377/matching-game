import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InputName from "./components/InputName";
import Board from "./components/Board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import backImg from "./assets/images/back.png";
import RankTable from "./components/RankTable";
function shuffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let randomIdx = Math.floor(Math.random() * len);
    let copyCurrent = { ...arr[i] };
    let copyRandom = { ...arr[randomIdx] };
    arr[i] = copyRandom;
    arr[randomIdx] = copyCurrent;
  }
  return arr;
}

function App() {
  const LOCAL_PLAYERS_STORAGE_KEY = "players";
  const [players, setPlayers] = useState([]);
  const LOCAL_RANK_PLAYERS_STORAGE_KEY = "rankPlayers";
  const [rankPlayers, setRankPlayers] = useState([]);
  const LOCAL_NAME_STORAGE_KEY = "name";
  const [name, setName] = useState("");
  const LOCAL_SIZE_STORAGE_KEY = "size";
  const [size, setSize] = useState(24);
  const LOCAL_SIMILAR_STORAGE_KEY = "similar";
  const [similar, setSimilar] = useState(2);
  const [cards, setCards] = useState([]);
  const [changePlayer, setChangePlayer] = useState(false);
  const refApp = useRef(null);
  // const [divApp, setDivApp] = useState(false);
  // const [div1State, setDiv1State] = useState(false);
  // const [div2State, setDiv2State] = useState(false);
  useEffect(() => {
    if (changePlayer) {
      axios
        .get(
          `https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${
            size / similar
          }`,
          {
            headers: { "Access-Control-Allow-Origin": "*" },
            responseType: "json",
          }
        )
        .then((res) => {
          let id2 = 0;
          const cardsT = res.data.reduce((result, item) => {
            const getCard = () => ({
              id: id2++,
              type: item.name.slice(0, item.name.indexOf(".")),
              done: false,
              backImg: backImg,
              frontImg: item.imageUrl,
              flipped: false,
            });
            if (similar === 2) {
              return [...result, getCard(), getCard()];
            } else if (similar === 3) {
              return [...result, getCard(), getCard(), getCard()];
            } else if (similar === 4) {
              return [...result, getCard(), getCard(), getCard(), getCard()];
            } else {
              return null;
            }
          }, []);
          console.log("new card");
          setCards(shuffle(cardsT));
        });
    }
  }, [size, similar, name, changePlayer]);

  // const divAppHandler = (newBool) => {
  //   setDivApp(newBool);
  // };

  const nameHandler = (newName, newSize, newSimilar) => {
    setName(newName);
    setChangePlayer(false);
    let flag = true;
    for (const item of players) {
      if (item.name === newName) {
        console.log(newName + " same");
        console.log(item.cards);
        setCards(item.cards);
        setSimilar(item.similar);
        setSize(item.size);
        flag = false;
      }
    }
    if (flag) {
      setSimilar(newSimilar);
      setSize(newSize);
      setChangePlayer(true);
    }
  };

  const sizeHandler = (newSize) => {
    if (changePlayer) {
      setSize(newSize);
    }
  };

  const similarHandler = (newSimilar) => {
    if (changePlayer) {
      setSimilar(newSimilar);
    }
  };

  useEffect(() => {
    const retriveName = JSON.parse(
      localStorage.getItem(LOCAL_NAME_STORAGE_KEY)
    );
    if (retriveName) setName(retriveName);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_NAME_STORAGE_KEY, JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    const retriveSize = JSON.parse(
      localStorage.getItem(LOCAL_SIZE_STORAGE_KEY)
    );
    if (retriveSize) setSize(retriveSize);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_SIZE_STORAGE_KEY, JSON.stringify(size));
  }, [size]);

  useEffect(() => {
    const retriveSimilar = JSON.parse(
      localStorage.getItem(LOCAL_SIMILAR_STORAGE_KEY)
    );
    if (retriveSimilar) setSimilar(retriveSimilar);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_SIMILAR_STORAGE_KEY, JSON.stringify(similar));
  }, [similar]);

  useEffect(() => {
    const retrivePlayers = JSON.parse(
      localStorage.getItem(LOCAL_PLAYERS_STORAGE_KEY)
    );
    if (retrivePlayers) setPlayers(retrivePlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_PLAYERS_STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    const retriveRankPlayers = JSON.parse(
      localStorage.getItem(LOCAL_RANK_PLAYERS_STORAGE_KEY)
    );
    if (retriveRankPlayers) setPlayers(retriveRankPlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_RANK_PLAYERS_STORAGE_KEY,
      JSON.stringify(rankPlayers)
    );
  }, [rankPlayers]);

  return (
    <div
      className="App"
      id="App"
      ref={refApp}
      // style={{
      //   backgroundColor: divApp === false ? `rgb(242, 242, 242, 1)` : "gray",
      // }}
    >
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <div>
                <InputName
                  nameHandler={nameHandler}
                  sizeHandler={sizeHandler}
                  similarHandler={similarHandler}
                />
                <div className="table-main-main">
                  <RankTable rankPlayers={rankPlayers} name={name} />
                </div>
              </div>
            )}
          />
          <Route
            path="/board"
            component={() => (
              <Board
                players={players}
                name={name}
                cards={cards}
                size={size}
                similar={similar}
                setPlayers={setPlayers}
                rankPlayers={rankPlayers}
                setRankPlayers={setRankPlayers}
                refApp={refApp}
                // setDivApp={setDivApp}
                // divApp={divApp}
                // div1State={div1State}
                // setDiv1State={setDiv1State}
                // div2State={div2State}
                // setDiv2State={setDiv2State}
                // divAppHandler={divAppHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
