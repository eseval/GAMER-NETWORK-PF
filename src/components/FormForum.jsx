import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { postForum } from "../redux/actions/index.js"


export default function FormForum({nickname}){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        nickname: nickname,
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
        dispatch (postForum(input))
        setInput({
            nickname: nickname,
            title: "",
            text: "",
        })
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