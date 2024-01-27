import Display from "./Display";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
        <div className="home flex flex-col w-full">
            <Header />
            <div className="flex w-full">
                <Sidebar />
                <Display />
            </div>
        </div>
    )
}

export default Home;