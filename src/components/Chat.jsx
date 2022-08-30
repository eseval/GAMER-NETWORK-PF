import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../index";

export default function Chat(){

const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);
const navigate=useNavigate()
useEffect(() => {
  if (!dataUser || dataUser === "") {
    navigate("/");
  }
}, [dataUser, navigate]);


    const [messege, setMessege]=useState("")
const [messeges, setMesseges]=useState([])

useEffect(()=>{
    const reciveMessege= messege=>{
        setMesseges([...messeges,messege])
    }
    
    socket.on("messegeFromBack",reciveMessege)
    return()=>socket.off("messegeFromBack",reciveMessege)
},[messeges])
console.log(messeges)

function handleOnSubmit(e){
    e.preventDefault()
    if(messege!==""|| messege!==" "){
    setMessege(e.target.value)
    setMesseges([...messeges,{user:"Me",body:messege}])
    // console.log(messege)
    socket.emit("messege",{body:messege,user:dataUser.nickname})
    document.getElementById("myForm").reset()    
}else{
}

}

    return (
        <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
            <form id="myForm" onSubmit={e=>handleOnSubmit(e)} className="bg-zinc-900 p-10 rounded-xl mr-4">
            <h1 className="text-2xl font-bold my-2">Comunicate con el usuario</h1>
            <input type="text" placeholder="Escribe aqui" onChange={e=>setMessege(e.target.value)} className="border-2 border-zinc-500 p-2 w-full text-black rounded-xl" autoFocus/>
            <button type="submit" className="border-2 border-zinc-500 p-2 text-black bg-sky-700 ml-auto rounded-xl mt-6">Send</button>
            </form>
            <ul className="h-80 overflow-y-auto ">
            <p className="border-2 border-zinc-500 p-2 w-full rounded-xl">mensajes: </p>
                {messeges?.map((e,index)=>(
                    <li
                    key={index}
                    className={`my-2 p-2 table text-sm rounded-md ${
                      e.user === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
                    }`}>
                        <p><b>{e.user} :</b> {e.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}