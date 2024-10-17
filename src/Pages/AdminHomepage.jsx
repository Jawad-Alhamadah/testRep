import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import AdminStudent from '../Components/AdminStudent'
import axios from "axios"
import SearchForm from "../Components/SearchForm"
import IdeaCard from '../Components/IdeaCard'
import Sidebar from '../Components/Sidebar'
import IdeaStats from '../Components/IdeaStats'
function AdminHomepage() {
    //useEffect for studnets
    //state for students
    let [users, setUsers] = React.useState([])
    let [ideas, setIdeas] = React.useState([])
    let [approved,setApproved] = React.useState(0)
    let [rejected,setRejected] = React.useState(0)
    let [pending,setPending] = React.useState(0)
    let [total,setTotal] = React.useState(0)



    async function orderBy(event) {
        let sorted = [...ideas]

        function compare(a, b) {

            if (a.status === event.target.value && b.status === event.target.value) return 0
            if (a.status !== event.target.value && b.status === event.target.value) return 1
            if (a.status === event.target.value && b.status !== event.target.value) return -1
        }
        await sorted.sort(compare)
        console.log(sorted)
        setIdeas(sorted)


    }
    function getUsers() {

        axios.get("http://localhost:3000/students")
            .then(async res => {
                await setIdeas([])
                setUsers(res.data)
                
            })
            .catch(err => console.log(err))
    }


    function getIdeas() {

        axios.get("http://localhost:3000/ideas")
            .then(async res => {
                console.log(res);
                
                setTotal(res.data.length)
                let app =0
                let rej=0
                let pend=0

               await  res.data.map(idea=>{
                    if (idea.status==="Approved") return app++ ;
                    if (idea.status==="Rejected") return rej++
                    if (idea.status==="Pending") return pend++
                })


                await setIdeas(res.data)
                await setUsers([])
                setRejected(rej)
                setApproved(app)
                setPending(pend)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className=' flex '>
            {/* <Navbar /> */}
            <Sidebar />
            <div className='max-sm:px-5 px-14  w-[100%]'>
                <div className=''
                style={ideas.length>0? {display:"grid"}: {display:"none"} }
                >
                    <IdeaStats pending={pending} approved={approved} rejected={rejected} total={total} ></IdeaStats>
                </div>
             
                <SearchForm orderBy={orderBy} getIdeas={getIdeas} getUsers={getUsers} />
                <div className='mt-10 flex justify-center bg-[#ececec]'>


                    <div className='space-y-5 w-[100%]'
                    style={users.length>0? {display:"block"}: {display:"none"} }
                    >
                        {users.length>0  && users.map((user, index) => {
                            if (user.userType === "admin") return
                            return <AdminStudent
                                key={user._id}
                                id={user._id}
                                name={user.name}
                                hasPending={false}
                                userType={user.userType}
                            />
                        })}

                    </div>


                    
                    <div className=' gap-10 grid max-lg:grid-cols-2 grid-cols-3 max-sm:grid-cols-1 '
                    
                    style={ideas.length>0? {display:"grid"}: {display:"none"} }
                    >

                        {ideas.length>0 ? ideas.map((idea, index) => {
                            return <IdeaCard
                                key={idea._id}
                                description={idea.description}
                                status={idea.status}
                                title={idea.title}
                                student={idea.studentName}
                                id={idea._id}
                            ></IdeaCard>

                        }) : console.log("no ideas")

                        }

                    </div>


                </div>

            </div>




        </div>

    )
}

export default AdminHomepage
