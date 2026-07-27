import { useState, useEffect } from "react";
import {createBrowserRouter, useParams, Route, Router, RouterProvider, Routes, Link} from "react-router-dom";
import {Table} from "@mantine/core";

function VendorDetail() {
    console.log("VENDOR LIST")
    const { id } = useParams();
    const [vendorDetail, setVendorDetail] = useState([])
    console.log('render')
    useEffect(() => {
        fetch(`http://localhost:8080/vendors/bottle/${id}`)
            .then(response => response.json())
            .then(result => setVendorDetail(result))
    }, [id])
    const rows = vendorDetail.map((vendor) => (
        <Table.Tr key={vendor.id}>
            <Table.Td>{vendor.id}</Table.Td>
            <Table.Td>{vendor.brand}</Table.Td>
            <Table.Td>{vendor.capacity}</Table.Td>
            <Table.Td>{vendor.barcode}</Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>id</Table.Th>
                        <Table.Th>brand</Table.Th>
                        <Table.Th>capacity</Table.Th>
                        <Table.Th>barcode</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>
    )
/*
    return(
        <>
            {vendorDetail.map((item) => {
                return <>
                    <pre>{JSON.stringify(item)}</pre>
                </>
            })}
        </>
    )
*/
}

export default VendorDetail;
/*
function VendorDetail() {
    return (
        <h1>vendor-detail</h1>
    )
}
export default VendorDetail;*/
