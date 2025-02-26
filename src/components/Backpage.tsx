import React, { useRef } from 'react'
import Card from './Card'

const Backpage: React.FC = () => {
    const ref = useRef(null)
    return (
        <div ref={ref} className='relative px-5 lg:px-10 top-0 w-full '>
            <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full ">
                <Card reference={ref} />
            </div>
        </div>
    )
}

export default Backpage