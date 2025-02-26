import { Command, Search } from 'lucide-react';
import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../context/context';

const SearchBox: React.FC = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('SearchBox must be used within a ContextProvider');
    }

    const { data, searchTerm, setSearchTerm } = context;

    const inputRef = useRef<HTMLInputElement>(null);

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === "k" && event.ctrlKey) {
            event.preventDefault();
            console.log("You just pressed Control and K!");
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <>
            {
                data?.length > 0 && (
                    <div className='relative w-full flex items-center group justify-end'>
                        <div className="flex items-center gap-1 h-[50px] border border-zinc-300 rounded-xl bg-white shadow-2xl max-w-[360px] w-full px-4">
                            <span className='text-zinc-400 transition-all duration-300 group-focus-within:text-zinc-800'>
                                <Search size={16} />
                            </span>
                            <input
                                ref={inputRef}
                                type="text"
                                className='bg-transparent border-none outline-none px-2 text-sm w-full'
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='bg-white px-2 py-1 rounded-lg shadow-2xl border border-zinc-300 flex items-center gap-[3px]'>
                                <span className='text-zinc-500'><Command size={11} /></span>
                                <span className='text-zinc-500 text-[11px] font-semibold'>K</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SearchBox;
