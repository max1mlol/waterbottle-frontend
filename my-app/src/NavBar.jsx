import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import VendorList from "./VendorList.jsx";
import VendorDetail from "./VendorDetail.jsx";
import NotFound from "./NotFound.jsx";

export default function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                Waterbottle
            </a>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/vendor">Vendor</a>

                </li>
                <li>
                    <a href="/bottle">Bottle</a>

                </li>
            </ul>
        </nav>
    )
}
/*

<Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/Vendor" element={<VendorList />} />
    <Route path="/vendor/:id" element={<VendorDetail />} />
    <Route path="*" element={<NotFound />} />
</Routes>*/
