import { useState, useEffect } from "react";
import {createBrowserRouter, useParams, Route, Router, RouterProvider, Routes} from "react-router-dom";

function VendorDetail() {
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

export default VendorDetail;
/*
function VendorDetail() {
    return (
        <h1>vendor-detail</h1>
    )
}
export default VendorDetail;*/
