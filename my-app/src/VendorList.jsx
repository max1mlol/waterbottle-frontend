import {useEffect, useState} from "react";
import {Button, Table} from "@mantine/core";
import {Route, Routes, Link} from "react-router-dom";

function VendorList(){
    const [vendorList, setVendorList] = useState([])
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
            <Button>Create Vendor</Button>
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
