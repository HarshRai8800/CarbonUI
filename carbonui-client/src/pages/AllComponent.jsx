import React, { useState } from 'react'
import { SiValorant } from 'react-icons/si';
import { TbLayoutSidebarLeftExpand, TbMenu2, TbSearch } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"


function SidebarComponent({publicComponents,selected,onSelect,search,setSearch}){


  return (
    <>
    <div className='px-3 py-3 border-b border-white/[0.05]'>
      <div className='flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03]
      border border-white/[0.06]'>
        <TbSearch size={13} className='text-white/25 shrink-0'/>
        <input
        placeholder='Search...'
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
        className='bg-transparent text-xs text-white/70 placeholder-white/20
        outline-none w-full'
        />
      </div>
    </div>
    <div className='px-4 pt-3 pb-1.5'>
      <p className='text-[9px] font-bold tracking-[2.5px] uppercase
       text-white/20'>
        Public .{publicComponents.length}
      </p>
    </div>

    <div className='flex-1 overflow'>

    </div>
    </>
    
  )
}

function AllComponent() {
  const navigate = useNavigate();
  const {allComponents} = useSelector((s)=>s.user)
  const [selected,setSelected] = useState(null)
  const [search,setSearch] = useState("")

  const publicComponents = (allComponents || [])
  .filter((c)=>c.visibility === "public")
  .filter((c)=>c.name?.toLowerCase().includes(search.toLowerCase()))
  .sort((a,b)=>a.name?.localeCompare(b.name))

  const handleSelect = (c)=>{
    setSelected(c)
  }

  return (
    <div className='min-h-screen bg-[#030b0d] text-white flex flex-col 
    overflow-hidden'
    style={{fontFamily:"`Dm Sans`, sans-serif"}}>
      <nav className='sticky top-0 z-40 flex items-center justify-between
      px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/[0.05] bg-[#030b0d]/90
      backdrop-blur-md shrink-0'>
          <button onClick={()=>navigate("/")}
            className='flex items-center gap-2 sm:gap-2.5 bg-transparent
            border-none cursor-pointer'>
              <div className='w-7 h-7 sm:w-8 rounded-xl bg-gradient-to-br
              from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center
              shadow-[0_0_14px_rgba(59,232,255,0.35)]'>
                <SiValorant size={13} color='#051c20'/>

              </div>
              <span className='text-sm sm:text-base fot-bold text-white'
              style={{fontFamily:"'Syne',sans-serif"}}
              >CarbonUI</span>

          </button>
          <div className='flex items-center'>
            <div className='hidden sm:flex items-center gap-2 text-xs text-white/30'>
            <TbLayoutSidebarLeftExpand size={14}/>
            <span>Component Explorer</span>
            </div>

            <button className='sm:hidden flex items-center justify-center w-8
            h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50
            transition-colors cursor-pointer'>
              <TbMenu2 size={16}/>

            </button>

          </div>
      </nav>

      <div className='flex flex-1 overflow-hidden '
      style={{height:"calc(100vh - 57px)"}}>
        <aside className='hidden sm:flex w-52 md:w-56 shrink-0 flex-col border-r
        border-white/[0.06] bg-[#040e11] overflow-hidden'>
          <SidebarComponent selected={selected} search={search} setSearch={setSearch}
          onSelect={handleSelect} publicComponents={publicComponents}
          />
        </aside>

      </div>
    </div>
  )
}

export default AllComponent