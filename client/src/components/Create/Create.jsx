import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions/actions";



const Create = () => {
  const dispacth = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);

  //aqui voy a despachar la accion que me va a trear los generos del estado global
  //ma traigo el estado AllGenres
  useEffect(() => {
    dispacth(getAllGenres());
  }, [dispacth]);

  return (
    <div>
      <h2>Create you videogame</h2>
      <Form allGenres={allGenres}/>
    </div>
  );
};

export default Create;
