import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import Sidebar from '../Components/Sidebar';
import PopUp from '../Components/PopUp';
import StatusLogo from '../Components/StatusLogo';
function AdminIdeaPage() {
    let { id } = useParams()
    let [studentData, setStudentdata] = useState()
    let [idea, setIdea] = useState()
    let [statusStyle, setStatusStyle] = useState({})
    let [isPopUpOpen,setIsPopUpOpen] = useState(false)
    let [windowType,setWindowType] = useState("")

    function handleAcceptWindow(event) {
        setWindowType("Approve")
        setIsPopUpOpen(true)
    
   }

    function handleRejectWindow(event) {
       setWindowType("Reject")
       setIsPopUpOpen(true)
       
   }


   
   async function getUserData() {
    console.log("hi")
    try {

        let ideasData = await axios.get("https://670a49a9ac6860a6c2c914c9.mockapi.io/ideas/" + id)
        console.log(ideasData)
        let userData = await axios.get("https://670a49a9ac6860a6c2c914c9.mockapi.io/accounts/" + ideasData.data.studentId)

        setStudentdata(userData.data)
        setIdea(ideasData.data)
        if (ideasData.data.status === "Approved") setStatusStyle(
            {
                statusText: { color: "green" },
                statusDot: { backgroundColor: "green" }
            })

        if (ideasData.data.status === "Pending") setStatusStyle(
            {
                statusText: { color: "orange" },
                statusDot: { backgroundColor: "orange" }
            })

        if (ideasData.data.status === "Rejected") setStatusStyle(
            {
                statusText: { color: "red" },
                statusDot: { backgroundColor: "red" }
            })

    } catch (err) { console.log(err) }

}

    useEffect(() => {

        getUserData()

    }, [])

    return (
        <div className='flex h-screen '>
            {/* <Navbar></Navbar> */}
             <Sidebar/> 
            {idea && 
            <PopUp getUserData={getUserData} id={idea.id} isPopUpOpen={isPopUpOpen} setIsPopUpOpen={setIsPopUpOpen } windowType={windowType}></PopUp>
            }
            
            <div className='max-sm:p-5 max-sm:pb-20 p-14 flex flex-col '>
            <h1 className='capitalize text-3xl font-bold text-[#364C84]'>{idea && idea.title}</h1>
                <div className='mt-5 flex space-x-2 items-center '>
                    {/* <div className=' size-7 rounded-full pulsating-circle'
                        style={statusStyle.statusDot}
                    >
                             
                    </div> */}
                   {idea &&  <StatusLogo status={idea.status}></StatusLogo>}
               
                    <div className='text-xl'
                        style={statusStyle.statusText}
                    >{idea && idea.status}</div>

                </div>

                
                <p className='my-5 indent-7 max-sm:text-[0.9em] min-h-[35vh] flex p-5 text-xl  w-[100%] overflow-y-auto '>
                    {idea && idea.description}
                </p>

                <div className='mt-auto flex space-x-5 max-[450px]:justify-between '>

                    <button onClick={handleRejectWindow} className='max-[450px]:text-lg text-lg font-thin  space-x-4 py-2  max-sm:px-7 px-14 rounded-md flex items-center text-white bg-[#FA5252]' >
                        {/* <RxCross2 /> */}
                        <span  >Reject</span>
                    </button>
                    
                    <button onClick={handleAcceptWindow} className='max-[450px]:text-lg text-lg font-thin  space-x-4  py-2 max-sm:px-7 px-14 rounded-md flex items-center text-white bg-[#65A97C]' >
                        {/* <IoCheckmarkSharp /> */}
                        <span  >Approve</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AdminIdeaPage
