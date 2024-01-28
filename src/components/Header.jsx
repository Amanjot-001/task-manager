import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteBoard, setBoardActive } from '../redux/boardSlice';

import deleteLogo from '../assets/images/icon-cross.svg';
import deleteBoardIcon from '../assets/images/delete-item.png'

const Header = () => {
    const [createTask, setCreateTask] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [subTasks, setSubTasks] = useState([{ title: '', isCompleted: false }]);
    const [currentStatus, setCurrentStatus] = useState('todo');

    const taskRef = useRef(null);
    const dispatch = useDispatch();
    const activeBoardIndex = useSelector((state) => state.boards.findIndex((board) => board.isActive));
    const activeBoardName = useSelector((state) => {
        return activeBoardIndex >= 0 ? state.boards[activeBoardIndex].name : "";
    });

    const handleCreateTask = (e) => {
        if (taskRef.current && taskRef.current.contains(e.target)) {
            return;
        }
        setCreateTask(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addTask({ boardIndex: activeBoardIndex, title: newTaskName, status: currentStatus.toLowerCase(), subtasks: subTasks }));

        setNewTaskName('');
        setSubTasks([{ title: '', isCompleted: false }]);
        setCurrentStatus('todo');
        setCreateTask(false);
    };

    const handleAddSubtask = () => {
        setSubTasks([...subTasks, { title: '', isCompleted: false }]);
    }

    const handleSubtaskChange = (index, value) => {
        const updatedSubtasks = [...subTasks];
        updatedSubtasks[index].title = value;
        setSubTasks(updatedSubtasks);
    }

    const handleSubtaskDelete = (index) => {
        const updatedSubtasks = [...subTasks];
        updatedSubtasks.splice(index, 1);
        setSubTasks(updatedSubtasks);
    }

    const handleDeleteBoard = () => {
        if (window.confirm("Are you sure you want to delete this board?")) {
            dispatch(deleteBoard());
            dispatch(setBoardActive(0));
        }
    }

    return (
        <>
            {createTask &&
                <div
                    className='fixed z-10 flex justify-center items-center inset-0 w-full h-full bg-[#00000043]'
                    onClick={handleCreateTask}
                >
                    <div
                        className='flex flex-col justify-center items-center w-max h-max bg-white p-8 rounded-lg gap-4 max-w-[50%]'
                        ref={taskRef}
                    >
                        <div className="font-bold">
                            Add New Task
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className='flex flex-col'>
                                <p className='text-sm opacity-50 font-bold'>Task Name:</p>
                                <input
                                    type="text"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    placeholder='e.g web design'
                                    className='p-2 border rounded-md text-sm'
                                />
                            </label>

                            <label className='flex flex-col mt-4'>
                                <p className="text-sm opacity-50 font-bold">Subtasks:</p>
                                {subTasks.map((subtask, index) => (
                                    <div key={index} className="flex items-center mb-2 gap-2">
                                        <input
                                            type="text"
                                            value={subtask.name}
                                            onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                            placeholder={`Subtask ${index + 1}`}
                                            className='p-2 border rounded-md text-sm'
                                        />
                                        <img
                                            src={deleteLogo}
                                            alt=""
                                            className='h-4 w-4 cursor-pointer'
                                            onClick={() => handleSubtaskDelete(index)}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='mt-2 py-2 align-center w-full text-white bg-sky-600 rounded-full font-bold'
                                    onClick={handleAddSubtask}
                                >
                                    + Add Subtask
                                </button>
                            </label>

                            <label className='flex flex-col mt-4'>
                                <p className="text-sm opacity-50 font-bold">Current Status:</p>
                                <select
                                    value={currentStatus}
                                    onChange={(e) => setCurrentStatus(e.target.value)}
                                    className='p-2 border rounded-md text-sm'
                                >
                                    <option value="Todo">Todo</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                </select>
                            </label>

                            <button
                                type="submit"
                                className='mt-4 py-2 align-center w-full text-white bg-sky-600 rounded-full font-bold'
                            >
                                Create Task
                            </button>
                        </form>
                    </div>
                </div>
            }
            <div className="flex justify-between items-center m-4">
                <div className="logo font-bold text-2xl">
                    Task Manager
                </div>
                <div className="board-name font-bold flex items-center gap-2">
                    {activeBoardName}
                    <img 
                        src={deleteBoardIcon} 
                        alt="" 
                        className='h-4 w-4 cursor-pointer'
                        onClick={handleDeleteBoard}
                    />
                </div>
                <div
                    className="add-task bg-sky-600 text-white p-2 rounded-3xl cursor-pointer"
                    onClick={handleCreateTask}
                >
                    + Add New Task
                </div>
            </div>
        </>
    )
}

export default Header;