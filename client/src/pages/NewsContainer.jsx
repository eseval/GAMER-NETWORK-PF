import NewsCard from "../components/NewsCard"

export default function NewsContainer() {
  // ESTA RUTA VA A CONTENER TODAS LAS NOTICIAS CON FILTRADO Y LAS VA A PASAR A NEWS CARD
  // NO TE OLVIDES DEL FILTRADO!!

  let noticias = [
    {
      id: 1,
      title: 'Microsoft acusa a Sony de sabotear el crecimiento de Game Pass',
      description: 'Respondiendo a la acusación de Sony, Microsoft dijo que la empresa está inhibiendo el crecimiento de Xbox Game Pass.',
      content: `Hace unos días publicamos las declaraciones de Sony respecto de la propuesta de Microsoft para quedarse con Activision Blizzard por casi 69.000 millones de dólares.
        Hablando con el organismo regulador de Brasil, Sony argumentó que la franquicia Call of Duty es demasiado importante para la industria y afectaría la decisión del público al momento de elegir una consola. Pero Microsoft salió a contraatacar esta semana y acusó a la casa de PlayStation de bloquear la llegada de juegos al servicio de suscripción Xbox Game Pass a través del pago a desarrolladores. Microsoft da a entender entonces que resulta hipócrita que una empresa que ha basado gran parte de su negocio en la obtención de exclusividades ahora se queje de lo mismo. “Teniendo en cuenta que las estrategias de exclusividad han estado en el centro de la estrategia de Sony para fortalecer su presencia en la industria de los juegos, y que Sony es líder en la distribución de juegos digitales, la preocupación de Sony con la posible exclusividad del contenido de Activision es incoherente, por lo menos”, dijo la empresa. “Solo revela, una vez más, un temor sobre un modelo de negocio innovador que ofrece contenido de alta calidad a bajo costo para los jugadores, amenazando un liderazgo que se ha forjado a partir de una estrategia centrada en el dispositivo y la exclusividad a lo largo de los años”. Microsoft alega que su capacidad para continuar expandiendo Xbox Game Pass se ha visto “inhibida” por las acciones de Sony, que habría pagado “tasas de bloqueo” para prevenir que los desarrolladores agreguen contenido a Game Pass y otros servicios de suscripción. La empresa dice que la competencia “no quiere que servicios de suscripción amenacen su dominio en el mercado de distribución digital”.`,
      img: 'https://media.malditosnerds.com/p/55c15e01760523f5dacfb142e14abbba/adjuntos/290/imagenes/000/112/0000112702/1200x0/smart/2021571104476_1jpg-copyjpg.jpg'
    },
    {
      id: 2,
      title: 'Sony podría requerir una cuenta de PlayStation Network en PC',
      description: 'Los usuarios de PC podrían crear una cuenta de PlayStation Network para usar los juegos de PlayStation en PC.',
      content: `Aunque Sony comenzó a llevar sus juegos a PC, por el momento ha mantenido la integración con PlayStation Network alejada de la plataforma.
        Si bien suena un tanto raro a priori, vale recordar que en ciertos casos, como Forza Horizon 5, Sea of Thieves o Halo: The Master Chief Collection requieren una cuenta de Xbox Live para aprovechar algunas de las funciones online, además de compartir logros y el progreso. Y es posible que Sony siga por ese camino, de acuerdo a lo que deja entender una de las entradas de las Preguntas Frecuentes en la página de PlayStation para PC. Una de las preguntas refiere a la necesidad de una cuenta de PlayStation Network para jugar juegos en PC, que la página responde con un “por el momento”. “No, por el momento no es necesaria una cuenta de PSN para disfrutar de los juegos de PlayStation Studios en la PC”, dice el sitio. Otra de las consultas menciona la transferencia de las partidas salvadas de PlayStation 4 o PlayStation 5 a PC, a lo que la empresa responde con la misma estructura: “por el momento no es posible”. Dado que los juegos incluyen soporte para trofeos en las tiendas de Epic Games y Steam, Sony aclara que no se van a sincronizar con los de la cuenta de PlayStation, pero sería natural que si en algún momento la vinculación es posible, también se sincronicen los trofeos. A diferencia de Microsoft, Sony no tiene grandes títulos multijugador para justificar la creación de una cuenta el soporte para cross-play, pero todo podría cambiar cuando salga el modo multijugador de The Last of Us 2 o algunos de los muchos proyectos que la empresa tiene en desarrollo.`,
      img: 'https://media.malditosnerds.com/p/f99cb0ca34eec4b186ee027c7d269c11/adjuntos/290/imagenes/000/112/0000112723/1200x0/smart/playstation-networkjpg.jpg'
    },
  ]


  return (
    <div>
      <NewsCard allNews={noticias} />
    </div>
  )
}