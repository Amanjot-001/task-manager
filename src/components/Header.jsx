import { useState, useRef } from "react";
import deleteLogo from '../assets/images/icon-cross.svg';

const Header = () => {
    const [createTask, setCreateTask] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [subTasks, setSubTasks] = useState([{ name: '', completed: false }]);
    const [currentStatus, setCurrentStatus] = useState('todo');

    const taskRef = useRef(null);

    const handleCreateTask = (e) => {
        if (taskRef.current && taskRef.current.contains(e.target)) {
            return;
        }
        setCreateTask(prev => !prev);
    }

    const handleSubmit = (e) => { }

    const handleAddSubtask = () => {
        setSubTasks([...subTasks, { name: '', completed: false }]);
    }

    const handleSubtaskChange = (index, value) => {
        const updatedSubtasks = [...subTasks];
        updatedSubtasks[index].name = value;
        setSubTasks(updatedSubtasks);
    }

    const handleSubtaskDelete = (index) => {
        const updatedSubtasks = [...subTasks];
        updatedSubtasks.splice(index, 1);
        setSubTasks(updatedSubtasks);
    }

    return (
        <>
            {createTask &&
                <div
                    className='fixed z-10 flex justify-center items-center inset-0 w-full h-full bg-[#00000043]'
                    onClick={handleCreateTask}
                >
                    <div
                        className='flex flex-col justify-center items-center w-max h-max bg-white p-8 rounded-lg gap-4'
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
                                    <option value="todo">Todo</option>
                                    <option value="doing">Doing</option>
                                    <option value="done">Done</option>
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
                <div className="board-name font-bold">
                    Platform
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