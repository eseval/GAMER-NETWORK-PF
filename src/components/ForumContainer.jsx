import React from "react";

const ForumContainer = () => {
  const temas = [
    {
      title: "Nueva política de servicios publicitarios",
      autor: "Pato",
      img: "https://i.imgur.com/qkKy8.jpg",
    },
    {
      title: "Calendario de bandas predestinadas de la temporada 4",
      autor: "Fede",
    },
  ];

  return (
      <div>
        {/*<NavBar/>*/ }
        <div>
          { temas?.map((e) => {
            return (
                <div>
                  <div>
                    <a href="/detailForum">
                      <h3>{ e.title }</h3>
                    </a>
                  </div>
                  <h4>{ e.autor }</h4>
                </div>
                // <div>
                //   <Link to="/detailForum">
                //     <div>
                //       <h3>{ e.title }</h3>
                //       <h4>{ e.autor }</h4>
                //     </div>
                //   </Link>
                // </div>
            );
          }) }
        </div>
        <p>Componente Pato</p>
      </div>
  );
};

export default ForumContainer