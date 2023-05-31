import "./CardStyle.css";
import { Link } from "react-router-dom";
import { Pinwheel } from "@uiball/loaders";
import { useEffect, useState } from "react";

const Card = (props) => {
  const [isTrue, setIsTrue] = useState(false);
  const { id, name, image, plataforms, genero } = props;

  useEffect(() => {
    setTimeout(() => {
      setIsTrue(true);
    }, 1000);
  }, []);

  return (
    <>
      {isTrue ? (
        <div className="container" key={id}>
          <main className="wrapper">
            <img
              className="banner-image"
              width="200px"
              height="170px"
              src={image}
              alt={name}
            />
            <div>
              <h1>{name ? name.substring(0, 32) : ""}</h1>
            </div>

            <div className="containArrays">
              <div>
                {Array.isArray(plataforms) ? (
                  plataforms
                    ?.map((elem) => {
                      return <p key={elem}>{elem}</p>;
                    })
                    .slice(0, 4)
                ) : (
                  <p>{plataforms}</p>
                )}
              </div>
              <div>
                {Array.isArray(genero) ? (
                  genero?.map((genre) => {
                    return <h4 key={genre}>{genre}</h4>;
                  })
                ) : (
                  <h4>{genero}</h4>
                )}
              </div>
            </div>
          </main>
          <footer className="button-wrapper">
            <Link to={`/detail/${id}`} >
              <button className="btn-outline">DETAIL</button>
            </Link>

            <button className="btn-fill">DELETE</button>
          </footer>
        </div>
      ) : (
        <div className="loaderContain">
          <Pinwheel size={35} lineWeight={3.5} speed={1} color="white" />
        </div>
      )}
    </>
  );
};

export default Card;
