import React, { useEffect } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import IdeaStatusCard from './IdeaStatusCard';
import axios from 'axios';


function AdminStudent(props) {
    let navigate = useNavigate()
    let [expand, setExpand] = React.useState(false)
    let [pendingIdeas, setPendingIdeas] = React.useState([])
    let [approved, setApproved] = React.useState(0)

    async function getPendingIdeas() {
        try {
            let res = await axios.get("https://670a49a9ac6860a6c2c914c9.mockapi.io/ideas?studentId=" + props.id)
            let ideaList = res.data
            let approvedCount = 0;
            let pending = ideaList.filter(idea => {
                if (idea.status === "Approved") approvedCount++
                return idea.status === "Pending"
            })
            setPendingIdeas(pending)
            setApproved(approvedCount)
        }

        catch (err) { console.log(err) }


    }
    useEffect(() => {
        getPendingIdeas()
    }, [])
    return (
        <div className='p-7 bg-slate-50 shadow-md border-[1px] rounded-lg '
        // style={props.hasPending ? { borderLeft: " 20px solid orange" } : { borderLeft: " 20px solid gray" }}
        >
            <div className='cursor-pointer   duration-500 max-sm:p-2  flex justify-between'
                onClick={() => navigate("/admin/student/" + props.id)}

            >
                <div className='max-sm:text-xl text-3xl font-semibold space-y-2'>
                    <div>{props.name}</div>
                    {approved ? <div className='text-lg text-green-400'>Approved : {approved}</div> : ""}
                </div>
                
                <div className='flex items-center '>
                    <div className='size-4 rounded-full'
                        style={props.hasPending ? { backgroundColor: " orange" } : {}}
                    ></div>
                    <div className="flex max-sm:text-xl text-2xl">
                        {expand ? <FaChevronDown className='' onClick={
                            (e) => {
                              //  if (!expand) getPendingIdeas()
                                e.stopPropagation();
                                setExpand(prev => !prev)

                            }}

                        ></FaChevronDown> :
                            <FaChevronRight className='' onClick={
                                (e) => {
                                  //  if (!expand) getPendingIdeas()
                                    e.stopPropagation();
                                    setExpand(prev => !prev)

                                }}

                            ></FaChevronRight>
                        }


                    </div>


                </div>


            </div>

            <div
                style={expand ? {} : { display: "none" }}
            >
              
                <div className='max-sm:grid-cols-1 grid max-lg:grid-cols-2 grid-cols-3 gap-3  mt-5'>
                    {pendingIdeas && pendingIdeas.map(pIdea => {
                        return <IdeaStatusCard key={pIdea.id} status={pIdea.status} title={pIdea.title}></IdeaStatusCard>
                    })}

                </div>

            </div>
        </div>

    )
}

export default AdminStudent
