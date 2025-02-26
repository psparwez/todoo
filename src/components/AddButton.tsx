import { Plus } from 'lucide-react';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import AddNew from './AddNew';
import { Context } from '../context/context';
import Loader from '../shared/Loader';
import { navigateWithoutRedirect } from '../utils/navigation';

const AddButton: React.FC = () => {
    const context = useContext(Context);
    if (!context) throw new Error('AddButton must be used within a ContextProvider');

    const { isCreateModelOpen, setCreateModelOpen, taskId, setTaskId } = context;

    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ Memoized handleClick function to prevent unnecessary re-renders
    const handleClick = useCallback(() => {
        if (!isCreateModelOpen) {
            setTask(null);
            setTaskId(undefined);
            navigateWithoutRedirect('/add');
        }
        setCreateModelOpen(prev => !prev);
    }, [isCreateModelOpen, setCreateModelOpen, setTaskId]);

    // ✅ Fetch task only when taskId changes
    useEffect(() => {
        if (!taskId) return;

        const fetchTaskById = async () => {
            setLoading(true);
            setError(null);

            try {
                const updatedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const foundTask = updatedTasks.find((task) => task.id === taskId);
                setTask(foundTask || null);
            } catch (error) {
                console.error("Error fetching task:", error);
                setError("Failed to fetch task. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTaskById();
    }, [taskId]);

    useEffect(() => {
        if (isCreateModelOpen) {
            document.body.classList.add('overflow-y-hidden');
        } else {
            document.body.classList.remove('overflow-y-hidden');
        }
    }, [isCreateModelOpen]);

    return (
        <>
            <motion.button
                onClick={handleClick}
                whileTap={{ scale: 0.90 }}
                title='Create a new task'
                className="fixed right-12 size-16 md:size-20 lg:h-[100px] lg:w-[100px] rounded-full flex cursor-pointer items-center justify-center bottom-12 bg-gradient-to-tr from-white to-yellow-100 group border border-yellow-100 active:to-yellow-200/60"
            >
                <span className="opacity-60 text-yellow-800 transition-all duration-300 group-hover:opacity-100">
                    <Plus size={35} />
                </span>
            </motion.button>

            {isCreateModelOpen && <AddNew task={task} />}
            {loading && <Loader />}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export default AddButton;
