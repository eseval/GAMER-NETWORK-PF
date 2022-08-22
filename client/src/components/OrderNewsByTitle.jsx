import React from "react";
import { useDispatch } from "react-redux";
import { orderNewsByTitle } from "../redux/actions";

export default function OrderNewsByTitle() {
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    dispatch(orderNewsByTitle(e.target.value));
  }

  return (
      <div>
        <div>Alphabetical Order</div>
        <select onChange={ (e) => handleOnChange(e) }>
          {/*<option value="All">Default</option>*/}
          <option value="Asc">Ascending</option>
          <option value="Desc">Descending</option>
        </select>
      </div>
  );
}