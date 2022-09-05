import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import socket from "../index";
import { getAllFriends, getAllChats, createChatWhitFriend, saveMessageInDb, getAllNonFriends, addFriendForChat } from "../redux/actions";
import Swal from 'sweetalert2';
import NavBar from "./NavBar";


export default function Chat() {
  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);

  const navigate = useNavigate()

  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser, navigate]);



  //codigo empieza aqui

  const dispatch = useDispatch()


  useEffect(() => {  // traigo todos los amigos con el array de IDs que se forma al agregar amigos
    dispatch(getAllFriends(dataUser.friends))
  }, [getAllFriends, dispatch])

  let friends = useSelector((state) => state.friends);


  useEffect(() => { //aqui traigo todos los chats del usuario que esta viendo el chat
    dispatch(getAllChats(dataUser.id))
  }, [getAllChats, dispatch])

  let chats = useSelector((state) => state.chats);




  let chatsIds = chats?.chats?.map(e => {//desde aqui empiezo para traer a los chats de las personas que no tengo como amigos
    return (
      e.id.split("_").filter(i => i != dataUser.id).toString()
    )
  })

  let nonFriendsIds = dataUser?.friends?.length == 0
    ? chatsIds
    : chatsIds?.filter(e => !dataUser?.friends?.includes(e)) // array de id con los que no tengo agregados como amigos


  useEffect(() => {  // traigo todos los no amigos con el array de IDs que obtengo arriba
    if (nonFriendsIds?.length > 0 && nonFriends?.length === 0) {
      dispatch(getAllNonFriends(nonFriendsIds))
    }
  }, [nonFriendsIds])


  let nonFriends = useSelector((state) => state.nonFriends);


  const setRef = useCallback(e => {// esto es para que siempre el ultimo mensaje es el que este en pantalla
    if (e) { e.scrollIntoView({ smooth: true }, []) }
  })

  const [room, setRoom] = useState("") //esta es para setear la sala de chat (el id se forma como : [userId 1, userId 2].sort().join("_"))

  const [tab, setTab] = useState(1) // este es para cambiar entre pestañas
  const [messege, setMessege] = useState("") // este es para los mensajes con socket io
  const [messeges, setMesseges] = useState([]) // este es para ponerle los mensajes junto con el id del usuario que envio
  const [chatsLogs, setchatsLogs] = useState([]) // este es para mostrar los mensajes desde la base de datos
  const [highlight, setHighlight] = useState("z") // este es para resaltar el chat que esta activo

  useEffect(() => {
    const reciveMessege = messege => {
      setMesseges([...messeges, messege])
    }
    socket.on("messegeFromBack", reciveMessege)
    return () => socket.off("messegeFromBack", reciveMessege)
  }, [messeges]) // este es para setear al recivir mensajes con socket io




  //esta funcion crea la sala de chat con el id de los dos usuarios (el usuario que esta haciendo la accion y el amigo con el que quiere hablar) en cuanto se clickee en el amigo y se acepte el cartel del sweetalert 2
  function handleChatCreate(c, e) { //el "e" viene del map donde llamo la funcion
    c.preventDefault()
    Swal.fire({
      title: 'Do you want to start a conversation whit this friend?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      toast: true,
      backdrop: `
    url("https://i.pinimg.com/originals/4a/53/1f/4a531fd488adb6609b5f0ecf2ffdc3cc.gif")
    top
    no-repeat
  `
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(createChatWhitFriend(dataUser.id, e.id))
        setTab(1)
      }
    })
  }


  //esta funcion crea la sala de chat con el id de los dos usuarios (el usuario que esta haciendo la accion y la persona que quiere comunicarse con el usuario) en cuanto se clickee en el 2º y se acepte el cartel del sweetalert 2
  function handleChatNonFriends(c, e) { //el "e" viene del map donde llamo la funcion
    c.preventDefault()

    Swal.fire({
      title: 'This person wants to chat whit you, do you want to chat whit him?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      toast: true,
      backdrop: `
    url("https://i.pinimg.com/originals/57/ab/41/57ab41f6fa5d4aa316bff5978270ee15.gif")
    no-repeat
  `
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addFriendForChat(dataUser.id, e))
        setTab(1)
      }
    })
  }


  // este handle trae con el "e"(del .map) el id del amigo en quien clickea
  //para armar el id de la sala que es el mismo id del chat en la base de datos
  //filtra todos los chats para que solo traiga el chat con id igual a la chatRoom 
  // y setea los "Logs" que serian los mensajes que se va a renderizar
  function handleChatShow(e) {
    let chatRoom = [dataUser.id, e].sort().join("_")
    let chatsToRender = chats?.chats?.filter(e => e.id === chatRoom)
    if (chatsToRender != chatsLogs) {
      setchatsLogs(chatsToRender)
    }
    dispatch(getAllChats(dataUser.id))
    if (chatRoom != room) { //esto para asegurar que no vuelva a hacer todo cada vez que clickee sobre un mismo chaat
      setMesseges([])
      setRoom(chatRoom)
      socket.disconnect() // cada vez que clickeo un chat desconecto el socket io
      socket.connect() // y lo vuelvo a conectar  
      socket.emit("room", { room: chatRoom }) // le mando al back la sala de chat para estar conectado en p2p con la otra persona
      setchatsLogs(chatsToRender)
      setHighlight(e)
    }


  }



  let buttonToEnable = document.getElementById("buttonSubmit") // me traigo el boton con el id "buttonSubmit" para  
  //desabilitarlo si es que messeges no tiene nada


  function handleOnChangeForm(e) {
    e.preventDefault()
    setMessege(e.target.value)
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    if (messege === "" || messege === undefined) {
    }
    else {
      dispatch(saveMessageInDb(dataUser.id, messege, room))
      setMessege(e.target.value)
      setMesseges([...messeges, { user: dataUser.nickname, body: messege, img: dataUser.img }])
      socket.emit("messege", { body: messege, user: dataUser.nickname, img: dataUser.img, room: room })
      document.getElementById("myForm").reset()
    }
  }

  function handleTabFriends(e) {
    e.preventDefault()
    setTab(2)
    setchatsLogs([])
    setMesseges([])
    setRoom("")
    setHighlight("Z")
  }// setear los mensajes en vacio para que no se muestren en la pestaña de friends
  //y setear tab en 2 para mostrar la pestaña de friends

  function handleTabPendingMesseges(e) {
    e.preventDefault()
    setTab(3)
    setchatsLogs([])
    setMesseges([])
    setRoom("")
    setHighlight("Z")

  }// setear los mensajes en vacio para que no se muestren en la pestaña de mensajes pendientes
  //y setear tab en 3 para mostrar la pestaña de mensajes pendientes

  function handleTabChats(e) {
    e.preventDefault()
    setTab(1)
    setchatsLogs([])
    setMesseges([])
    setHighlight("Z")

  }// setear los mensajes en vacio para que no se muestren mensajes de otros chats mientras cambiamos de chat
  //y setear tab en 1 para mostrar la pestaña de chats



  //acordarte de poner el idRoom=[userId1,userId2].sort().join(_) y el chatShow= true en la ruta

  return (
    <div class="container mx-auto shadow-lg rounded-lg h-screen	">
      <NavBar />
      <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div class="font-semibold text-2xl">what's happening good sr?</div>
        <div class="w-1/2">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search in your chats"
            class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
          />
        </div>
        <img src="https://i.imgur.com/9ESFHWn.png"
          class="h-20 w-20 bg-gray-500 rounded-full text-white font-semibold flex items-center justify-center"
        />
      </div>

      {/* aqui estan las pestañas de chats , friends y mensajes pendientes,
 cuando haces click el onclick setea el estado local "tab" en 1, 2 o 3 para ir cambiando */}

      <div class="flex flex-row justify-between bg-white">
        <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div class="flex flex-row overflow-x-auto items-center justify-center py-2 px-2 border-2 border-gray-200 rounded-2xl w-full">
            <button onClick={e => handleTabChats(e)} class={`rounded-2xl  w-full ${tab == 1 ? "bg-sky-700" : "bg-gray-100"}`}>
              <div class="border-b-2 py-4 px-2">
                Chats
              </div>
            </button>
            <button onClick={e => handleTabFriends(e)} class={`rounded-2xl w-full ${tab == 2 ? "bg-sky-700" : "bg-gray-100"}`}>
              <div class="border-b-2 py-4 px-2">
                Friends
              </div>
            </button>
            <button onClick={e => handleTabPendingMesseges(e)} class={`rounded-2xl w-full ${tab == 3 ? "bg-sky-700" : "bg-gray-100"}`}>
              <div class="border-b-2 py-4 px-2">
                pending messeges
              </div>
            </button>

          </div>


          {/* aqui los amigos con los que ya se tiene chat*/}

          {
            tab === 1
              ? <div>
                <div class="border-b-2 py-4 px-2">
                  <input
                    type="text"
                    placeholder="search chat"
                    class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                  />
                </div>
                {friends?.map((e, index) => {
                  let room = [dataUser.id, e.id].sort().join("_")
                  return ( //aqui mapeo los amigos y filtro los que ya tienen un chat iniciado conmigo
                    chats?.chats?.some(e => e.id === room) ?
                      <button key={index} onClick={b => handleChatShow(e.id)} class={highlight == e.id ? "flex py-4 px-2 justify-center items-center border-b-2 w-full bg-sky-700" : "flex py-4 px-2 justify-center items-center border-b-2 w-full"}>
                        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2 w-full">
                          <div class="w-1/4">
                            <img
                              src={e.img}
                              class="object-cover h-12 w-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div class="w-full">
                            <div class="text-lg font-semibold">{e.nickname}</div>
                          </div>
                        </div>
                      </button>
                      : "")
                })
                }
              </div>


              //aqui los amigos que tienes agregados, pero no tienes un chat iniciado
              : tab === 2 ? <div>
                <div>
                  <div class="border-b-2 py-4 px-2">
                    <input
                      type="text"
                      placeholder="search friend"
                      class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    />
                  </div>
                </div>
                {friends?.map((e, index) => {//aqui mapeo los amigos y filtro los que no tienen un chat iniciado conmigo
                  let room = [dataUser.id, e.id].sort().join("_")
                  return (
                    !chats?.chats?.some(e => e.id === room) ?
                      <button key={index} onClick={c => handleChatCreate(c, e)} class="flex py-4 px-2 justify-center items-center border-b-2 w-full">
                        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2 w-full">
                          <div class="w-1/4">
                            <img
                              src={e.img}
                              class="object-cover h-12 w-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div class="w-full">
                            <div class="text-lg font-semibold">{e.nickname}</div>
                          </div>
                        </div>
                      </button>
                      : "")
                })
                }
              </div>
                //aqui los chats de las personas que no tienes como amigo y no tienes un chat iniciado...
                : <div>
                  <div>
                    <div class="border-b-2 py-4 px-2">
                      <input
                        type="text"
                        placeholder="search friend"
                        class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                      />
                    </div>
                  </div>
                  {nonFriends.map((e, index) => {
                    let room = [dataUser.id, e.id].sort().join("_")
                    return (
                      <button key={index} onClick={c => handleChatNonFriends(c, e.id)} class="flex py-4 px-2 justify-center items-center border-b-2 w-full">
                        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2 w-full">
                          <div class="w-1/4">
                            <img
                              src={e.img}
                              class="object-cover h-12 w-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div class="w-full">
                            <div class="text-lg font-semibold">{e.nickname}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })
                  }
                </div>}
          {/* aqui poner los que quieren hablar pero no estan en tu lista de amigos osea los pendientes */}
        </div>
        {/* aqui termina */}


        <div class="w-full px-5 flex flex-col justify-between">


          <div class="flex flex-col mt-5 h-max">

            {/* aqui el map de messeges para los chats */}

            {chatsLogs?.map((e, index) => {
              return (
                e.messages?.map((b, index) => {
                  return (
                    <div key={index} class={dataUser.id === b[0].userId ? "flex justify-end mb-4" : "flex justify-start mb-4"}>
                      <div
                        class={dataUser.id === b[0].userId ? "mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white" : "ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"}
                      >
                        <p>{b[0].messages}</p>
                      </div>
                    </div>
                  )
                })
              )
            })}
            {
              messeges.map((e, index) => {
                const lastMessege = messeges.length - 1 === index
                return (
                  <div key={index} ref={lastMessege ? setRef : null} class={e.user === dataUser.nickname ? "flex justify-end mb-4" : "flex justify-start mb-4"}>
                    <div
                      class={e.user === dataUser.nickname ? "mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white" : "ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"}
                    >
                      {/* aqui el mensaje */}

                      <p>{e.body}</p>
                    </div>
                    <img
                      src={e.img}
                      class="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                )
              })
            }
            {chatsLogs.length === 0 && room == "" ?
              "" :
              <form id="myForm" onSubmit={e => handleOnSubmit(e)}>
                <input
                  onChange={e => handleOnChangeForm(e)}
                  class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                /><button id="buttonSubmit" type="submit" className={messege === "" || messege === undefined ? "border-2 border-zinc-500 p-2 text-black bg-gray-500 ml-auto rounded-xl mt-6" : "border-2 border-zinc-500 p-2 text-black bg-sky-700 ml-auto rounded-xl mt-6"}>Send</button>
              </form>}
          </div>
        </div>
      </div>
    </div>
  )
}