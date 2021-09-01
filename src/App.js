import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InputName from "./components/InputName";
import Board from "./components/Board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import backImg from "./assets/images/back.png";
// import angular from "./assets/images/angular.png";
// import css from "./assets/images/css.png";
// import go from "./assets/images/go.png";
// import html from "./assets/images/html.png";
// import rail from "./assets/images/rail.png";
// import react from "./assets/images/react.png";
// import scala from "./assets/images/scala.png";
// import vue from "./assets/images/vue.png";
// import java from "./assets/images/java.png";
// import node from "./assets/images/node.png";

// const api = axios.create({
//   baseURL: `https://sahabino-front.herokuapp.com/placeholder`,
// });

// const api2 = axios.create({
//   baseURL: `http://localhost:8000`,
// });

// async function buildCards() {
//   // let id = 0;
//   let size = 10;
//   // const images = {
//   //   angular,
//   //   css,
//   //   go,
//   //   html,
//   //   rail,
//   //   react,
//   //   scala,
//   //   vue,
//   //   java,
//   //   node,
//   // };
//   // const cards1 = Object.keys(images).reduce((result, item) => {
//   //   const getCard = () => ({
//   //     id: id++,
//   //     type: item,
//   //     done: false,
//   //     backImg: backImg,
//   //     frontImg: "https://sahabino-front.herokuapp.com/icons/armchair.png",
//   //     flipped: false,
//   //   });

//   //   return [...result, getCard(), getCard()];
//   // }, []);
//   // console.log("cards1");
//   // console.log(typeof cards1);
//   // console.log(cards1);
//   // return cards1;
//   // let cards;
//   // await axios.get(`https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${size}`, {
//   //     headers: { "Access-Control-Allow-Origin": "*" },
//   //     responseType: "json",
//   //   })
//   //   .then((res) => {
//   //     // console.log("api sahab:");
//   //     // console.log(typeof res.data);
//   //     // console.log(res.data);
//   //     let id2 = 0;
//   //     const cards = res.data.reduce((result, item) => {
//   //       const getCard = () => ({
//   //         id: id2++,
//   //         type: item.name.slice(0, item.name.indexOf(".")),
//   //         done: false,
//   //         backImg: backImg,
//   //         frontImg: item.imageUrl,
//   //         flipped: false,
//   //       });
//   //       return [...result, getCard(), getCard()];
//   //     }, []);
//   //     // console.log("cards");
//   //     console.log("inner:");
//   //     console.log(cards);
//   //     return suffle(cards);
//   //     // if (cards !== undefined) {
//   //     //   return suffle(cards);
//   //     // } else {
//   //     //   return buildCards();
//   //     // }
//   //   });
//   // console.log("2:");
//   // console.log(cards);
//   // return suffle(cards);
//   const res = await axios.get(
//     `https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${size}`
//   );
//   console.log("inner:");
//   console.log(res.data);
//   return res.data;
// }
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
  const LOCAL_STORAGE_KEY = "name";
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${10}`,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          responseType: "json",
        }
      )
      .then((res) => {
        setImageData(res.data)
      });
  }, []);
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
    return [...result, getCard(), getCard()];
  }, []);

  const cards = suffle(cardsT);

  const nameHandler = (newName) => {
    setName(newName);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setName(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(name));
  }, [name]);
  return (
    <div className="App" id="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <InputName nameHandler={nameHandler} />}
          />
          <Route
            path="/board"
            component={() => <Board name={name} cards={cards} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
