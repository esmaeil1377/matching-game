import React from "react";
import "./App.css";
// import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import InputName from "./components/InputName";
import Board from "./components/Board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import backImg from "./assets/images/back.png";
import angular from './assets/images/angular.png'
import css from './assets/images/css.png'
import go from './assets/images/go.png'
import html from './assets/images/html.png'
import rail from './assets/images/rail.png'
import react from './assets/images/react.png'
import scala from './assets/images/scala.png'
import vue from './assets/images/vue.png'
import java from './assets/images/java.png'
import node from './assets/images/node.png'

const api = axios.create({
  baseURL: `https://sahabino-front.herokuapp.com/placeholder`,
});

const api2 = axios.create({
  baseURL: `http://localhost:8000`,
});

function buildCards() {
  let id = 0;
  let size = 20;
  // var imagesApi;

  api
    .get(`/get-by-size?size=${size}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data);
    });

  api2
    .get(`/blogs`, {
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data);
    });

  // let tt = fetch(
  //   `https://sahabino-front.herokuapp.com/placeholder/get-by-size?size=${size}`,
  //   {
  //     method: "get",
  //   }
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((jsonData) => {
  //     // console.log(jsonData);
  //     imagesApi = jsonData.results;
  //   });

  // console.log(imagesApi);
  // console.log(tt);
  // const images = {
  //   angular: "./assets/images/angular.png",
  //   css: "./assets/images/css.png",
  //   go: "./assets/images/go.png",
  //   html: "./assets/images/html.png",
  //   rail: "./assets/images/rail.png",
  //   react: "./assets/images/react.png",
  //   scala: "./assets/images/scala.png",
  //   vue: "./assets/images/vue.png",
  // };
  const images = {angular, css, go, html, rail, react, scala, vue, java, node}
  const cards = Object.keys(images).reduce((result, item) => {
    const getCard = () => ({
      id: id++,
      type: item,
      done: false,
      backImg: backImg,
      frontImg: images[item],
      flipped: false,
    });
    return [...result, getCard(), getCard()];
  }, []);
  // console.log(cards);
  return suffle(cards);
}

function suffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let randomIdx = Math.floor(Math.random() * len);
    console.log("randomidx");
    console.log(randomIdx);
    let copyCurrent = { ...arr[i] };
    console.log("copyCurrent");
    console.log(arr[i]);
    let copyRandom = { ...arr[randomIdx] };
    arr[i] = copyRandom;
    arr[randomIdx] = copyCurrent;
  }
  return arr;
}

function App() {
  const LOCAL_STORAGE_KEY = "name";
  const [name, setName] = useState("");
  const cards = buildCards();
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
