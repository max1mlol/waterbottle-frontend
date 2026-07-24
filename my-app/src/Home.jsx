import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <Link to="/">Home</Link>
            <Link to="/Vendor">Vendor</Link>
        </div>
    );
}

export default Home;