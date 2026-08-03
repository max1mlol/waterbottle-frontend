import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import VendorList from "./VendorList.jsx";
import VendorDetail from "./VendorDetail.jsx";
import NotFound from "./NotFound.jsx";
import { IconBottle } from '@tabler/icons-react';

export default function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                <div>
                    <IconBottle stroke={2} />
                    Waterbottle
                </div>
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
                <li>
                    <a href="/box">Box</a>
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
