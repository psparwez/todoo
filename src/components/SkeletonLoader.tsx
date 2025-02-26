import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className="fixed w-full mx-auto px-10 left-0 mt-6">
            {/* Loop over 4 skeleton loaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5 ">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="border-white border-2 p-5 shadow-[0px_60px_40px_-7px_rgba(0,0,0,0.1)] w-[320px] rounded-[30px] bg-[#f1f4fb] select-none animate-pulse"
                    >
                        <div className="flex flex-col items-start text-left gap-2">
                            {/* Skeleton Image */}
                            <div className="h-10 w-10 rounded-full bg-gray-300 mb-2 animate-pulse"></div>

                            {/* Skeleton Title & Description */}
                            <div className="space-y-2">
                                <div className="h-5 w-2/3 bg-gray-300 animate-pulse"></div>
                                <div className="h-3 w-full bg-gray-300 animate-pulse"></div>
                                <div className="h-3 w-4/5 bg-gray-300 animate-pulse"></div>
                            </div>

                            {/* Skeleton Date and Priority */}
                            <div className="mt-4 w-full space-x-2">
                                <div className="flex items-center justify-start gap-2">
                                    {/* Skeleton "day" */}
                                    <div className="h-8 px-2 py-1 rounded-full bg-gray-300 w-16 animate-pulse"></div>
                                    {/* Skeleton "priority" */}
                                    <div className="h-8 px-2 py-1 rounded-full bg-gray-300 w-16 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Skeleton Action Buttons */}
                            <div className="flex items-center justify-between w-full pt-3 mt-2.5 space-x-3">
                                <div className="h-8 w-20 bg-gray-300 animate-pulse rounded-full"></div>
                                <div className="flex items-center gap-1">
                                    <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                                    <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonLoader;
