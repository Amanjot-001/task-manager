import { useSelector } from 'react-redux';
import Card from "./Card";

const Display = () => {
    const activeBoardIndex = useSelector((state) => state.boards.findIndex((board) => board.isActive));
    const activeBoardTasks = useSelector((state) => activeBoardIndex >= 0 ? state.boards[activeBoardIndex].tasks : []);
    // console.log(activeBoardTasks[0].Todo)

    return (
        <div className="display grid grid-cols-3 w-3/4 bg-[#f4f7fd] grow m-4">
            <div className="todo flex flex-col grow items-start p-4 gap-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#a855f7] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Todo ({activeBoardTasks[0]?.Todo ? activeBoardTasks[0]?.Todo.length : 0})
                    </div>
                </div>
                {activeBoardTasks[0]?.Todo && activeBoardTasks[0]?.Todo.map((task, index) => (
                    <Card key={index} title={task.title} subtasks={task.subtasks} boardIndex={activeBoardIndex} status={'Todo'} taskIndex={index} />
                ))}
            </div>
            <div className="doing flex flex-col grow items-start p-4 gap-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#22c55e] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Doing ({activeBoardTasks[1]?.Doing ? activeBoardTasks[1]?.Doing.length : 0})
                    </div>
                </div>
                {activeBoardTasks[1]?.Doing && activeBoardTasks[1]?.Doing.map((task, index) => (
                    <Card key={index} title={task.title} subtasks={task.subtasks} boardIndex={activeBoardIndex} status={'Doing'} taskIndex={index} />
                ))}
            </div>
            <div className="done flex flex-col grow items-start p-4 gap-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#f97316] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Done ({activeBoardTasks[2]?.Done ? activeBoardTasks[2]?.Done.length : 0})
                    </div>
                </div>
                {activeBoardTasks[2]?.Done && activeBoardTasks[2]?.Done.map((task, index) => (
                    <Card key={index} title={task.title} subtasks={task.subtasks} boardIndex={activeBoardIndex} status={'Done'} taskIndex={index} />
                ))}
            </div>
        </div>
    )
}

export default Display;