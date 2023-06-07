import "./Card.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const Card = (props) => {
  const [isTrue, setIsTrue] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const { id, name, image, plataforms, genero, rating, handleDelete } = props;

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
          <img
            className="bannerImage"
            src={image}
            alt={name}
          />
          <div>
            <h1 style={name.length > 22 ? { fontSize: "2rem" } : null}>
              {name ? name.substring(0, 32) : ""}
            </h1>
          </div>
          <main className="wrapper">
            <div className="containArrays">
              <div style={{color:"white"}}>
                {rating}
              </div>
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
                  genero?.map((genre, index) => {
                    return <h4 key={index}>{genre}</h4>;
                  })
                ) : (
                  <h4>{genero}</h4>
                )}
              </div>
            </div>
          </main>{" "}
          {isClick ? (
            <div className="cuestionDelete">
              <p>Are you sure you want to delete this video game?</p>
              <div className="containBtns">
                <button
                  className="btnYes"
                  type="button"
                  onClick={() => handleDelete(id)}
                >
                  Yes
                </button>
                <button
                  className="btnNo"
                  type="button"
                  onClick={() => setIsClick(false)}
                >
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
