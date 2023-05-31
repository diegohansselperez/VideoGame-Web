import React from "react";

import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/home");
  };

  return (
    <div>
      <button onClick={handleClick}>Start</button>
    </div>
  );
};

export default Landing;
