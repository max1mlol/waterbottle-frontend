import {useEffect, useState} from "react";
import {Button, Group, Table, TextInput, Select} from "@mantine/core";
import {hasLength, useForm} from "@mantine/form";
import Modal from "./Components/Modal.jsx";

function BottleList(){
    const [openModal, setOpenModal] = useState(false);
    const [openModalTwo, setOpenModalTwo] = useState(false);
    const [updatedBottle, setUpdatedBottle] = useState(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            vendorId: "",
            brand: "",
            capacity: "",
            barcode: ""
        },
        validate: {
            vendorId: hasLength({ min: 1, max: 10 }, 'Vendor Id must be 1-10 characters long'),
            brand: hasLength({ min: 1, max: 10 }, 'Brand must be 1-10 characters long'),
            capacity: hasLength({ min: 1, max: 100 }, 'Contract Signed Date must be 1-10 characters long'),
            barcode: hasLength({ min: 2, max: 100 }, 'Contract End Date must be 2-10 characters long'),
        },
    });

    const updateForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            vendorId: "",
            brand: "",
            capacity: "",
            barcode: ""
        },
        validate: {
            vendorId: hasLength({ min: 1, max: 10 }, 'Vendor Id must be 1-10 characters long'),
            brand: hasLength({ min: 1, max: 10 }, 'Brand must be 1-10 characters long'),
            capacity: (value) => {Number(value) > 0 ? null : "Capacity must be greater than 0"},
            barcode: hasLength({ min: 2, max: 100 }, 'Barcode must be 2-10 characters long'),
        }
    });

    const handleSubmit = (values) => {
        fetch("http://localhost:8080/water-bottles/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(result => {
                    setBottleList((prev) => [...prev, result.data]);
                    setOpenModal(false);
                })
                .catch(error => console.log(error));
    }

    const handleUpdate = (values) => {
        fetch(`http://localhost:8080/water-bottles/${updatedBottle.id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(result => setBottleList(result.data))
            .catch(error => console.log(error));
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/water-bottles/${id}`,
            {
                method: "DELETE",
            })
                .then(response =>  response.json())
                .then(result => setBottleList(result.data))
                .catch(error => console.log(error));
    }

    const [bottleList, setBottleList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/water-bottles?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setBottleList(result.data))
    }, [])

    const [vendorList, setVendorList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/vendors?page=0&pageSize=100`)
            .then(response => response.json())
            .then(result => setVendorList(result.data))
    }, [])

    const openUpdateModal = (bottle) => {
        setUpdatedBottle(bottle);
        updateForm.setValues({
            vendorId: bottle.vendorId.toString(),
            brand: bottle.brand,
            capacity: bottle.capacity,
            barcode: bottle.barcode,
        });
        setOpenModalTwo(true);
    }
    const rows = bottleList.map((bottle) => (
        <Table.Tr key={bottle.id}>
            <Table.Td>
                <Button onClick={() => openUpdateModal(bottle)}>
                    Update
                </Button>
            </Table.Td>
            <Table.Td>{bottle.id}</Table.Td>
            <Table.Td>{bottle.brand}</Table.Td>
            <Table.Td>{bottle.capacity}</Table.Td>
            <Table.Td>{bottle.barcode}</Table.Td>
            <Table.Td>{bottle.vendorId}</Table.Td>
            <Table.Td>{bottle.vendorName}</Table.Td>
            <Table.Td>
                <Button onClick={() => handleDelete(bottle.id)}>
                    Delete
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Button
                className="createBottle"
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                Create
            </Button>
            {openModal &&
                <Modal
                    closeModal={setOpenModal}
                    title="Create Bottle"
                    centered
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Select
                            label="vendorId"
                            withAsterisk
                            data={
                                    vendorList.map(vendor => ({
                                        value: vendor.id.toString(),
                                        label: vendor.name,
                                    }))
                            }
                            key={form.key('vendorId')}
                            {...form.getInputProps('vendorId')}
                        />
                        <TextInput
                            label="brand"
                            withAsterisk
                            mt="md"
                            key={form.key('brand')}
                            {...form.getInputProps('brand')}
                        />
                        <TextInput
                            label="capacity"
                            withAsterisk
                            mt="md"
                            key={form.key('capacity')}
                            {...form.getInputProps('capacity')}
                        />
                        <TextInput
                            label="barcode"
                            withAsterisk
                            mt="md"
                            key={form.key('barcode')}
                            {...form.getInputProps('barcode')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Create Bottle</Button>
                        </Group>
                    </form>
                </Modal>
            }

            {openModalTwo && updatedBottle && (
                <Modal
                    closeModal={setOpenModalTwo}
                    title="Update Bottle"
                >
                    <form onSubmit={updateForm.onSubmit(handleUpdate)}>
                        <Select
                            label="vendorId"
                            data={vendorList.map(vendor => ({
                                value: vendor.id.toString(),
                                label: vendor.name,
                            }))}
                            {...updateForm.getInputProps("vendorId")}
                        />
                        <TextInput
                            label="brand"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('brand')}
                            {...updateForm.getInputProps('brand')}
                        />
                        <TextInput
                            label="capacity"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('capacity')}
                            {...updateForm.getInputProps('capacity')}
                        />
                        <TextInput
                            label="barcode"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('barcode')}
                            {...updateForm.getInputProps('barcode')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Update Bottle</Button>
                        </Group>
                    </form>
                </Modal>
            )}
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>update</Table.Th>
                        <Table.Th>id</Table.Th>
                        <Table.Th>brand</Table.Th>
                        <Table.Th>capacity</Table.Th>
                        <Table.Th>barcode</Table.Th>
                        <Table.Th>vendorId</Table.Th>
                        <Table.Th>vendorName</Table.Th>
                        <Table.Th>delete</Table.Th>
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
