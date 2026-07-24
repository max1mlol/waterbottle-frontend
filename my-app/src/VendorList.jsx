/*
import {Route, Routes, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "@mantine/core";
import Home from "./Home.jsx";

export function VendorList() {
    const [id, setId] = useState(0)
    const [vendor, setVendor] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/vendors?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setVendor(result.data))
    }, [id])
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Button component={Link} to="/">Home</Button>
                    </li>
                    <li>
                        <Button
                            component={Link}
                            to={`/vendor/${id-1}`}
                            onClick={() => setId(id - 1)}>-</Button>
                        <span>Vendor id: {id}</span>
                        <Button component={Link}
                                to={`/vendor/${id+1}`}
                                onClick={() => setId(id + 1)}>+</Button>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />

                {/!*<Route path="/vendor/:id" element={<VendorDetail />} />*!/}
            </Routes>
        </>
    )

}
*/
import {useEffect, useState} from "react";
import {Button, Table} from "@mantine/core";
import {Route, Routes, Link} from "react-router-dom";
import VendorDetail from "./VendorDetail.jsx";

function VendorList(){
    const [vendorList, setVendorList] = useState([])
    console.log('render')

    useEffect(() => {
        fetch(`http://localhost:8080/vendors?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setVendorList(result.data))
    }, [])

    const rows = vendorList.map((vendor) => (
        <Table.Tr key={vendor.id}>
            <Table.Td><Link to={`/Vendor/${vendor.id}`}>{vendor.id}</Link></Table.Td>
            <Table.Td>{vendor.name}</Table.Td>
            <Table.Td>{vendor.registrationNumber}</Table.Td>
            <Table.Td>{vendor.contractSignedDate}</Table.Td>
            <Table.Td>{vendor.getContractEndDate}</Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>id</Table.Th>
                        <Table.Th>name</Table.Th>
                        <Table.Th>registrationNumber</Table.Th>
                        <Table.Th>contractSignedDate</Table.Th>
                        <Table.Th>getContractEndDate</Table.Th>

                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>

    )
}

export default VendorList
