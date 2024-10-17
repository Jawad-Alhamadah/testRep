import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar'
import Bottomnav from '../Components/Bottomnav';
const IdeasAPI = `https://670a49a9ac6860a6c2c914c9.mockapi.io/ideas`;

function NewIdea() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [warningText, setWarningText] = useState('')
    const addAction = () => {
        if (title == '' || description == '') {
            setWarningText('Please fill the fields before submitting')
        } else {
            setWarningText('')
            axios.post(IdeasAPI, {
                studentId: localStorage.getItem('userId'),
                studentName: localStorage.getItem('userName'),
                title: title,
                description: description,
                status: 'Pending',
                comment: '',
                date: new Date()
            }).then(res => {
                console.log(res);
                
            })
        }
    }
  return (
    <div className='flex flex-cols h-screen items-center'>
           <div>
           <Sidebar name={localStorage.getItem('userName')}></Sidebar>
           </div>
          <div className='px-10 w-full md:w-full flex flex-col items-center justify-center md:px-20'>
              <p className='text-[#3D568F] font-bold text-2xl self-start'>Adding new idea</p>
              
          <div className='p-10 bg-white w-full my-10 shadow-sm rounded-lg flex flex-col items-center md:items-start'>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='input input-bordered my-2 md:w-[30vw]' placeholder='Idea title' />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={10} name="description" id="" className='textarea textarea-bordered my-2 w-full' placeholder='Describe you idea'></textarea>
              <p>{warningText}</p>
              <button onClick={addAction} className='btn mt-5 btn-primary md:self-center'>Submit idea</button>
          </div>
          </div>
          <Bottomnav></Bottomnav>
    </div>
  )
}

export default NewIdea
