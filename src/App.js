import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InputName from "./components/InputName";
import Board from "./components/Board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import backImg from "./assets/images/back.png";
function suffle(arr) {
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
  const LOCAL_NAME_STORAGE_KEY = "name";
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState([]);
  const LOCAL_SIZE_STORAGE_KEY = "size";
  const [size, setSize] = useState(24);
  const LOCAL_SIMILAR_STORAGE_KEY = "similar";
  const [similar, setSimilar] = useState(2);
  useEffect(() => {
    axios
      .get(
        `https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${size/similar}`,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          responseType: "json",
        }
      )
      .then((res) => {
        setImageData(res.data);
      });
  }, [size, similar]);
  let id2 = 0;
  const cardsT = imageData.reduce((result, item) => {
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
    } else if(similar === 3) {
      return [...result, getCard(), getCard(), getCard()];
    } else if(similar === 4) {
      return [...result, getCard(), getCard(), getCard(), getCard()];
    }
  }, []);

  const cards = suffle(cardsT);

  const nameHandler = (newName) => {
    setName(newName);
  };

  const sizeHandler = (newSize) => {
    setSize(newSize);
  };

  const similarHandler = (newSimilar) => {
    setSimilar(newSimilar);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(
      localStorage.getItem(LOCAL_NAME_STORAGE_KEY)
    );
    if (retriveContacts) setName(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_NAME_STORAGE_KEY, JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    const retriveContacts = JSON.parse(
      localStorage.getItem(LOCAL_SIZE_STORAGE_KEY)
    );
    if (retriveContacts) setSize(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_SIZE_STORAGE_KEY, JSON.stringify(size));
  }, [size]);

  useEffect(() => {
    const retriveContacts = JSON.parse(
      localStorage.getItem(LOCAL_SIMILAR_STORAGE_KEY)
    );
    if (retriveContacts) setSimilar(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_SIMILAR_STORAGE_KEY, JSON.stringify(similar));
  }, [similar]);

  return (
    <div className="App" id="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <InputName
                nameHandler={nameHandler}
                sizeHandler={sizeHandler}
                similarHandler={similarHandler}
              />
            )}
          />
          <Route
            path="/board"
            component={() => (
              <Board name={name} cards={cards} size={size} similar={similar} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
