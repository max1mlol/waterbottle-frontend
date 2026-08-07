import {useEffect, useState} from "react";
import {Button, Group, Pagination, Table, TextInput} from "@mantine/core";
import {Link} from "react-router-dom";
import Modal from "./Components/Modal.jsx"
import {hasLength, useForm} from "@mantine/form";
import dayjs from 'dayjs';
import {BACKEND_BASEPATH} from "./constants.ts";
function VendorList(){
    const pageSize = 5;
    const [vendorList, setVendorList] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalTwo, setOpenModalTwo] = useState(false);
    const [updatedVendor, setUpdatedVendor] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const handleSubmit = (values) => {
        fetch("http://localhost:8080/vendors", {method: "POST",   headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(result => {
                setVendorList((prev) => [...prev, result.data]);
                setOpenModal(false);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetch(
            `${BACKEND_BASEPATH}/vendors?page=${page - 1}&pageSize=${pageSize}`
        )
            .then((response) => response.json())
            .then((result) => {
                setVendorList(result.data);
                setTotalPages(Math.ceil(result.total / pageSize));
            });
    }, [page]);

    const handleUpdate = (values) => {
        fetch(`${BACKEND_BASEPATH}/vendors/${updatedVendor.id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(result => setVendorList(result.data))
            .catch(error => console.log(error));
    }

    const handleDelete = (id) => {
        fetch(`${BACKEND_BASEPATH}/vendors/${id}`,
            {
                method: "DELETE",
            })
            .then(response =>  response.json())
            .then(result => setVendorList(result.data))
            .catch(error => console.log(error));
    }

    const [bottleList, setBottleList] = useState([])
    useEffect(() => {
        fetch(`${BACKEND_BASEPATH}/water-bottles`)
            .then(response => response.json())
            .then(result => setBottleList(result.data))
    }, [])

    const openUpdateModal = (vendor) => {
        setUpdatedVendor(vendor);
        updateForm.setValues({
            name: vendor.name,
            registrationNumber: vendor.registrationNumber,
            contractSignedDate: vendor.contractSignedDate,
            getContractEndDate: vendor.getContractEndDate,
        });
        setOpenModalTwo(true);
    }
    const rows = vendorList.map((vendor) => {
        const timeStart = dayjs(vendor.contractSignedDate).format('YYYY-MM-DD');
        const timeEnd = dayjs(vendor.getContractEndDate).format('YYYY-MM-DD');
        return (
            <Table.Tr key={vendor.id}>
                <Table.Td>
                    <Button onClick={() => openUpdateModal(vendor)}>
                        Update
                    </Button>
                </Table.Td>
                <Table.Td><Link to={`/Vendor/${vendor.id}`}>{vendor.id}</Link></Table.Td>
                <Table.Td>{vendor.name}</Table.Td>
                <Table.Td>{vendor.registrationNumber}</Table.Td>
                <Table.Td>{timeStart}</Table.Td>
                <Table.Td>{timeEnd}</Table.Td>
                <Table.Td>
                    <Button onClick={() => handleDelete(vendor.id)}>
                        Delete
                    </Button>
                </Table.Td>
            </Table.Tr>
        )
    });


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: "",
            registrationNumber: "",
            contractSignedDate: "",
            getContractEndDate: "",
        },

        validate: {
            name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            registrationNumber: hasLength({ min: 2, max: 10 }, 'Registration Number must be 2-10 characters long'),
            contractSignedDate: hasLength({ min: 2, max: 100 }, 'Contract Signed Date must be 2-10 characters long'),
            getContractEndDate: hasLength({ min: 2, max: 100 }, 'Contract End Date must be 2-10 characters long'),
        },
    });

    const updateForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: "",
            registrationNumber: "",
            contractSignedDate: "",
            getContractEndDate: "",
        },

        validate: {
            name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            registrationNumber: hasLength({ min: 2, max: 10 }, 'Registration Number must be 2-10 characters long'),
            contractSignedDate: hasLength({ min: 2, max: 100 }, 'Contract Signed Date must be 2-10 characters long'),
            getContractEndDate: hasLength({ min: 2, max: 100 }, 'Contract End Date must be 2-10 characters long'),
        },
    });
    return (
        <>

            <Button
                className="createVendor"
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                Create Vendor
            </Button>
            {openModal &&
                <Modal
                    closeModal={setOpenModal}
                    title="Create Vendor"
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="Name"
                            withAsterisk
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            label="Registration Number"
                            withAsterisk
                            mt="md"
                            key={form.key('registrationNumber')}
                            {...form.getInputProps('registrationNumber')}
                        />
                        <TextInput
                            label="Contract Signed Date"
                            withAsterisk
                            mt="md"
                            key={form.key('contractSignedDate')}
                            {...form.getInputProps('contractSignedDate')}
                        />
                        <TextInput
                            label="Contract End Date"
                            withAsterisk
                            mt="md"
                            key={form.key('getContractEndDate')}
                            {...form.getInputProps('getContractEndDate')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Update Vendor</Button>
                        </Group>
                    </form>
                </Modal>
            }
            {openModalTwo && updatedVendor && (
                <Modal
                    closeModal={setOpenModalTwo}
                    title="Update Vendor"
                >
                    <form onSubmit={updateForm.onSubmit(handleUpdate)}>
                        <TextInput
                            label="Name"
                            withAsterisk
                            key={updateForm.key('name')}
                            {...updateForm.getInputProps('name')}
                        />
                        <TextInput
                            label="Registration Number"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('registrationNumber')}
                            {...updateForm.getInputProps('registrationNumber')}
                        />
                        <TextInput
                            label="Contract Signed Date"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('contractSignedDate')}
                            {...updateForm.getInputProps('contractSignedDate')}
                        />
                        <TextInput
                            label="Contract End Date"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('getContractEndDate')}
                            {...updateForm.getInputProps('getContractEndDate')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Create Vendor</Button>
                        </Group>
                    </form>
                </Modal>
            )}
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>update</Table.Th>
                        <Table.Th>id</Table.Th>
                        <Table.Th>name</Table.Th>
                        <Table.Th>registrationNumber</Table.Th>
                        <Table.Th>contractSignedDate</Table.Th>
                        <Table.Th>getContractEndDate</Table.Th>
                        <Table.Th>delete</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
            <Pagination
                value={page}
                onChange={setPage}
                total={totalPages}
                color="gray"
            />
        </>

    )
}

export default VendorList
