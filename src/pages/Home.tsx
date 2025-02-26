import React from 'react'
import { Toaster } from 'react-hot-toast';
import Backpage from '../components/Backpage';
import AddButton from '../components/AddButton';

const Home: React.FC = () => {
    return (
        <>
            <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
                <div className='items-center flex flex-col w-screen text-center justify-center'>
                    <h1 className='lg:text-[250px] text-[100px] sm:text-[150px] md:text-[200px] tracking-[1px] font-extrabold text-[rgba(0,0,0,0.758)] font-Bebas select-none'>ToDo's.</h1>
                </div>
            </div>
            <Backpage />
            <AddButton />
            <Toaster />
        </>
    )
}

export default Home