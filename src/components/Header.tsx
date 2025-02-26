import { Sparkle } from 'lucide-react'
import React from 'react'
import SearchBox from './SearchBox'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <header className='w-full z-30 backdrop-blur-[2px] sticky top-0 left-0'>
            <nav className='flex gap-3 py-3 px-5 sm:px-7 md:px-10 lg:px-16 items-center justify-between w-full p-4'>
                {/* Logo */}
                <Link to="/" className='p-3 rounded-full border border-zinc-300 bg-white shadow-xl'>
                    <div className="flex items-center justify-center rounded-full">
                        <span className='text-black'>
                            <Sparkle />
                        </span>
                    </div>
                </Link>
                {/* Search */}
                <SearchBox />
            </nav>
        </header>
    )
}

export default Header
