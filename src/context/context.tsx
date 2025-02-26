import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { dataTypes } from '../types';

interface ContextType {
    isCreateModelOpen: boolean;
    setCreateModelOpen: Dispatch<SetStateAction<boolean>>;
    taskId: number | undefined;
    setTaskId: Dispatch<SetStateAction<number | undefined>>;
    data: Array<dataTypes>;
    loading: boolean;
    error: string | undefined;
    fetchData: () => Promise<void>;
    setData: Dispatch<SetStateAction<Array<dataTypes>>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | undefined>>;
    isDetailsModalVisible: boolean;
    setIsDetailsModalVisible: Dispatch<SetStateAction<boolean>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

}

const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [isCreateModelOpen, setCreateModelOpen] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<number | undefined>(undefined);
    const [data, setData] = useState<Array<dataTypes>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchData = async () => {
        try {
            setLoading(true);
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

            setData(tasks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch tasks.");
        } finally {
            setLoading(false);
        }
    };


    const contextValue: ContextType = {
        isCreateModelOpen, setCreateModelOpen, taskId, setTaskId, data, setData, loading, setLoading, error, setError, fetchData, isDetailsModalVisible, setIsDetailsModalVisible, searchTerm, setSearchTerm
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
