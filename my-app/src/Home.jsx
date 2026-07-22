/*
import {Link} from "react-router-dom";

const Vendor = () => {

    const vendorBottles = [
        {id:1, title:"One",},
        {id:2, title:"Two",},
        {id:3, title:"Three",}
    ]
    return (
        <div>
            <h1>Vendor Page</h1>
            <ul>
                {vendorBottles.map((item) => (
                    <li key={item.id}>
                        <Link to={`/vendor/${item.id}`}>
                            <h2>{item.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Vendor;
export function Home() {
}
*/
import { useState, useEffect } from "react";
import {createBrowserRouter, Route, Router, RouterProvider} from "react-router-dom";
import Vendors from "./components/Vendors.jsx";
const router = createBrowserRouter([
    {path: "/vendor/:id", element:<Vendors/>}
])

export function Home() {
    console.log("VENDOR LIST")
    const [id, setId] = useState(0)
    const [vendor, setVendor] = useState([])
    console.log('render')

    useEffect(() => {
        fetch(`http://localhost:8080/vendors?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setVendor(result.data))
    }, [id])
    return(
        <>

            {vendor.map((item) => {
                return <>
                    <pre>{JSON.stringify(item)}</pre>
                </>
            })}
        </>
    )

}
