import "./Card.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const Card = (props) => {
  const [isTrue, setIsTrue] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const { id, name, image, plataforms, genero, handleDelete } = props;

  useEffect(() => {
    setTimeout(() => {
      setIsTrue(true);
    }, 1000);
  }, []);

  const clickToDelete = () => {
    setIsClick(true);
  };

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
          </main>{" "}
          {isClick ? (
            <div className="cuestionDelete">
              <p>este es el boton click</p>
              <div>
                <button type="button" onClick={() => handleDelete(id)}>
                  Si
                </button>
                <button type="button" onClick={() => setIsClick(false)}>
                  No
                </button>
              </div>
            </div>
          ) : null}
          <footer className="button-wrapper">
            <Link to={`/detail/${id}`}>
              <button className="btn-outline">DETAIL</button>
            </Link>

            <button className="btn-fill" onClick={clickToDelete}>
              DELETE
            </button>
          </footer>
        </div>
      ) : (
        <div className="loaderContain">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Card;
