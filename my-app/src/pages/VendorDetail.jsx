import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {Table} from "@mantine/core";
import {BACKEND_BASEPATH} from "../constants.ts";

function VendorDetail() {
    const { id } = useParams();
    const [vendorDetail, setVendorDetail] = useState([])
    useEffect(() => {
        fetch(`${BACKEND_BASEPATH}/vendors/${id}/bottles`)
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
}

export default VendorDetail;
