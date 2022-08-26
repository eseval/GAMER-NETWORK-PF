import { useDispatch } from "react-redux";
import React, { useState , useEffect } from 'react';
import { postForum, getAllPosts,editPost } from "../redux/actions/index.js"
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FormForum(){
    const navigate= useNavigate()
    let id=""
    id=useParams()

    const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);

    const dispatch = useDispatch();

    useEffect(()=>{
      if(!dataUser || dataUser===""){
        navigate("/")
      }
    },[dataUser])
    
    const [input, setInput] = useState({
        nickname: dataUser.nickname,
        text: "",
        title: "",
    })

    function handleOnChange(e) {
        setInput({
            ...input,
            [e.target.name]:  e.target.value
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        if(!id.id){
        dispatch (postForum(input)) 
        }
        else{
        dispatch(editPost(id.id,input))
        console.log(id)
        }
        dispatch (getAllPosts())
        navigate("/forum")
    }

    return (
        <div>
            <form onSubmit={e => handleOnSubmit(e)}>
                <input placeholder='Title' type="text" name='title' value={input.title} onChange={e => handleOnChange(e)} />
                <br />
                <br />
                <input placeholder="Text" type="text" name='text' value={input.text} onChange={e => handleOnChange(e)}/>
                <br />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}
