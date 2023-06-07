import React from "react";
import style from "./Paginate.module.css";

const Paginate = ({
  currentPage,
  prePage,
  numbers,
  nextPage,
  changeToPage,
}) => {
  return (
    <nav className={style.navPaginate}>
      <section className={style.ul}>
        <li>
          <button className={style.button}  type="button" onClick={prePage}>
            Prev
          </button>
        </li>
        {numbers.map((n, i) => (
          <li
            className={style.liNum}
            style={currentPage === n ? { background: "#424242" } : null}
            key={i}
          >
            <span className={style.span} onClick={() => changeToPage(n)}>
              {n}
            </span>
          </li>
        ))}
        <li>
          <button className={style.button} type="button" onClick={nextPage}>
            Next
          </button>
        </li>
      </section>
    </nav>
  );
};

export default Paginate;
