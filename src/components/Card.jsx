import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { setSubtaskCompleted, moveTask, deleteTask } from "../redux/boardSlice";

import deleteTaskIcon from '../assets/images/delete-item.png'

const Card = ({ title, subtasks, boardIndex, status, taskIndex }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const handleCardExpand = (e) => {
        if (cardRef.current && cardRef.current.contains(e.target)) {
            return;
        }
        setIsExpanded(prev => !prev);
    }

    const handleCheckboxChange = (subtaskIndex) => {
        dispatch(
            setSubtaskCompleted({
                boardIndex,
                status,
                taskIndex,
                subtaskIndex,
            })
        );
    };

    const handleStatusChange = (value) => {
        setCurrentStatus(value);
        dispatch(
            moveTask({
                boardIndex,
                fromStatus: status,
                toStatus: value, 
                taskIndex
            })
        );
        setIsExpanded(prev => !prev);
    }

    const handleDeleteTask = () => {
        dispatch(
            deleteTask({
                boardIndex,
                status,
                taskIndex
            })
        )
        setIsExpanded(prev => !prev);
    }

    const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

    return (
        <>
            {isExpanded &&
                <div
                    className='fixed z-10 flex justify-center items-center inset-0 w-full h-full bg-[#00000043]'
                    onClick={handleCardExpand}
                >
                    <div
                        className='flex flex-col justify-center items-center w-max h-max bg-white p-8 rounded-lg gap-4 max-w-[50%]'
                        ref={cardRef}
                    >
                        <div className='font-bold flex items-center justify-between gap-2'>
                            {title}
                            <img 
                                src={deleteTaskIcon} 
                                alt="" 
                                className='w-4 h-4 cursor-pointer'
                                onClick={handleDeleteTask}
                            />
                        </div>
                        <label className='flex flex-col mt-4'>
                            <p className="text-sm opacity-50 font-bold">Subtasks ({completedSubtasks.length} of {subtasks.length})</p>
                            {subtasks.map((subtask, index) => (
                                <div key={index} className="flex items-center mb-2 gap-2">
                                    <input
                                        type='checkbox'
                                        checked={subtask.isCompleted}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    {subtask.title}
                                </div>
                            ))}
                        </label>
                        <label className="flex flex-col mt-4">
                            <p className="text-sm opacity-50 font-bold">Current Status</p>
                            <select
                                value={currentStatus}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className='p-2 border rounded-md text-sm'
                            >
                                <option value="Todo">Todo</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                    </div>
                </div>
            }
            <div className="card flex flex-col w-full p-4 rounded-md bg-white gap-2 shadow-md">
                <div
                    className="heading font-bold cursor-pointer hover:text-[#635fc7]"
                    onClick={handleCardExpand}
                >
                    {title}
                </div>
                <div className="subtasks text-sm opacity-50 font-bold">
                    {completedSubtasks.length} of {subtasks.length} completed
                </div>
            </div>
        </>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    subtasks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool.isRequired,
        })
    ).isRequired,
    boardIndex: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    taskIndex: PropTypes.number.isRequired,
};

export default Card;