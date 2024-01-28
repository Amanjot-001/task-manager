import { useState, useRef } from "react";

const Card = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);

    const handleCardExpand = (e) => {
        if (cardRef.current && cardRef.current.contains(e.target)) {
            return;
        }
        setIsExpanded(prev => !prev);
    }

    return (
        <>
            {isExpanded &&
                <div
                    className='fixed z-10 flex justify-center items-center inset-0 w-full h-full bg-[#00000043] max-w-1/2'
                    onClick={handleCardExpand}
                >
                    <div
                        className='flex flex-col justify-center items-center w-max h-max bg-white p-8 rounded-lg gap-4'
                        ref={cardRef}
                    >
                        <div className='font-bold'>
                            Build ui for onboarding task completed taks h hh a
                        </div>

                        {/* <label className='flex flex-col mt-4'>
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
                                </div>
                            ))}
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
                        </label> */}
                    </div>
                </div>
            }
            <div className="card flex flex-col w-full p-4 rounded-md bg-white gap-2 shadow-md">
                <div
                    className="heading font-bold cursor-pointer hover:text-[#635fc7]"
                    onClick={handleCardExpand}
                >
                    Build ui for onboarding task completed task h hh a
                </div>
                <div className="subtasks text-sm opacity-50 font-bold">
                    0 of 3 completed
                </div>
            </div>
        </>
    )
}

export default Card;