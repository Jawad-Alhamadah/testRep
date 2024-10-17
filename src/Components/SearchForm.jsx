import React from 'react'

function SearchForm(props) {

    function orderBy(event){
        props.orderBy("Approved")

    }
    return (
        <div className='w-[100%] space-y-6 flex flex-col items-center pt-10 bg-[#ececec]'>
            <div className='grid grid-cols-2 justify-center p-2 bg-gray-100 space-x-4 rounded-md w-[40%] '>
                <button onClick={()=>props.getUsers()} className='bg-white py-1   rounded-md'>Students</button>
                <button onClick={()=>props.getIdeas()} className='bg-[#6cb3d7] py-1   rounded-md'>Ideas</button>


            </div>
            <div className='flex justify-center'>
                <div className=' max-sm:flex  max-sm:flex-wrap grid grid-cols-[2fr_2fr_1fr] p-2 justify-center gap-7'>
                <input placeholder="Search" type="text"  className='   p-2 rounded-md bg-white'/>

                <select onChange={props.orderBy} name="Status" className='  p-2 rounded-md bg-white'>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>

                </select>
                
                <button  className='font-thin  md:w-[80%] lg:w-[80%] bg-[#364C84] py-1 rounded-md p-2 ml-auto text-white'> Search</button>
                </div>

              
            </div>

        </div>
    )
}

export default SearchForm
