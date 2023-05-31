import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pinwheel } from "@uiball/loaders";

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
    <div className="containerDetail">
      <h2>Detail Character</h2>
      {detail.id ? (
        <div className="cardDetail">
          <div>
            <h2>{detail.nombre}</h2>
            <h3>Descripcion: </h3>
            {
              <h5>
                {detail.descripcion
                  .replace(/<p>/g, "")
                  .replace(/<\/p>/g, "")
                  .split(".")
                  .slice(0, 3)
                  .join(".")}
              </h5>
            }
            <h3>Fecha de lanzamiento: </h3>
            <h3>{detail.fecha_de_lanzamiento}</h3>
            <h3>Genero: </h3>
            <div>
              {Array.isArray(detail.genero) ? (
                detail.genero?.map((genr) => <h3 key={genr.id} >{genr.name}</h3>)
              ) : (
                <h3 >{detail.genero}</h3>
              )}
            </div>
            <h3>Plataformas: </h3>

            {Array.isArray(detail.plataformas) ? (
              detail.plataformas?.map((plataforma, index) => {
                return <h3 key={index}>{plataforma}</h3>;
              })
            ) : (
              <h3>{detail.plataformas}</h3>
            )}
          </div>

          <img
            src={detail.imagen}
            width="300px"
            height="280px"
            alt={detail.nombre}
          />
        </div>
      ) : (
        <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />
      )}
    </div>
  );
};

export default Detail;
