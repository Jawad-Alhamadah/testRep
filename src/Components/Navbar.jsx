import React, { useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

function Navbar() {
    let ref = useRef(null)
    let toggleRef = useRef(null)
    let navigate = useNavigate()
    let [openDropDown, setOpenDropDown] = React.useState(false)
    function handleSideWindow() {
        setOpenDropDown(prev => !prev)
    }
    function handleLogOut() {
        localStorage.clear()
        //navigate somewhere
    }

    useEffect(() => {

        function handleDocumentClick(e) {
            //Clicking on the toggle opens the dropdown.
            //Clicking outside closes the drop down.
            //but the toggle button is outside so we have to
            //check the speical case for if the click is the toggle button
            let isClickOutsideDropDown = ref.current && !ref.current.contains(e.target)
            let isClickNotToggleButton = !toggleRef.current.contains(e.target)

            if (isClickOutsideDropDown && isClickNotToggleButton) {
                setOpenDropDown(false)
            }

        }

        document.addEventListener("mousedown", handleDocumentClick)


        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };

    }, [])
    return (
        <div className='sticky top-0 p-2 flex bg-[#d9d9d9] w-[100%]'>
            <div className=' flex w-[33%] space-x-2 '>

                <div ref={toggleRef} onClick={handleSideWindow} className='relative cursor-pointer ml-5 rounded-full size-8 bg-gray-400'>

                    <div ref={ref} className='z-10 border-[1px] border-[#5a5a5a] bg-gray-300 absolute top-[100%]  left-[100%] w-[10em]'
                        style={openDropDown ? { display: "block" } : { display: "none" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className='p-2'
                            onClick={handleLogOut}
                        >log out</button>

                    </div>
                </div>
                <div className='flex items-center'>
                    Name
                </div>
            </div>
            <div className='space-x-5 justify-center max-sm:w-[64%] w-[33%] flex  flex-wrap items-center'>
                <Link> Home </Link>
                <Link>my ideas</Link>
                <Link>all ideas</Link>
            </div>
            <div className='max-sm:w-[0%] w-[33%]'>

            </div>

        </div>
    )
}

export default Navbar
