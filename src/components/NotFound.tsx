import { Undo2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <>
            <div className="fixed top-[50%] w-full h-full overflow-y-auto grid place-items-center left-[50%] -translate-x-[50%] -translate-y-[50%] ">
                <div className='items-center flex flex-col '>
                    <h1 className='text-[250px] tracking[10px] font-extrabold text-[rgba(0,0,0,0.758)] font-Bebas'>404</h1>
                    <div className=" -translate-y-20 flex flex-col items-center gap-5">
                        <p className='text-[22px]  font-medium text-[rgba(0,0,0,0.758)] font-Poppins'>Page Not Found :(</p>
                        <Link to="/" className="border px-3.5 hover:border-violet-300 bg-gray-50 hover:bg-violet-100 h-[35px] grid place-items-center rounded-3xl border-gray-300 text-gray-700 transition duration-300">
                            <p className='text-sm flex items-center gap-2'>
                                <span><Undo2 size={15} className='text-gray-600' /></span>
                                Back to Home</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound