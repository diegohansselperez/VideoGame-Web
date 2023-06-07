import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
import Loading from "../Loading/Loading";

const Detail = () => {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  const getDetail = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      console.log(data);
      if (data.nombre) {
        setDetail(data);
      } else {
        window.alert("No se encontro el ID");
      }
    } catch (error) {
      console.log("Error detail axios: " + error.message);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  return (
    <div className={style.containerDetail}>
      <div className={style.detailTitle}>
        <h2>DETAIL VIDEOGAME</h2>{" "}
      </div>
      <div className={style.containLink}>
        {" "}
        <Link to={"/home"}>
          <button className={style.btnLink}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            To Home
          </button>
        </Link>
      </div>

      {detail.id ? (
        <div className={style.cardDetail}>
          <h2 className={style.h2}>{detail.nombre}</h2>
          <div className={style.imgDiv}>
            {" "}
            <img src={detail.imagen} alt={detail.nombre} />
          </div>

          <div className={style.containText}>
            
            <section>
              <div className={style.descripcionStyle}>
                <h3>Description:</h3>
                {
                  <h5>
                    {detail.descripcion.replace(/<[^>]*>/g, "")
                      .split(".")
                      .slice(0, 5)
                      .join(".") + "."}
                  </h5>
                }
              </div>
            </section>

            <section className={style.sectionP3}>
              <div className={style.fechaLanzaStyle}>
                <h3>Release date: </h3>
                <h3>{detail.fecha_de_lanzamiento}</h3>
              </div>

              <div className={style.generoStyle}>
                <h3 >Rating: </h3>
                <h5>{detail.rating}</h5>
              </div>

              <div className={style.generoStyle}>
                <h3>Genre: </h3>
                <div>
                  {Array.isArray(detail.genero) ? (
                    detail.genero?.map((genr) => (
                      <h5 key={genr.id}>{genr.name}</h5>
                    ))
                  ) : (
                    <h5>{detail.genero}</h5>
                  )}
                </div>
              </div>

              <div className={style.platStyle}>
                <h3>Platforms: </h3>
                <div>
                  {" "}
                  {Array.isArray(detail.plataformas) ? (
                    detail.plataformas?.map((plataforma, index) => {
                      return <h5 key={index}>{plataforma}</h5>;
                    })
                  ) : (
                    <h5>{detail.plataformas}</h5>
                  )}
                </div>
              </div>
            </section>


          </div>
        </div>
      ) : (
        <div className={style.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Detail;
