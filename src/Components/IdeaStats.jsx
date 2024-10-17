import React from 'react'

function IdeaStats(props) {
  return (
    <div className=' mt-7 rounded-md'>
        <h1 className='text-indigo-500 font-bold text-2xl'>Dashboard</h1>
 <div className='rounded-md grid grid-cols-4 bg-white text-center mt-5 max-sm:p-1 p-4'>

        <div>

            <h1 className='max-[670px]:text-sm text-2xl'>Total Ideas</h1>
            <h1 className='max-[670px]:text-lg text-4xl text-[#364C84]'>{props.total} </h1>
        </div>
        <div>
            <h1 className='max-[670px]:text-sm text-2xl'>Pending</h1>
            <h1 className='max-[670px]:text-lg text-4xl text-[#FFB056]'>{props.pending}</h1>
        </div>
        <div>
            <h1 className='max-[670px]:text-sm text-2xl'>Approved</h1>
            <h1 className='max-[670px]:text-lg text-4xl text-[#65A97C]'>{props.approved}</h1>
        </div>
        <div>
            <h1 className='max-[670px]:text-sm text-2xl'>Rejected</h1>
            <h1 className='max-[670px]:text-lg text-4xl text-[#FA5252]'>{props.rejected}</h1>
        </div>
      
      
    </div>

    </div>
   
  )
}

export default IdeaStats
