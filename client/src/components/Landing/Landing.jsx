import React from "react";
import style from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className={style.backgraundLanding}>
      <section className={style.containBtn}>
        <h3>
          Welcome to <span className={style.henry}>HenryGames</span>{" "}
        </h3>
        <button onClick={handleClick}>Start</button>
        <article className={style.article}>
          {" "}
          <p>
            Hecho por{" "}
            <a  href="https://www.linkedin.com/in/hansselperez/" target="_blank" rel="noreferrer">
              Diego Hanssel Perez
            </a>{" "}
            ,gracias a <span>SoyHenry</span>.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Landing;
