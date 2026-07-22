/*
import { useState, useEffect } from "react";
import {createBrowserRouter, Route, Router, RouterProvider} from "react-router-dom";
import Vendor from "./components/Vendor.jsx";
import Home from "./Home.jsx";
import VendorOne from "./VendorOne.jsx";
const router = createBrowserRouter([
    {path: "/vendor/:id", element:<Vendor/>}
])

function Profile() {

}

export default function VendorList() {
    console.log("VENDOR LIST")
    const [id, setId] = useState(0)
    const [vendor, setVendor] = useState([])
    console.log('render')

    useEffect(() => {
        fetch(`http://localhost:8080/vendors?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setVendor(result.data))
    }, [id])
/!*
    return(
        <>
            <div>
                <button onClick={() => setId(id - 1)}>-</button>
                <span>Vendor id: {id}</span>
                <button onClick={() => setId(id + 1)}>+</button>
            </div>
            {vendor.map((item) => {
                return <>
                    <pre>{JSON.stringify(item)}</pre>
                 </>
            })}
        </>
    )*!/
    return (
        <Router>
            <div>
                <switch>
                    <Route exact path "/">
                        <Home />
                    </Route>
                    <Route path "/1">
                        <VendorOne />
                    </Route>
                </switch>
            </div>
        </Router>
    )
}*/
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "./Home.jsx";
import {Vendor} from "./Vendor.jsx";

function VendorList() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Vendor">Vendor</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                console.log('VendorList')
                <Route path="/Vendor" element={<Vendor />} />
            </Routes>
        </>
    )
}
export default VendorList;