import { useLocation, Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useEffect} from "react"

export default function ModifyUserForm() {
  const navigate= useNavigate()
  const location = useLocation();
  const user = location.state;
  
  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
  useEffect(()=>{
    if(!dataUser || dataUser===""){
      navigate("/")
    }
  },[dataUser, navigate])
  
    return (
      <div className="container max-w-md mt-10 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-5 py-4">
          <Link className="text-lg text-black" to={`/profile/${user.id}`}>Return to Profile</Link>
        </div>
        <h3 className="mt-5 text-2xl text-center">Edit Information</h3>
        <Formik 
          initialValues={{
            img: user.img,
            nickname: user.nickname,
            servers: user.servers,
            favoriteGames: user.favoriteGames
          }}
          validationSchema={
            Yup.object({
              img: Yup.string().url('Must be an url').nullable(),
              nickname: Yup.string()
                .max(15, 'Must be 3-15 characters')
                .min(3, 'Must be 3-15 characters'),
            })
          }
          onSubmit={async values => {
            await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${user.id}`, values);
            const newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${user.id}`)
            window.localStorage.setItem("userLogged", JSON.stringify(newDataUser.data));
            navigate(`/profile/${user.id}`)
          }}
        >
        <Form>
          <div className="flex items-center justify-center m-5">
            <label for="img" className="block text-lg font-medium text-gray-700">Avatar</label>
            <Field 
              type="text" 
              name="img" 
              id="img" 
              placeholder='Image URL' 
              className="w-full px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <ErrorMessage name="img" />
          </div>
          <div className="flex items-center justify-center m-5">
            <label for="nickname" className="block text-lg font-medium text-gray-700">Nickname</label>
            <Field 
              type="text" 
              name="nickname" 
              id="nickname" 
              placeholder={user.nickname} 
              className="w-full px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <ErrorMessage name="nickname" />
          </div>
          <div className="flex items-center justify-center m-5">
            <label for="servers" className="block text-lg font-medium text-gray-700">Server</label>
            {/* <Field 
              as="select"
              id="server" 
              name="server" 
              className="px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value='LAS'>LAS</option>
              <option value='LAN'>LAN</option>
              <option value='BR'>BR</option>
              <option value='NA'>NA</option>
              <option value='EUW'>EUW</option>
            </Field> */}
            <Field
              type="text" 
              name="servers" 
              id="servers" 
              placeholder='Ej.: LAS' 
              className="w-full px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
  
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button 
              type="submit" 
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save changes
            </button>
          </div>
        </Form>
        </Formik>
      </div>
    )
  
}