// import React from "react";
// import AnswerForum from "./AnswerForum";
// import { Link } from "react-router-dom";
// import { RiArrowGoBackFill } from "react-icons/ri";
//
// const DetailForum = () => {
//   const dataUser = JSON.parse(window.localStorage.userLogged);
//
//   const ejemplo = [
//     {
//       title: "TITLE aliquip facilisis animal oratio",
//       text: "TEXT Alienum nam pro phasellus habeo tellus detraxit. Aliquid per voluptatum mucius repudiandae falli similique nam gubergren. Viris tractatos aliquid ipsum periculis suscipit prodesset vero invenire.",
//     },
//   ];
//
//   return (
//     <div>
//       <Link to="/forumContainer">
//         <button>
//           <RiArrowGoBackFill />
//         </button>
//       </Link>
//       <div className=" mx-4 my-4">
//         <div className="border">
//           <div className="flex">
//             <div>
//               <img src={dataUser.img} alt="" className="w-16" />
//             </div>
//             <div className="text-lg font-bold">
//               <p>{dataUser.nickname}</p>
//             </div>
//           </div>
//           {
//             ejemplo?.map((e) => {
//               return (
//                 <div>
//                   <div className="flex justify-center items-center text-3xl font-bold">
//                     <h2>{e.title}</h2>
//                   </div>
//                   <div className="text-lg">
//                     <p>{e.text}</p>
//                   </div>
//                 </div>
//               );
//             })
//             // < p > DetailForum < /p>
//           }
//         </div>
//         <div className="my-4 border">
//           <AnswerForum />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DetailForum;
