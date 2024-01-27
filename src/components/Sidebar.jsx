import boardLogo from '../assets/images/icon-board.svg'

const Sidebar = () => {
    return (
        <div className="sidebar w-1/4">
            <div className="boards-cnt uppercase m-4 font-bold opacity-50">
                all boards (n)
            </div>
            <div className="board flex gap-2 items-center p-4">
                <img className='h-4 w-4' src={boardLogo} alt="" />
                <div className="board-name font-bold">
                    Platform launch
                </div>
            </div>
        </div>
    )
}

export default Sidebar;