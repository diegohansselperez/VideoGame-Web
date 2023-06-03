import React from 'react'

const Paginate = ({prePage, numbers, nextPage, changeToPage}) => {
  return (
    <nav>
    <ul>
      <li>
        <button type="button" onClick={prePage}>
          Prev
        </button>
      </li>
      {numbers.map((n, i) => (
        <li key={i}>
          <span onClick={() => changeToPage(n)}>{n}</span>
        </li>
      ))}
      <li>
        <button type="button" onClick={nextPage}>
          Next
        </button>
      </li>
    </ul>
  </nav>
  )
}

export default Paginate