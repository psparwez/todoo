import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className=" fixed inset-0 bg-blue-700/20  z-50 flex justify-center items-center h-screen w-full">
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    );
}

export default Loader;
