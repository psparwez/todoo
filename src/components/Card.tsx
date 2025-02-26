import { Calendar, Edit, TableOfContents, Tag, Trash } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';
import toast from 'react-hot-toast';
import DeleteConfirmation from './DeleteConfirmation';
import { Context } from '../context/context';
import Details from './Details';
import { navigateWithoutRedirect } from '../utils/navigation';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

interface CardProps {
    reference: React.RefObject<HTMLDivElement>;
}

export interface Task {
    id: number;
    taskName: string;
    description: string;
    selectedDay: string;
    selectedPriority: string;
    tags: string[];
    avatar?: string;
}

const Card: React.FC<CardProps> = ({ reference }) => {
    const {
        setCreateModelOpen,
        data,
        setData,
        error,
        fetchData,
        loading,
        setTaskId,
        isDetailsModalVisible,
        setIsDetailsModalVisible,
        searchTerm,
    } = useContext(Context)!;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Edit Click
    const handleEditClick = (taskId: number) => {
        setTaskId(taskId);
        document.body.classList.add('overflow-y-hidden');
        setIsLoading(true);
        setCreateModelOpen(false);
        setTimeout(() => {
            setIsLoading(false);
            setCreateModelOpen(true);
        }, 500);
        navigateWithoutRedirect('/edit');
    };

    // Delete Task
    const deleteTodo = async (id: number) => {
        try {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter((task: Task) => task.id !== id);
            setData(updatedTasks); // Update state
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            toast.success('Task deleted successfully!');
        } catch (err) {
            console.error('Error deleting task:', err);
            toast.error('Failed to delete task. Please try again.');
        }
    };

    // Fetch Data on Component Mount
    useEffect(() => {
        fetchData();
    }, []);

    // Handle Delete Click
    const handleDeleteClick = (id: number) => {
        setIsModalVisible(true);
        setTaskId(id);
        navigateWithoutRedirect('/delete');
    };

    // Handle Confirm Delete
    const handleConfirmDelete = () => {
        if (data.length === 0) return;
        deleteTodo(data[0].id);
        setIsModalVisible(false);
        navigate(-1);
    };

    // Handle Cancel Delete
    const handleCancelDelete = () => {
        setIsModalVisible(false);
        navigate(-1);
    };

    // Handle Details Click
    const handleDetails = (id: number) => {
        setTaskId(id);
        setIsDetailsModalVisible(true);
        navigateWithoutRedirect(`/details`);
    };

    // Filter Data Based on Search Term
    const filteredData = data.filter(
        (task) =>
            task.taskName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    return (
        <>
            {isLoading && <Loader />}

            {error ? (
                <div className="w-screen h-full">
                    <p className="text-center">{error}</p>
                </div>
            ) : (
                <>
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <>
                            {filteredData.length > 0 ? (
                                <>
                                    {filteredData.map((task) => (
                                        <motion.div
                                            key={task.id}
                                            drag
                                            dragConstraints={reference}
                                            whileDrag={{ scale: 1.05 }}
                                            className="border-white border-2 max-h-max p-5 shadow-[0px_60px_40px_-7px_rgba(0,0,0,0.1)] w-[320px] m-5 rounded-[30px] bg-[#f1f4fb] select-none"
                                        >
                                            <div className="flex flex-col items-start text-left gap-2">
                                                {/* Avatar */}
                                                <div className="h-10 border mt-2 border-zinc-300 w-10 rounded-full mb-2">
                                                    <figure>
                                                        {task.avatar ? (
                                                            <img src={task.avatar} alt="avatar" />
                                                        ) : (
                                                            <img
                                                                src={`https://avatar.iran.liara.run/username?username=${task.taskName[0]}`}
                                                                alt="fallback name"
                                                            />
                                                        )}
                                                    </figure>
                                                </div>

                                                {/* Title & Description */}
                                                <div>
                                                    <h3 className="text-lg font-medium line-clamp-1 text-zinc-800 mb-2">
                                                        {task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}
                                                    </h3>
                                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                                        {task.description}
                                                    </p>
                                                </div>

                                                {/* Deadline and Priority */}
                                                <div className="mt-4 w-full">
                                                    <div className="flex items-start whitespace-nowrap gap-1 w-full">
                                                        <div
                                                            className={`${task.selectedDay === 'Today'
                                                                ? 'bg-red-500/10 border-red-600/30 text-red-800'
                                                                : 'bg-green-500/10 border-green-600/30 text-green-800'
                                                                } px-2 py-1 rounded-full grid place-items-center`}
                                                            title={`${task.selectedDay === 'Today'
                                                                ? 'Deadline Today'
                                                                : 'Deadline Tomorrow'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-center gap-1">
                                                                <span className="text-xs">
                                                                    <Calendar size={13} />
                                                                </span>
                                                                <span className="text-xs">{task.selectedDay}</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={`px-2 py-[2px] rounded-full grid place-items-center border ${task.selectedPriority === 'High'
                                                                ? 'bg-red-500/10 border-red-600/20 text-red-800'
                                                                : task.selectedPriority === 'Medium'
                                                                    ? 'bg-yellow-500/10 border-yellow-600/20 text-yellow-800'
                                                                    : task.selectedPriority === 'Low'
                                                                        ? 'bg-blue-500/10 border-blue-600/20 text-blue-800'
                                                                        : 'bg-gray-300/10 border-gray-600/20 text-gray-800'
                                                                }`}
                                                            title={`${task.selectedPriority === 'High'
                                                                ? 'Priority High'
                                                                : task.selectedPriority === 'Medium'
                                                                    ? 'Priority Medium'
                                                                    : task.selectedPriority === 'Low'
                                                                        ? 'Priority Low'
                                                                        : 'No Priority'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-center gap-1">
                                                                <span className="text-xs">
                                                                    <svg
                                                                        stroke="currentColor"
                                                                        fill="currentColor"
                                                                        strokeWidth="0"
                                                                        viewBox="0 0 24 24"
                                                                        height="14"
                                                                        width="14"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                                        <path d="m14 6-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="text-xs">{task.selectedPriority}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Tags */}
                                                    {task.tags?.length > 0 && (
                                                        <span className="text-xs text-zinc-500 mt-4 flex gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    <Tag size={12} />
                                                                </span>
                                                                Tags:
                                                            </div>
                                                            <div className="flex pb-0 overflow-x-hidden items-center gap-1">
                                                                {task.tags?.map((tag: string) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="px-2 py-1 text-[10px] bg-blue-100 text-blue-500 min-w-max w-full rounded-full line-clamp-1"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center justify-between w-full pt-3 border-zinc-300 border-t mt-2.5">
                                                    <div
                                                        onClick={() => handleDetails(task.id)}
                                                        className="px-2.5 rounded-full py-1 cursor-pointer bg-gradient-to-t from-blue-100 border border-blue-200 to-transparent"
                                                        title="View details"
                                                    >
                                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                                            <span>
                                                                <TableOfContents size={13} />
                                                            </span>
                                                            <span className="text-gray-600 text-xs">Details</span>
                                                        </div>
                                                    </div>

                                                    {/* Edit & Delete */}
                                                    <div className="flex items-center gap-1">
                                                        <span
                                                            onClick={() => handleEditClick(task.id)}
                                                            className="p-2 rounded-full hover:bg-blue-500/15 border text-zinc-500 border-zinc-300 hover:border-blue-500/30 cursor-pointer hover:text-blue-500 transition-all duration-300"
                                                            title="Edit"
                                                        >
                                                            <Edit size={14} />
                                                        </span>
                                                        <span
                                                            onClick={() => handleDeleteClick(task.id)}
                                                            className="p-2 transition-all duration-300 rounded-full hover:bg-red-500/15 border border-zinc-300 text-zinc-500 hover:border-red-500/20 grid place-items-center cursor-pointer hover:text-red-500"
                                                            title="Delete"
                                                        >
                                                            <Trash size={14} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            ) : (
                                !loading && (
                                    <p className="absolute left-[50%] text-zinc-500 translate-x-[-50%]">
                                        No tasks available.
                                    </p>
                                )
                            )}
                        </>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            {isModalVisible && (
                <DeleteConfirmation onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            )}

            {/* Details Modal */}
            {isDetailsModalVisible && <Details />}
        </>
    );
};

export default Card;