import {useEffect, useState} from "react";

function Profile() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        // This runs only on mount (when the component appears)
        fetch("http://localhost:8080/vendors?page=0&pageSize=100")
    }, []);
    let vendor = vendorList[index];
    return (
        <>
            <title>
                <h1>Vendors</h1>
            </title>
            <ul>

            </ul>
        </>
    )
}

export default function VendorList() {
    return (
        <section>
            <h1>Testing</h1>
            <Profile />
        </section>
    );
}