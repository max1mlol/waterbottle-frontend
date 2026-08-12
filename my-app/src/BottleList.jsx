import {useEffect, useState} from "react";
import {Button, Group, Table, TextInput, Select, Pagination, Paper} from "@mantine/core";
import {hasLength, useForm} from "@mantine/form";
import Modal from "./Components/Modal.jsx";
import {BACKEND_BASEPATH} from "./constants.ts";

function BottleList(){
    const pageSize = 5;
    const [bottleList, setBottleList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [openModalTwo, setOpenModalTwo] = useState(false);
    const [openModalThree, setOpenModalThree] = useState(false);
    const [updatedBottle, setUpdatedBottle] = useState(null);
    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("ASC");
    const [filterParams, setFilterParams] = useState({
        filterBy: "",
        filterVal: ""
    });
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
    const formOfFilter = useForm({
        mode: 'uncontrolled',
        initialValues: {
            filterBy: "",
            filterVal: ""
        }
    });

    const fetchBottles = (pageNumber, filters = filterParams) => {
        const params = new URLSearchParams({
            page: (pageNumber - 1).toString(),
            pageSize: pageSize.toString(),
            filterBy: filters.filterBy || "",
            filterVal: filters.filterVal || "",
            sortBy: sortBy,
            order: order
        });

        fetch(`${BACKEND_BASEPATH}/water-bottles?${params.toString()}`)
            .then(response => response.json())
            .then(result => {
                setBottleList(result.data);
                setTotalPages(Math.ceil(result.total / pageSize));
            })
            .catch(error => console.log(error));
    };
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
        fetch(`${BACKEND_BASEPATH}/water-bottles/`,
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
        fetch(`${BACKEND_BASEPATH}/water-bottles/${updatedBottle.id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(result => setBottleList(result.data))
            .catch(error => console.log(error));
    }
    const handleFilter = (values) => {
        const filters = {
            filterBy: values.filterBy.trim() || "",
            filterVal: values.filterVal.trim() || "",
        };
        setFilterParams(filters);
        setPage(1);
        setOpenModalThree(false);
    };

    useEffect(() => {
        fetchBottles(page, filterParams);
    }, [page, filterParams, sortBy, order]);

    const handleDelete = (id) => {
        fetch(`${BACKEND_BASEPATH}/water-bottles/${id}`,
            {
                method: "DELETE",
            })
                .then(response =>  response.json())
                .then(result => setBottleList(result.data))
                .catch(error => console.log(error));
    }

    const [vendorList, setVendorList] = useState([]);
    useEffect(() => {
        fetch(`${BACKEND_BASEPATH}/vendors`)
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
            <Button
                className="filterBottle"
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
                            {...formOfFilter.getInputProps('filterBy')}
                        />
                        <TextInput
                            label="filterVal"
                            withAsterisk
                            mt="md"
                            {...formOfFilter.getInputProps('filterVal')}
                        />
                        <Group justify="flex-end" mt="md">'
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
                            {...updateForm.getInputProps('vendorId')}
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
                        <Table.Th onClick={() => sorting("id")}>id</Table.Th>
                        <Table.Th onClick={() => sorting("brand")}>brand</Table.Th>
                        <Table.Th onClick={() => sorting("capacity")}>capacity</Table.Th>
                        <Table.Th onClick={() => sorting("barcode")}>barcode</Table.Th>
                        <Table.Th onClick={() => sorting("vendorId")}>vendorId</Table.Th>
                        <Table.Th onClick={() => sorting("vendorName")}>vendorName</Table.Th>
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

export default BottleList
