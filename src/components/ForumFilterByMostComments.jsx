import React from "react";
import { useDispatch } from "react-redux";
import { orderByComments } from "../redux/actions";

export default function ForumFilterByMostComments(){   
const dispatch=useDispatch()

function handleOnChange(e){
    e.preventDefault()
    dispatch(orderByComments(e.target.value))
    // setCurrentPage(1)
}



return(
    <select onChange={e=>handleOnChange(e)}>
        <option hidden>order by ammount of comments</option>
        <option value="most">Order by most comments</option>
        <option value="less">Order by less comments</option>
    </select>
)
}