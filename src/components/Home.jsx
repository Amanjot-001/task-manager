import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <div className="container">
                <Sidebar />
                
            </div>
        </div>
    )
}

export default Home;