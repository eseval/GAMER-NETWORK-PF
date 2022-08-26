// import React from "react";
// import { useSelector } from "react-redux";
// import Forum from "../pages/Forum";
//
// const ForumContainer = () => {
//   const temas = useSelector((state) => state.forumAnswers);
//
//   return (
//       <div>
//         <h1>PRIMER ARCHIVO</h1>
//         {/*<NavBar/>*/ }
//         <div>
//           { temas?.map((e) => {
//             return (
//                 <div>
//                   <div>
//                     <a href="/detailForum">
//                       <h3>{ e.title }</h3>
//                     </a>
//                   </div>
//                   <h4>{ e.user.nickname }</h4>
//                   <span>{ e.comment }</span>
//                 </div>
//             );
//           }) }
//         </div>
//         <Forum/>
//       </div>
//   );
// };
//
// export default ForumContainer