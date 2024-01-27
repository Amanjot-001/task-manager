import Display from "./Display";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
        <div className="home flex flex-col grow">
            <Header />
            <div className="flex grow">
                <Sidebar />
                <Display />
            </div>
        </div>
    )
}

export default Home;