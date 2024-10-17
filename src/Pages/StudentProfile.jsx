import {useState, useEffect} from 'react'
import Sidebar from '../Components/Sidebar'
import axios from 'axios';
import Bottomnav from '../Components/Bottomnav';
import { useParams } from 'react-router-dom';
const AccountsAPI = `https://670a49a9ac6860a6c2c914c9.mockapi.io/accounts`;

function StudentProfile() {
  const {id} = useParams()
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser()
}, [])

const getUser = () => {
    axios.get(AccountsAPI + `/` + id).then(res => {
        setUser(res.data)
       
})
}
  return (

    <div className='flex h-screen'>
        <div>
        <Sidebar name={localStorage.getItem('userName')}></Sidebar>
      </div>
      <div className='px-10 w-full md:w-full flex flex-col items-center justify-center md:px-20'>
              <p className='text-[#3D568F] font-bold text-2xl self-start'>Adding new idea</p>
        <div className='p-10 bg-white w-full my-10  rounded-lg flex flex-col items-start shadow-md'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 w-full justify-items-center'>
            <input type="text" className='input input-bordered my-2 w-full lg:w-[25vw]' value={user.name} />
            <input  type="text" className='input input-bordered my-2 w-full lg:w-[25vw]' value={user.email} />
            <input  type="text" className='input input-bordered my-2 w-full lg:w-[25vw]' placeholder='New email' />
            <input  type="text" className='input input-bordered my-2 w-full lg:w-[25vw]' placeholder='Confirm new email' />

              <p></p>
          </div>
              <button className='btn mt-5 btn-primary md:self-center'>Submit idea</button>
          </div>
      </div>
      <Bottomnav></Bottomnav>
    </div>
  )
}

export default StudentProfile
