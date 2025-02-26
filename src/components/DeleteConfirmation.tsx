"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DeleteConfirmationProps {
    onConfirm: () => void
    onCancel: () => void
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onCancel}
                className="fixed inset-0 flex items-center justify-center bg-blue-700/30 z-50"
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.2, stiffness: 300, damping: 15, type: "spring" }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full"
                >
                    <h3 className="text-lg font-semibold text-gray-700 pb-3 mb-2 border-b border-zinc-300">Delete Todo?</h3>
                    <div>
                        <p className="text-gray-600 mb-2">
                            Are you sure you want to delete this todo? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex items-center justify-end w-full gap-3 mt-4">
                        <button
                            onClick={onConfirm}
                            className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 text-sm cursor-pointer transition-all duration-300"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-200 text-sm cursor-pointer transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default DeleteConfirmation

