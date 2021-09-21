import React from "react";
const Card = (props) => {
  const { frontImg, backImg, flipped, onClick } = props;
  let img = flipped ? frontImg : backImg;
  if (props.done) {
    img = frontImg;
  } else {
    img = flipped ? frontImg : backImg;
  }
  return (
    <div className="Card" onClick={onClick}>
      <img id="img-card" src={img} alt="" />
    </div>
  );
};

export default Card;
