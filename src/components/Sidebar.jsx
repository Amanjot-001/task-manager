import { useState, useRef } from 'react';
import boardLogo from '../assets/images/icon-board.svg'

const Sidebar = () => {
    const [createBoard, setCreateBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const createRef = useRef(null);

    const handleCreateBoard = (e) => {
        if (createRef.current && createRef.current.contains(e.target)) {
            return;
        }
        setCreateBoard(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            {createBoard &&
                <div
                    className='fixed z-10 flex justify-center items-center inset-0 w-full h-full bg-[#00000043]'
                    onClick={handleCreateBoard}
                >
                    <div
                        className='flex flex-col justify-center items-center w-max h-max bg-white p-8 rounded-lg gap-4'
                        ref={createRef}
                    >
                        <div className='font-bold'>
                            Add New Board
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className='flex flex-col'>
                                <p className='text-sm opacity-50 font-bold'>Board Name:</p>
                                <input
                                    type="text"
                                    value={newBoardName}
                                    onChange={(e) => setNewBoardName(e.target.value)}
                                    placeholder='e.g web design'
                                    className='p-2 border rounded-md text-sm'
                                />
                            </label>
                            <button
                                type="submit"
                                className='mt-4 py-2 align-center w-full text-white bg-sky-600 rounded-full font-bold'
                            >
                                Create New
                            </button>
                        </form>
                    </div>
                </div>
            }
            <div className="sidebar w-1/4">
                <div className="boards-cnt uppercase m-4 font-bold opacity-50">
                    all boards (n)
                </div>
                <div className="board flex gap-2 w-max items-center p-4 pe-8 cursor-pointer rounded-e-full">
                    <img className='h-4 w-4' src={boardLogo} alt="" />
                    <div className="board-name font-bold">
                        Platform launch
                    </div>
                </div>
                <div
                    className="new-board flex gap-2 items-center w-max p-4 pe-8 cursor-pointer rounded-e-full"
                    onClick={handleCreateBoard}
                >
                    <img className='h-4 w-4' src={boardLogo} alt="" />
                    <div className="board-name font-bold text-[#635fc7]">
                        Create New Board
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;