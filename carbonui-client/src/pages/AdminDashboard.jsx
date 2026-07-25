import axios from 'axios';
import React, { useState } from 'react'
import { SiValorant } from 'react-icons/si'
import { TbLayout, TbLayoutDashboard, TbPackage, TbChevronLeft, TbMenu, TbPlus, TbUsers, TbCode, TbWorld, TbSearch } from "react-icons/tb"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { motion,AnimatePresence, color } from 'motion/react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

function CustomToolTip({active,payload,label}){
  if(!active || !payload?.length)return null;
  return (
    <div className='bg-[#0a1f24] border border-white/10 rounded-xl px-3 py-2.5
    text-xs shadow-xl'>
      <p className='text-white/50 mb-1'>{label}</p>
      <p className='text-[#a78bfa] font-bold'>{payload[0].value} component</p>
    </div>
  )
}

function AdminDashboard() {
  const [activeVeiw,setActiveVeiw] = useState("dashboard");
  const [sideBarOpen,setSideBarOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData,allUsers,allComponents} = useSelector((s)=>s.user)

  const publishComponent = allComponents?.filter((c)=>c.visibility === "public") || []
console.log(allUsers,userData, allComponents)

  const stats = [
    {label:"Total Users" ,value: allUsers?.length || 0,icon:
      TbUsers, color : "#3be8ff"},
    {label:"Component Made" ,value:publishComponent?.length||0 ,icon:
        TbCode,color:"#a78bfa"},
  ]



  const handleLogOut = async()=>{
        try{
          await axios.get(ServerUrl+"/api/auth/logout",
            {withCredentials:true})
            dispatch(setUserData(null))
            navigate("/")
        }catch(err){
            console.log(err)
        }
        setProfileOpen(false)
      }

  const navItems = [
    {id:"dashboard",label:"DashBoard",Icon:TbLayoutDashboard},
    {id:"add",label:"Add Component",Icon:TbPackage}
  ]

  const SideBarComponent =()=>{
    return (
    <>
    <div className='flex items-center gap-2.5 px-5 py-5 border-b
     border-white/[0.06]'>

    <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff]
    to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]
    flex-shrink-0'>
      <SiValorant size={15} color="#051c20"/>
    </div>
    <div>
      <span className='text-base font-bold block'>CarbonUI</span>
      <span className='text-[10px] text-[#3be8ff]/60 fomt-semibold
      tracking-[2px] uppercase'>Admin</span>
    </div>
    <button onClick={()=>setSideBarOpen(false)} 
    className='ml-auto md:hidden bg-transparent border-none 
    cursor-pointer p-1.5 rounded-lg text-white/40 
    hover:text-white/70 transition-colors'>
      <TbChevronLeft size={18}/>
    </button>
    </div>

    <nav className='flex-1 px-3 py-4 space-y-1'>

      {navItems.map(({id,label,Icon})=>{
        const isActive = activeVeiw ===id;
        return (
          <button key={id}
          onClick={()=>setActiveVeiw(id)}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          text-sm font-medium transition-all bg-transparent border-none
          cursor-pointer text-left'

          style={{
            background: isActive ? "rgba(59,232,255,0.08)":
            "transparent",
            color:isActive?"#3be8ff":"rgba(255,255,255,0.45)",
            borderLeft: isActive? "2px solid #3be8ff":"2px solid transparent",
          }}
          >
            <Icon size={16} style={{opacity:isActive ?1:0.7}} />
            {label}
          </button>
        )
      })}


    </nav>

    <div className='p-3 border-t border-white/[0.05]'>
      <button 
      onClick={handleLogOut}
      className='w-full flex items-center gap-3 px-4 py-2.5
       text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.06]
       transition-colors cursor-pointer bg-transparent border-none text-left'>
       <TbLayout size={16}/>
         Logout
      </button>
    </div>
    </>
    )
  }

  const chartData = (()=>{
      if(!publishComponent)return[];
      const map = {}
      publishComponent.forEach((c)=>{
        const raw = c.createdAt;
        if(!raw) return ;
        const label = new Date(raw).
        toLocaleDateString("en-US",{month:"short",day:"numeric"});
        map[label] = (map[label]||0)+1;

      })

      return Object.entries(map)
      .map(([date,Count])=>({date,components:Count}))
      .sort((a,b)=>new Date(a.date) - new Date(b.date))
      .slice(-12);

  })();


  return (
    <div className='min-h-screen bg-[#030b0d] text-white flex overflow-hidden'
    style={{fontFamily:"`DM Sans`, sans-serif"}}
    >
      <aside className='hidden md:flex flex-col w-60 min-h-screen bg-[#040e11]
      border-r border-white/[0.06] fixed top-0 left-0 z-20'>
        <SideBarComponent/>
      </aside>

      <AnimatePresence>
        {
          sideBarOpen && (
            <>
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.3}}
            className='fixed inset-0 bg-black/60 backdrop-blur-[2px]
            md:hidden'
            onClick={()=>setSideBarOpen(false)}
            />

              <motion.aside
              initial={{x:"-100%"}}
              animate={{x:0}}
              exit={{x:"-100%"}}
              transition={{type:"spring",damping:28,stiffness:300}}
              className='fixed top-0 left-0 z-40 flex flex-col w-64 
              min-h-screen bg-[#040e11] border-r border-white/[0.06]
              md:hidden'
              
              
              >


              <SideBarComponent/>

              </motion.aside>
 
            
            
            </>
          )
        }


      </AnimatePresence>

      <main className='flex-1 md:ml-60 min-h-screen overflow-y-auto'>

        <div className='sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5
        sm:py-4 bg-[#030b0d]/90 backdrop-blur-md border-b border-white/[0.05]
        flex items-center justify-between gap-2'>
          <div className='flex items-center gap-3 min-w-0'>
            <button 
            onClick={()=>setSideBarOpen(true)}
            className='md:hidden bg-transparent border-none
            cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80
            hover:bg-white/[0.05] transition-all flex-shrink-0'>
              <TbMenu size={20}/>
            </button>
            <div className='min-w-0'>
              <h1 className='text-base sm:text-lg font-bold truncate'>
                {activeVeiw === "dashboard" ? "Dashboard" : "Add Components"}
              </h1>
              <p className='text-white/35 text-xs truncate '>
              Welcome back, {userData?.name || "Admin"}
              </p>
            </div>

          </div>
          <motion.button
          initial={{opacity:0,scale:0.95}}
          animate={{opacity:1,scale:1}}
          onClick={()=>navigate("/generate")}
          className='flex items-center gap-1.5 sm:gap-2 px-3 sm:py-4
          py-2 rounded-xl text-xs sm:text-xs font-semibold text-[#030b0d] bg-gradient-to-r 
          from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all
          shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none flex-shrink-0'
          >
            <TbPlus size={14}/>

            <span className='hidden sm:inline'> 
              AI Component 
            </span>



          </motion.button>

        </div>
        <AnimatePresence mode='wait'>
          {activeVeiw === "dashboard" && (
            <motion.div 
            key="dashboard"
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-10}}
            transition={{duration:0.25}}
            className='px-4 sm:px-6 lg:px-8 py-5 sm:py-6
            space-y-4 sm:space-y-6'>

            {/* stats */}

            <div className='grid grid-cols-2 gap-3 sm:gap-4'>

              {stats.map(({label,value,icon:Icon,color},i)=>(

                <motion.div
                key={i}
                initial={{opacity:0,y:16}}
                animate={{opacity:1,y:0}}
                transition={{delay:i*0.08, duration :0.4}}
                className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07]
                bg-white/[0.02] hover:border-white/[0.12 transition-all'
                >

                  <div className='mb-2.5 sm:mb-3'>
                    <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex
                    items-center justify-center'
                    style={{
                      background:`${color}15`, border:`1px solid ${color}25`
                    }}
                    >
                      <Icon size={15} style={{color}}/>
                    </div>
                  </div>
                  <p className='text-xl sm:text-2xl font-bold'>
                        {value.toLocaleString()}
                      </p>
                      <p className='text-white/40 text-xs mt-0.5'>
                      {label}
                      </p>

                </motion.div>
              ))}


            </div>

              {/* chart */}
              

              <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:0.2,duration:0.5}}
              className='p-4 sm:p-5 rounded-2xl border border-white/[0.07]
              bg-white/[0.02]'
              >
                <div className='flex items-start sm:items-center justify-between 
                  mb-4 sm:mb-5 gap-2'>
                  <div className='min-w-0'>
                  <p className='font-semibold text-sm truncate'>
                    Public Components Published
                  </p>
                  <p className='text-white/35 text-xs mt-0.5'>
                    Date-wise breakdown
                  </p>
                   </div>
                <span className='text-[10px] font-semibold px-2 sm:px-2.5 
                py-1 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] border 
                border-[#a78bfa] flex-shrink-0'>
                  Last 12 days
                </span>
              </div>
                    {chartData?.length===0?(
                      <div className='h-[180px] sm:h-[220px] flex items-center
                      justify-center text-white/20 text-sm'>
                        No public components yet
                      </div>
                    ):(
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                          data={chartData}
                          margin={{ top: 5, right: 5, bottom: 0, left: -25 }}
                        >
                          <defs>
                            <linearGradient
                              id="componentGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                            </linearGradient>
                          </defs>

                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.04)"
                          />

                          <XAxis
                            dataKey="date"
                            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                          />

                          <YAxis
                            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                            width={30}
                          />

                          <Tooltip content={CustomToolTip} cursor={{
                            stroke:"rgba(255,255,55,0.06)"}}/>
                          <Area
                            type="monotone"
                            dataKey="components"
                            stroke="#a78bfa"
                            strokeWidth={2}
                            fill="url(#componentGradient)"
                            dot={false}
                            activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )
                    }
              </motion.div>

              <motion.div 
                    className='rounded-2xl border border-white/[0.07]
                    bg-white/[0.02] overflow-hidden'
                    >
                      <div className='flex flex-col sm:flex-row sm:items-center justify-between
                      gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.05]'>

                        <div className='flex items-center gap-2.5'>

                        <div className='w-7 h-7 rounded-lg flex items-center
                        justify-center '
                        style={{
                          background:"rgba(59,232,255,0.1)",
                          border:"1px solid rgba(59,232,255,0.2)"
                        }}>

                          <TbWorld size={14} style={{color:"#3be8ff"}}/>
                          </div>
                          <div>

                            <p className='font-semibold text-sm'>
                              Public Components
                            </p>

                            <p className='text-white/35 text-[11px]'>
                            {publishComponent.length} components visible to all Components
                            users
                            </p>
                          </div>
                        </div>

                        <div className='relative w-full sm:w-48'>
                          <TbSearch size={13}/>
                        </div>

                      </div>

                      <div>

                      </div>



                    </motion.div>
            </motion.div>
          )}


          
        </AnimatePresence>



      </main>


    </div>
  )
}

export default AdminDashboard