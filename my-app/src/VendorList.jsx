import {useEffect, useState} from "react";
import {Button, Group, Pagination, Paper, Table, TextInput} from "@mantine/core";
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
    const [openModalThree, setOpenModalThree] = useState(false);
    const [updatedVendor, setUpdatedVendor] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("ASC");


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

    const [filterParams, setFilterParams] = useState({
        filterBy: "",
        filterVal: ""
    });
    const formOfFilter = useForm({
        mode: 'uncontrolled',
        initialValues: {
            filterBy: "",
            filterVal: ""
        },
        validate: {
            //validate
        }
    });



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
    const openFilterModal = (filterParams) => {
        formOfFilter.setValues({
            filterBy: filterParams.filterBy,
            filterVal: filterParams.filterVal,
        });
        setOpenModalThree(true);
    }
    const clearFilter = () => {
        const emptyFilters = {
            filterBy: "",
            filterVal: "",
        };
        setFilterParams(emptyFilters);
        setPage(1);
        formOfFilter.setValues(emptyFilters)
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
    const handleFilter = (values) => {
        const filters = {
            filterBy: values.filterBy.trim() || "",
            filterVal: values.filterVal.trim() || "",
        };
        setFilterParams(filters);
        setPage(1);
        setOpenModalThree(false);
    };

    const fetchVendors = (pageNumber, filters = filterParams) => {
        const params = new URLSearchParams({
            page: (pageNumber - 1).toString(),
            pageSize: pageSize.toString(),
            filterBy: filters.filterBy || "",
            filterVal: filters.filterVal || "",
            sortBy: sortBy,
            order: order
        });

        fetch(`${BACKEND_BASEPATH}/vendors?${params.toString()}`)
            .then(response => response.json())
            .then(result => {
                setVendorList(result.data);
                setTotalPages(Math.ceil(result.total / pageSize));
            })
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchVendors(page, filterParams);
    }, [page, filterParams, sortBy, order]);
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

    const sorting = (col) => {
        if(sortBy === col){
            setOrder(prev => {
                if(prev === "ASC"){
                    return "DESC";
                }
                else {
                    return "ASC";
                }
            });
        }
        else {
            setSortBy(col);
            setOrder("ASC")
        }
        setPage(1);
    }
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
            <Button
                className="filterVendor"
                onClick={() => openFilterModal(filterParams)}
            >
                Filter
            </Button>
            {openModalThree &&
                <Paper
                    shadow="xs" radius="xl" p="xl"
                    closeModal={setOpenModalThree}
                    title = "Filter"
                >
                    <form onSubmit={formOfFilter.onSubmit(handleFilter)}>
                        <TextInput
                            label="filterBy"
                            withAsterisk
                            mt="md"
                            key={formOfFilter.key('filterBy')}
                            {...formOfFilter.getInputProps('filterBy')}
                        />
                        <TextInput
                            label="filterVal"
                            withAsterisk
                            mt="md"
                            key={formOfFilter.key('filterVal')}
                            {...formOfFilter.getInputProps('filterVal')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Apply Filter</Button>
                        </Group>
                    </form>
                </Paper>}
            <Button
                className="filterBottle"
                onClick={clearFilter}
            >
                Clear
            </Button>
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
                        <Table.Th onClick={() => sorting("id")}>id</Table.Th>
                        <Table.Th onClick={() => sorting("name")}>name</Table.Th>
                        <Table.Th onClick={() => sorting("registrationNumber")}>registrationNumber</Table.Th>
                        <Table.Th onClick={() => sorting("contractSignedDate")}>contractSignedDate</Table.Th>
                        <Table.Th onClick={() => sorting("getContractEndDate")}>getContractEndDate</Table.Th>
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
