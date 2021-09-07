import React, { useState, useEffect } from "react";
// import "./styles.css";

const Timer = (props) => {
  // const [second, setSecond] = useState("00");
  // const [minute, setMinute] = useState("00");
  // const [hour, setHour] = useState("00");
  // const [isActive, setIsActive] = useState(true);
  // const [counter, setCounter] = useState(0);
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

  useEffect(() => {
    let intervalId;

    if (props.isActive) {
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
  }, [props.isActive, counter]);

  useEffect(() => {
    props.timeHandler([hour, minute, second].join(":"))
  }, [props.isActive, hour, minute, second, props])

  // function stopTimer() {
  //   // setIsActive(false);
  //   setCounter(0);
  //   setSecond("00");
  //   setMinute("00");
  //   setHour("00");
  // }

  return (
    // <div class="container">
    //   <span>Time:</span>
    //   <span class="time">
    //     <span class="hour">{hour}</span>
    //     <span>:</span>
    //     <span class="minute">{minute}</span>
    //     <span>:</span>
    //     <span class="second">{second}</span>
    //   </span>
    // </div>
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
  );
};

export default Timer;
