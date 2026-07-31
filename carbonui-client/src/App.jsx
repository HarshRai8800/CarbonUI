import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import { useEffect } from 'react';
import axios from 'axios';
import { setAllComponents, setAllUsers, setUserData } from './redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Generate from './pages/Generate.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Pricing from './pages/Pricing.jsx';
import AllComponent from './pages/AllComponent.jsx';
import MyComponents from './pages/MyComponents.jsx';

import { useState } from 'react';



export const ServerUrl = "https://carbonui.onrender.com";


function App() {
  const dispatch = useDispatch();
  const {userData} = useSelector((state)=>state.user)

  const [authChecked,setAuthChecked] = useState(false);

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await axios.get(ServerUrl+"/api/user/current-user",
          {withCredentials:true})
          dispatch(setUserData(res.data.user))
          setAuthChecked(true);
      }catch(err){
        setAuthChecked(true);
        dispatch(setUserData(null))
      }
    }
    fetchUser();
  },[])


  useEffect(()=>{

    if(!userData)return 

    const fetchAllUsers = async()=>{
      try {
        const userRes = await axios.get(ServerUrl+"/api/user/all-users",{
          withCredentials:true})
          console.log(userRes)
          dispatch(setAllUsers(userRes.data))
      } catch (error) {
        dispatch(setAllUsers(null))
      }
    }

    const fetchAllComponents = async()=>{
      try {
        const componentRes = await axios.get(ServerUrl+"/api/component/all-components",{
          withCredentials:true})
          dispatch(setAllComponents(componentRes.data))
      } catch (error) {
        dispatch(setAllUsers(null))
      }
    }

    fetchAllUsers();
    fetchAllComponents();


  },[userData,dispatch])

  return (
    <>
    {
       !authChecked && (
        <div className='fixed top-0 left-0 w-full h-1 bg-[#35ebff]
        animate-pulse z-50'>
        </div>
  )
    }
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/generate' element={<Generate/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/components' element={<AllComponent/>}/>
      <Route path='/my-components' element={<MyComponents/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
    </Routes>

    </>
  )
}

export default App
