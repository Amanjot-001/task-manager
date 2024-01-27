const Header = () => {
    return (
        <div className="flex justify-between items-center m-4">
            <div className="logo font-bold text-2xl">
                Manager
            </div>
            <div className="board-name font-bold">
                Platform
            </div>  
            <div className="add-task bg-sky-600 text-white p-2 rounded-3xl cursor-pointer">
                + Add New Task
            </div>
        </div>
    )
}

export default Header;