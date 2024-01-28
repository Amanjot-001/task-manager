import { useState, useRef } from "react";
import PropTypes from "prop-types";

const Card = ({ title, subtasks }) => {
    // const [isExpanded, setIsExpanded] = useState(false);
    // const cardRef = useRef(null);

    // const handleCardExpand = (e) => {
    //     if (cardRef.current && cardRef.current.contains(e.target)) {
    //         return;
    //     }
    //     setIsExpanded(prev => !prev);
    // }
    const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

    return (
        <>
            <div className="card flex flex-col w-full p-4 rounded-md bg-white gap-2 shadow-md">
                <div
                    className="heading font-bold cursor-pointer hover:text-[#635fc7]"
                    // onClick={handleCardExpand}
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
};

export default Card;