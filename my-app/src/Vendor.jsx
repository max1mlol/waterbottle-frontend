import { useState, useEffect } from "react";
import {createBrowserRouter, useParams, Route, Router, RouterProvider} from "react-router-dom";
import Vendors from "./components/Vendors.jsx";
const router = createBrowserRouter([
    {path: "/vendor/:id", element:<Vendors/>}
])

export function Vendor() {
    console.log("VENDOR LIST")
    const { id } = useParams();
    const [vendor, setVendor] = useState([])
    console.log('render')
    useEffect(() => {
        fetch(`http://localhost:8080/vendors/bottle/${id}`)
            .then(response => response.json())
            .then(result => setVendor(result))
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
