import {useEffect, useState} from "react";
import {Button, Table} from "@mantine/core";
import {Route, Routes, Link} from "react-router-dom";

function BottleList(){
    const [bottleList, setBottleList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/water-bottles?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setBottleList(result.data))
    }, [])

    const rows = bottleList.map((bottle) => (
        <Table.Tr key={bottle.id}>
            <Table.Td><Link to={`/Bottle/${bottle.id}`}>{bottle.id}</Link></Table.Td>
            <Table.Td>{bottle.brand}</Table.Td>
            <Table.Td>{bottle.capacity}</Table.Td>
            <Table.Td>{bottle.barcode}</Table.Td>
            <Table.Td>{bottle.vendorId}</Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Button>Create Bottle</Button>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>id</Table.Th>
                        <Table.Th>brand</Table.Th>
                        <Table.Th>capacity</Table.Th>
                        <Table.Th>barcode</Table.Th>
                        <Table.Th>vendorId</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </>

    )
}

export default BottleList
