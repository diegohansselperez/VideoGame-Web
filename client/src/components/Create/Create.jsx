import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres , getAllPlataforms } from "../../redux/actions/actions";



const Create = () => {
  const dispacth = useDispatch();
  const {allGenres, allPlataforms} = useSelector((state) => state);

  //aqui voy a despachar la accion que me va a trear los generos del estado global
  //ma traigo el estado AllGenres y AllPlataforms
  useEffect(() => {
    dispacth(getAllGenres());
    dispacth(getAllPlataforms())
  }, [dispacth]);

  return (
    <div>
      <h2>Create you videogame</h2>
      <Form allGenres={allGenres} allPlataforms={allPlataforms}/>
    </div>
  );
};

export default Create;
