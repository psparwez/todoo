import { FileCheck, Plus, Tag, Timer, X } from "lucide-react";
import React, { useCallback, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AddNewProps, Task } from "../types";

// Constants
const TASKS_KEY = "tasks";
const AVATAR_URL = "https://avatar.iran.liara.run/public/boy";

// Helper Functions
const getTasksFromLocalStorage = (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const generateUUID = (): string => {
    return self.crypto.randomUUID();
};

const validateForm = (
    taskName: string,
    selectedDay: string | null,
    selectedPriority: string | null,
    description: string
): { [key: string]: boolean } => {
    return {
        taskName: !taskName.trim(),
        selectedDay: !selectedDay,
        selectedPriority: !selectedPriority,
        description: !description.trim(),
    };
};

const createTaskPayload = (
    id: string,
    taskName: string,
    description: string,
    selectedDay: string | null,
    selectedPriority: string | null,
    tags: string[]
): Task => {
    return {
        id,
        taskName,
        description,
        selectedDay,
        selectedPriority,
        tags,
        avatar: AVATAR_URL,
    };
};

const updateTasksInLocalStorage = (payload: Task, task: Task) => {
    const updatedTasks = getTasksFromLocalStorage();
    const updatedTasksWithChanges = updatedTasks.map((t) =>
        t.id === task.id ? { ...t, ...payload } : t
    );
    saveTasksToLocalStorage(updatedTasksWithChanges);
};

const AddNew: React.FC<AddNewProps> = ({ task }) => {

    const initialTaskName = useMemo(() => task?.taskName || "", [task]);
    const [taskName, setTaskName] = useState(initialTaskName);


    const initialDescription = useMemo(() => task?.description || "", [task]);
    const [description, setDescription] = useState(initialDescription);

    const initialSelectedDay = useMemo(() => task?.selectedDay || null, [task]);
    const [selectedDay, setSelectedDay] = useState<string | null>(initialSelectedDay);

    const initialSelectedPriority = useMemo(() => task?.selectedPriority || null, [task]);
    const [selectedPriority, setSelectedPriority] = useState<string | null>(initialSelectedPriority);

    const initialTags = useMemo(() => task?.tags || [], [task]);
    const [tags, setTags] = useState<string[]>(initialTags);


    const [isTagInputVisible, setTagInputVisible] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(false);

    const uuid = generateUUID();

    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { setCreateModelOpen, fetchData } = context;

    const navigate = useNavigate();


    const handleAddTag = () => {
        if (!newTag.trim()) return;
        setTags((prevTags) => [...prevTags, newTag.trim()]);
        setNewTag("");
        setTagInputVisible(false);
    };


    const handleValidation = (): boolean => {
        const newErrors = validateForm(taskName, selectedDay, selectedPriority, description);
        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };



    const handleSubmit = useCallback(async () => {
        if (!handleValidation()) return;
        setLoading(true);
        try {
            const payload = createTaskPayload(
                task ? task.id : uuid,
                taskName,
                description,
                selectedDay,
                selectedPriority,
                tags
            );

            const updatedTasks = getTasksFromLocalStorage();
            if (task) {
                updateTasksInLocalStorage(payload, task);
                toast.success("Task Updated Successfully!");
            } else {
                updatedTasks.push(payload);
                saveTasksToLocalStorage(updatedTasks);
                toast.success("Task Created Successfully!");
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error saving task:", error);
            toast.error("Failed to save task. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [task, taskName, description, selectedDay, selectedPriority, tags, fetchData, uuid]);


    const handleClose = useCallback(() => {
        setCreateModelOpen(false);
        setTaskName("");
        setDescription("");
        setSelectedDay(null);
        setSelectedPriority(null);
        setTags([]);
        setErrors({});
        setTagInputVisible(false);
        navigate(-1);
    }, [navigate, setCreateModelOpen]);


    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed top-0 overflow-auto bg-blue-700/20 z-30 w-full h-screen flex items-center justify-center left-0"
            >
                <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-lg rounded-2xl border-4 border-white bg-[#f6fafe] py-2"
                >
                    <div className="w-full overflow-y-auto max-h-[500px] h-full">
                        <h3 className="text-lg pt-4 pb-6 border-b border-zinc-200 font-semibold px-6 text-gray-800">
                            {task ? "Edit Task" : "Add Task"}
                        </h3>
                        <div className="w-full p-6 pb-4 flex items-center gap-4 justify-between">
                            <span className="font-bold h-10 w-10 bg-white shadow-xl flex items-center justify-center border border-zinc-200 rounded-lg">
                                <FileCheck size={20} />
                            </span>
                            <div className="flex-1 w-full h-[45px] rounded-lg">
                                <input
                                    aria-label="Task name"
                                    className={`w-full border h-full px-4 rounded-lg outline-none ${errors.taskName ? "border-red-500" : "border-zinc-200"
                                        } focus:border-gray-400`}
                                    type="text"
                                    placeholder="Name of task"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    disabled={loading}
                                    autoFocus
                                />

                            </div>
                        </div>

                        {/* Day Selection */}
                        <div className="p-6 w-full flex flex-col gap-5 text-zinc-600">
                            <div className="w-full grid grid-cols-[1fr_2fr]">
                                <div className="flex items-center gap-2">
                                    <Timer size={20} />
                                    <p>Day</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {["Today", "Tomorrow"].map((day) => (
                                        <div
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`flex items-center justify-center cursor-pointer h-[33px] px-4 rounded-full border text-sm ${selectedDay === day
                                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                                : errors.selectedDay
                                                    ? "border-red-500 text-red-600"
                                                    : "hover:bg-blue-50 text-zinc-500 border-zinc-200"
                                                }`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Priority Selection */}
                            <div className="w-full grid grid-cols-[1fr_2fr]">
                                <div className="flex items-center gap-2">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        height="20"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                        <path d="m14 6-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"></path>
                                    </svg>
                                    <p>Priority</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {["High", "Medium", "Low"].map((priority) => (
                                        <div
                                            key={priority}
                                            onClick={() => setSelectedPriority(priority)}
                                            className={`flex items-center justify-center cursor-pointer h-[33px] px-4 rounded-full border text-sm ${selectedPriority === priority
                                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                                : errors.selectedPriority
                                                    ? "border-red-500 text-red-600"
                                                    : "hover:bg-blue-50 text-zinc-500 border-zinc-200"
                                                }`}
                                        >
                                            {priority}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="w-full grid grid-cols-[1fr_2fr]">
                                <div className="flex items-center gap-2">
                                    <Tag size={20} />
                                    <p>Tags</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-1">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 select-none border border-blue-400/10 text-sm"
                                        >
                                            {tag}
                                            <span
                                                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                                className="cursor-pointer ml-1 hover:text-red-500"
                                            >
                                                <X size={15} />
                                            </span>
                                        </div>
                                    ))}
                                    {isTagInputVisible ? (
                                        <input
                                            type="text"
                                            className="border rounded-full px-2 py-1 text-sm outline-none"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onBlur={handleAddTag}
                                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setTagInputVisible(true)}
                                            className="flex items-center px-3 py-1.5 rounded-full hover:bg-blue-50 cursor-pointer text-sm border border-zinc-200"
                                        >
                                            <Plus size={15} />
                                            <p>Add tags</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="p-6 pt-3">
                            <div className="flex items-start flex-col gap-3">
                                <h3 className="text-base font-semibold text-zinc-600">Description</h3>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={`${errors.description ? "border-red-500" : "border-zinc-200"
                                        } w-full outline-none focus:border-gray-400 max-h-[200px] min-h-[100px] bg-[#fff] px-4 py-2 rounded-lg text-sm border`}
                                    placeholder="Enter description"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex py-5 w-full items-center justify-end px-6">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                type="button"
                                className={`h-[36px] px-4 rounded-full outline-none bg-gradient-to-tr from-zinc-900 to-zinc-400 capitalize text-white grid place-items-center group cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex gap-1 items-center pointer-events-none">
                                        <span className="text-white">
                                            <svg
                                                width="18"
                                                height="18"
                                                stroke="#fff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g transform-origin="center">
                                                    <circle cx="12" cy="12" r="9.5" fill="none" />
                                                </g>
                                            </svg>
                                        </span>
                                        loading
                                    </span>
                                ) : (
                                    "Save Task"
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddNew;