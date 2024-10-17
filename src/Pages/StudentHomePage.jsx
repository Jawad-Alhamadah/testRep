import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import IdeaStatusCard from '../Components/IdeaStatusCard';
import IdeaCard from '../Components/IdeaCard';
import Bottomnav from '../Components/Bottomnav'
import IdeaStats from '../Components/IdeaStats'
const AccountsAPI = `http://localhost:3000/students`;
const IdeasAPI = `http://localhost:3000/ideas/bystudent`;
function StudentHomePage() {
    const {id} = useParams()
    const [user, setUser] = useState([]);
    const [ideas, setIdeas] = useState([])
    const [total , setTotal ]= useState(0)
    const [approved, setApproved] = useState(0)
    const [pending, setPending] = useState(0)
    const [rejected, setRejected] = useState(0)

    let userId, userName, userType;
    useEffect(() => {
        getUser()
        getIdeas()
    }, [])
 
    const getUser = () => {
        axios.get(AccountsAPI + `/` + id).then(res => {
            setUser(res.data)
            console.log(res);
            
            userId = localStorage.setItem('userId', res.data._id)
            userName = localStorage.setItem('userName', res.data.name)
            userType - localStorage.setItem('userType', res.data.userType)
    })
    }
    const getIdeas = () => {
        axios.get(IdeasAPI+`/`+ id).then(async res => {
            await setIdeas(res.data)
            console.log(res);
            setTotal(res.data.length)
            res.data.map(idea => {
                if (idea.status == 'Pending') {
                    setPending(pending + 1)
                } else if(idea.status == 'Approved'){
                   setApproved(approved +1) 
                } else if (idea.status == "Rejected") {
                    setRejected(rejected +1)
                }

            })
        })
    }
  return (
      <div className='flex'>
          <div>
              
          <Sidebar name={user.name}></Sidebar>
          </div>
          <div className='p-5 w-full'>
              <IdeaStats pending={pending} approved={approved} rejected={rejected} total={total}></IdeaStats>
          <div className='flex p-2 border-2 w-full'>
              <div className='flex items-center'>
          <div className={"w-[15px] h-[15px] rounded-full bg-green-600"}></div>
            <p className='text-green-600 mx-2'>Approved</p>
              </div>
              <div className='flex items-center'>
          <div className={"w-[15px] h-[15px] rounded-full bg-amber-400"}></div>
            <p className='text-amber-400 mx-2'>Pending</p>
              </div>
              <div className='flex items-center'>
          <div className={"w-[15px] h-[15px] rounded-full bg-red-500"}></div>
            <p className='text-red-500 mx-2'>Rejected</p>
              </div>

              </div>
              <div className='flex flex-col items-center my-5 w-full'>
                  <div className='w-full'>
                  <p className='text-lg'>My ideas</p>
                      
                  </div>
                  <div className='grid grid-cols-1 p-5 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full  justify-items-center'>
                      {ideas.map(idea => {
                         
                              return (<IdeaCard id={idea._id} title={idea.title} status={idea.status} student={idea.studentName} description={idea.description}></IdeaCard>)
                          
                      })}
                  </div>
              </div>
            
          </div>
          <Bottomnav></Bottomnav>
    </div>
  )
}

export default StudentHomePage
