import React, { useContext, useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import { Context } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';

interface Task {
    id: number;
    taskName: string;
    description: string;
    selectedDay: string;
    selectedPriority: string;
    tags: string[];
    avatar?: string;
}

const Details: React.FC = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('Details must be used within a ContextProvider');
    }

    const { taskId, setIsDetailsModalVisible, isCreateModelOpen, setCreateModelOpen } = context;

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch Task by ID
    useEffect(() => {
        if (!taskId) return;

        // Close Create Modal if Open
        if (isCreateModelOpen) {
            setCreateModelOpen(false);
        }

        const fetchTaskById = async (id: number) => {
            setLoading(true);
            setError(null);

            try {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const task = tasks.find((t: Task) => t.id === id);
                if (!task) {
                    setError('Task not found.');
                } else {
                    setTask(task);
                }
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Failed to fetch task. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchTaskById(taskId);
    }, [taskId, isCreateModelOpen, setCreateModelOpen]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDetailsModalVisible(false)}
                        className="fixed top-0 overflow-auto bg-blue-700/20 z-30 w-full h-screen flex items-center justify-center left-0"
                    >
                        <motion.div
                            initial={{ y: 30 }}
                            animate={{ y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-lg rounded-2xl overflow-auto border-4 border-white bg-[#f6fafe] py-2"
                        >
                            <div className="w-full overflow-y-auto max-h-[500px] h-full p-5">
                                {/* Avatar */}
                                <div className="h-12 border mt-2 border-zinc-300 w-12 rounded-full mb-2">
                                    <figure>
                                        {task?.avatar ? (
                                            <img src={task.avatar} alt="avatar" />
                                        ) : (
                                            <img
                                                src={`https://avatar.iran.liara.run/username?username=${task?.taskName[0]}`}
                                                alt="fallback name"
                                            />
                                        )}
                                    </figure>
                                </div>

                                {/* Title & Description */}
                                <div className="flex flex-col w-full pb-6 border-b border-gray-200">
                                    <h1 className="text-lg md:text-xl font-medium text-zinc-800 mb-2">
                                        {task?.taskName ? task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1) : ''}
                                    </h1>
                                    <p className="text-sm text-zinc-500">{task?.description}</p>
                                </div>

                                {/* Day and Priority */}
                                <div className="mt-4 w-full">
                                    <div className="flex gap-10">
                                        <div className="**:text-gray-600 **:text-sm **:mb-2">
                                            <p className="whitespace-nowrap">Day:</p>
                                            <p className="whitespace-nowrap">Priority:</p>
                                        </div>

                                        <div className="flex flex-col items-start whitespace-nowrap gap-1 w-full">
                                            {/* Day */}
                                            <div
                                                className={`${task?.selectedDay === 'Today'
                                                    ? 'bg-red-500/10 border-red-600/30 text-red-800'
                                                    : 'bg-green-500/10 border-green-600/30 text-green-800'
                                                    } px-2 py-1 rounded-full grid place-items-center`}
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="text-xs">
                                                        <Calendar size={13} />
                                                    </span>
                                                    <span className="text-xs">{task?.selectedDay}</span>
                                                </div>
                                            </div>

                                            {/* Priority */}
                                            <div
                                                className={`px-2 py-[2px] rounded-full grid place-items-center border ${task?.selectedPriority === 'High'
                                                    ? 'bg-red-500/10 border-red-600/20 text-red-800'
                                                    : task?.selectedPriority === 'Medium'
                                                        ? 'bg-yellow-500/10 border-yellow-600/20 text-yellow-800'
                                                        : task?.selectedPriority === 'Low'
                                                            ? 'bg-blue-500/10 border-blue-600/20 text-blue-800'
                                                            : 'bg-gray-300/10 border-gray-600/20 text-gray-800'
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
                                                    <span className="text-xs">{task?.selectedPriority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {(task?.tags?.length ?? 0) > 0 && (
                                        <span className="text-xs text-zinc-500 mt-4 flex gap-2">
                                            <div className="flex items-center gap-1">
                                                <span>
                                                    <Tag size={12} />
                                                </span>
                                                Tags:
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1">
                                                {task?.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-[10px] bg-blue-100 text-blue-500 rounded-full line-clamp-1"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </>
    );
};

export default Details;