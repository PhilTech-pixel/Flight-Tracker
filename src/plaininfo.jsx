import React from "react";
import { useState } from "react";

const PlainInfo = ({ info }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="info">
      <h2 onClick={handleClick} className="info-title">
        {info.title}
      </h2>
      {show && <p className="info-text">{info.text}</p>}
    </div>
  );
}
export default PlainInfo;