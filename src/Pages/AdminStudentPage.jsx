import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import IdeaCard from "../Components/IdeaCard"
import Navbar from '../Components/Navbar'
import SearchForm from '../Components/SearchForm'
import Sidebar from '../Components/Sidebar'
function AdminStudentPage(props) {
  let { id } = useParams()
  let [ideas, setIdeas] = React.useState()
  let [userData, setUserData] = React.useState("")

  useEffect(() => {
    async function getUserData() {
      try {
        let ideasData = await axios.get("https://670a49a9ac6860a6c2c914c9.mockapi.io/ideas?studentId=" + id)

        let userData = await axios.get("http://localhost:3000/students/" + id)
        // setUserData(userData.data)
        // setIdeas(ideasData.data)
        console.log(userData);
        
      } catch (err) {
        console.log(err)
      }

    }

    getUserData()
  }, [])
  useEffect(() => {
    getUser()
    getIdea()
},[])
  const getUser = () => {
    axios.get("http://localhost:3000/students/" + id).then(res => {
      console.log(res);
      setUserData(res.data)
    })

  }

  const getIdea = () => {
    axios.get(`http://localhost:3000/ideas/bystudent/` + id).then(res => {
      console.log(res);
      setIdeas(res.data)
    })
  }
  return (
    <div className='flex'>
      {/* <Navbar /> */}
      {/* <SearchForm/> */}
      <Sidebar/>
      <div className='p-5 space-y-5'>
        <h1 className='text-3xl '>{userData && userData.name}</h1>
        <div className=' gap-3 max-lg:grid-cols-1 grid grid-cols-3'>

          {ideas? ideas.map((idea, index) => {
            return <IdeaCard
              key={index}
              description={idea.description}
              status={idea.status}
              title={idea.title}
              student={userData.name}
              id={idea._id}
            ></IdeaCard>

          }): <div className='text-2xl'>No Ideas added yet....</div>
          
          }

     
        </div>

      </div>


    </div>

  )
}

export default AdminStudentPage
