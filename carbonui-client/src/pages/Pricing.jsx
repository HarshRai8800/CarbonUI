import React from 'react'
import {AnimatePresence,motion} from "motion/react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { FiArrowLeft, FiCheck, FiLock, FiZap } from "react-icons/fi"
import { ServerUrl } from '../App.jsx';
import { setUserData } from '../redux/userSlice.js'
import { useDispatch } from 'react-redux'



const plans=[
{
  name:"Free",
  amount:null,
  aiCredits:150,
  tags:"Current Plan",
  description:"Get started with AI-powered component generation.",
  features:[
    "150 AI Credits included",
    "Save components",
    "Preview & support code",
    "Community support",
  ],
  cta:"Active",
  disabled:true,
  highlight:false
},
{
  name:"Pro",
  amount:99,
  aiCredits:200,
  tags:"Most Popular",
  description:"More credits to build faster with no interruptions.",
  features:[
    "200 AI Credits added",
    "Save components",
    "Preview & support code",
    "Priority support",
  ],
  cta:"Buy for ₹99",
  disabled:false,
  highlight:true
},
];





function Pricing() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handlePayment = async(plan)=>{
    try {
      
      const amount = plan.amount

      const result  = await axios.post(ServerUrl+"/api/payment/create",
        {
          amount,aiCredits:plan.aiCredits
        },{withCredentials:true}
      )

      const options ={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:result.data.amount,
        currency:"INR",
        name:"Carbon.UI",
        description:`${plan.name} - ${plan.aiCredits} Credits`,
        order_id:result.data.id,

          handler :async function (response) {

            const verifyPay = await axios.post(ServerUrl +"/api/payment/verify",
              response,{withCredentials:true})

              console.log(verifyPay.data)
              dispatch(setUserData(verifyPay.data.user))
              alert("Payment Successful 🎉 AiCredits Added!");
              navigate("/generate")
            
          },

          theme:{
            color:'#34079C',
          }
      }

    

      const rzp = new window.Razorpay(options);
      rzp.open()


    } catch (error) {
      
    }
  }


  return (
    
    <div className='min-h-screen text-white relative overflow-hidden
    flex flex-col'
    style={{
      background:"linear-gradient(135deg, #0a0a1a 0%,#0d0d28 60%,#0a1628 100%)",
      fontFamily:"'DM Sans', sans-serif",
    }}
    >    
      <div className='absolute inset-0 pointer-events-none opacity-[0.07]'
      style={
        {backgroundImage:
          "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)",
          backgroundSize:"44px 44px",}
      }/>
      {/* dots */}

      <div className='absolute top-[-8%] left-[10%] w-80 h-80 rounded-full
      pointer-events-none opacity-20'
      style={{background:"radial-gradient(circle, #6366f1 0%,transparent 70%)",
        filter:"blur(60px)"
      }}/>

      <div className='relative z-10 max-w-3xl mx-auto px-4 py-14 w-full'>

        <motion.button
        initial={{opacity:0,x:-12}}
        animate={{opacity:1,x:0}}
        onClick={()=>navigate("/generate")}
        className='flex items-center gap-2 text-sm text-white/40 
        hover:text-white/70
        transition-all mb-10 cursor-pointer bg-transparent border-none'
        >
          <FiArrowLeft size={15}/> Back
        </motion.button>
        

        <motion.div
        initial={{opacity:0,y:-16}}
        animate={{opacity:1,y:0}}
        className='text-center mb-12'
        >

          <div className='inline-flex items-center gap-2 px-4 py-1.5
          rounded-full mb-5'
          style={{background:"rgba(99,102,241,0.12)",
            border:"1px solid rgba(99,102,241,0.25)"
          }}
          >

            <FiZap size={13} className='text-indigo-400'/>
            <span className='text-xs font-semibold tracking-widest text-indigo-300
            uppercase'>
              AI Credits
            </span>
          </div>

          <h1 className='text-4xl sm:text-5xl font-extrabold mb-3'
          style={{fontFamily:"`Syne`,sans-serif",
            letterSpacing:"0.03em"
          }}>
            Simple{" "}
            <span style={{
              background:"linear-gradient(135deg,#818cf8 0%, #06b6d4 100%)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent"
            }}>
              Pricing
            </span>
          </h1>

          <p className='text-white/35 text-sm max-w-sm mx-auto'>
          Choose a plan that fits your workflow. Credits are used each
          time you generate a component.
          </p>
        </motion.div>


        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {plans.map((plan,i)=>(
            <motion.div
            className='relative rounded-2xl p-6 flex flex-col'
            style={{
              background: plan.highlight?
              "linear-gradient(145deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.06) 100%)"
              :"rgba(255,255,255,0.03)",
              border:plan.highlight?
              "1px solid rgba(99,102,241,0.35)"
              :"1px solid rgba(255,255,255,0.07)",
              boxShadow: plan.highlight ?"0 0 40px rgba(99,102,241,0.12)"
              :"none"
            }}
            >

              {/* tag */}
              <div className='flex items-center justify-between mb-5'>
                <span className='text-xs font-semibold px-2.5 py-1
                rounded-full'
                style={{
                  background:plan.highlight?"rgba(99,102,241,0.2)":
                  "rgba(255,255,255,0.06)",
                  color: plan.highlight ? "#818cf8" : "rgba(255,255,255,0.4)",
                  border:plan.highlight? "1px solid rgba(99,102,241,0.3)"
                  :"1px solid rgba(255,255,255,0.08)"
                }}>
                  {plan.tags}
                </span>
                {plan.disabled && (
                  <FiLock size={13} className='text-white/20'/>
                )}

              </div>

              <h2 className='text-xl font-bold mb-1' style={{
                fontFamily:"'Syne',sans-serif"
              }}>
                {plan.name}
              </h2>
              <p className='text-white/35 text-xs mb-5'>
              {plan.description}
              </p>

              <div className='mb-6'>
                {plan.amount?(
                  <div className='flex items-end gap-1'>
                      <span className='text-4xl font-extrabold'
                      style={{fontFamily:"'Syne', sans-serif"}}>
                        ₹{plan.amount}
                      </span>
                  </div>
                ):(
                  <div className='flex items-end gap-1'>
                    <span className='text-4xl font-extrabold'
                    style={{
                      fontFamily:"'Syne', sans-serif"
                    }}>
                      Free
                    </span>
                  </div>
                )}

                <div className='inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 
                rounded-lg'
                style={{
                  background:plan.highlight ? "1px solid rgba(6,182,212,0.1)"
                  :"rgba(255,255,255,0.05)",
                  border:plan.highlight?"1px solid rgba(6,182,212,0.2)"
                  :"1px solid rgba(255,255,255,0.07)",
                }}>
                  <FiZap size={11} style={{
                    color:plan.highlight?"#06b6d4":"rgba(255,255,255,0.4)"
                  }}/>
                  <span
                  className='text-xs font-semibold'
                  style={{
                    color:plan.highlight?"#06b6d4":"rgba(255,255,255,0.4)"
                  }}>
                    {plan.aiCredits}
                  </span>
                </div>
              </div>
              
              <ul className='space-y-2.5 mb-8 flex-1'>
                  {plan.features.map((f)=>(
                    <li key={f} className='flex items-center gap-2.5 text-sm
                    text-white/60'>
                      <FiCheck size={13} style={{color: plan.highlight?
                        "#818cf8" : "rgba(255,255,255,0.3)"
                      }}/>
                        {f}
                    </li>
                  ))}
              </ul>

              <button 
              disabled={plan.disabled}
              onClick={()=>handlePayment(plan)}
              className='w-full py-3 rounded-xl text-sm 
              font-semibold transition-all'
              style={{
                cursor:plan.disabled ?"not-allowed":"pointer",
                background:plan.disabled?
                "rgba(255,255,255,0.04)":
                "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                border:plan.disabled?"rgba(255,255,255,0.25)"
                :"#fff",
                boxShadow: plan.disabled ? "none" 
                :"0 0 24px rgba(99,102,241,0.35)",
              }}>
                {plan.disabled?(
                  <div className='flex items-center justify-center gap-2'>
                      <FiCheck size={14}/>{plan.cta}
                  </div>
                ):plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4}}
        className='text-center text-white/20 text-xs mt-8'
        >
          Credits are added to your account instantly after payments.
        </motion.div>

      </div>


    </div>
  )
}

export default Pricing