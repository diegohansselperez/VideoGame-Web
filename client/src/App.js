// import { useEffect, useState } from "react";
// import axios from "axios";

import Landing from "./components/Landing/Landing.jsx";
import Detail from "./components/Detail/Detail.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Create from "./components/Create/Create.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}

export default App;
