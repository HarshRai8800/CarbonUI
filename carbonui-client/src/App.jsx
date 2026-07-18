import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import { useEffect } from 'react';
import axios from 'axios';
import { setUserData } from './redux/userSlice.js';
import { useDispatch } from 'react-redux';
import Generate from './pages/Generate.jsx';



export const ServerUrl = "http://localhost:8000";


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await axios.get(ServerUrl+"/api/user/current-user",
          {withCredentials:true})
          dispatch(setUserData(res.data.user))
      }catch(err){
        console.log(err);
        dispatch(setUserData(null))
      }
    }
    fetchUser();
  },[])
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/generate' element={<Generate/>}/>
    </Routes>
  )
}

export default App