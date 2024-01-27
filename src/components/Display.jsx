const Display = () => {
    return (
        <div className="display flex justify-between w-3/4 bg-[#f4f7fd]">
            <div className="todo flex flex-col grow items-start m-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#a855f7] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Todo (n)
                    </div>
                </div>
            </div>
            <div className="doing flex flex-col grow items-start m-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#22c55e] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Doing (n)
                    </div>
                </div>
            </div>
            <div className="done flex flex-col grow items-start m-4">
                <div className="heading flex h-max items-center gap-2">
                    <div className="circle w-4 h-4 bg-[#f97316] rounded-full"></div>
                    <div className="font-bold opacity-50 tracking-widest">
                        Done (n)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display;