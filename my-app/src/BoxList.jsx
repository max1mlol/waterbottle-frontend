import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Group, Pagination, Select, Table, TextInput} from "@mantine/core";
import Modal from "./Components/Modal.jsx";
import {BACKEND_BASEPATH} from "./constants.ts";

function BoxList(){
    const pageSize = 5;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [openModalTwo, setOpenModalTwo] = useState(false);
    const [updatedBox, setUpdatedBox] = useState(null);
    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("ASC");
    const [boxList, setBoxList] = useState([]);
    const [refetchFlag, setRefetchFlag] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            length: "",
            width: "",
            height: "",
        },
        validate: {
            length: (value) => {return Number(value) > 0 ? null : "Capacity must be greater than 0"},
            width: (value) => {return Number(value) > 0 ? null : "Capacity must be greater than 0"},
            height: (value) => {return Number(value) > 0 ? null : "Capacity must be greater than 0"},
        },
    });

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

    const fetchBoxes = (pageNumber, filters = filterParams) => {
        const params = new URLSearchParams({
            page: (pageNumber - 1).toString(),
            pageSize: pageSize.toString(),
            filterBy: filters.filterBy || "",
            filterVal: filters.filterVal || "",
            sortBy: sortBy,
            sortMode: order
        });

        fetch(`${BACKEND_BASEPATH}/boxes?${params.toString()}`)
            .then(response => response.json())
            .then(result => {
                setBoxList(result.data);
                setTotalPages(Math.ceil(result.total / pageSize));
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetch(
            `${BACKEND_BASEPATH}/boxes?page=${page - 1}&pageSize=${pageSize}`
        )
            .then((response) => response.json())
            .then((result) => {
                setBoxList(result.data);
                setTotalPages(Math.ceil(result.total / pageSize));
            });
    }, [page]);

    useEffect(() => {
        fetchBoxes(page, filterParams);
    }, [page, filterParams, sortBy, order, refetchFlag]);

    const updateForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            length: "",
            width: "",
            height: "",
        },
        validate: {
            length: (value) => {return Number(value) > 0 ? null : "Length must be greater than 0"},
            width: (value) => {return Number(value) > 0 ? null : "Width must be greater than 0"},
            height: (value) => {return Number(value) > 0 ? null : "Height must be greater than 0"},
        },
    });

    const handleSubmit = (values) => {
        fetch(`${BACKEND_BASEPATH}/boxes`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(values),

            })
            .then(response => response.json())
            .then(result => {
                setBoxList((prev) => [...prev, result]);
                setOpenModal(false);
            })
            .catch(error => console.log(error));
    }

    const handleUpdate = (values) => {
        fetch(`${BACKEND_BASEPATH}/boxes/${updatedBox.id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(result => {
                setOpenModalTwo(false);
                setRefetchFlag(!refetchFlag);
            })
            .catch(error => console.log(error));

    }
    const handleDelete = (id) => {
        fetch(`${BACKEND_BASEPATH}/boxes/${id}`,
            {
                method: "DELETE",
            })
            .then(() => {
                setRefetchFlag(!refetchFlag)
            })
            .catch(error => console.log(error));
    }

    const [vendorList, setVendorList] = useState([]);
    useEffect(() => {
        fetch(`${BACKEND_BASEPATH}/vendors`)
            .then(response => response.json())
            .then(result => setVendorList(result.data))
    }, [])

    const openUpdateModal = (box) => {
        setUpdatedBox(box);
        updateForm.setValues({
            length: box.length,
            width: box.width,
            height: box.height,
        });
        setOpenModalTwo(true);
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

    const rows = boxList.map((box) => (
        <Table.Tr key={box.id}>
            <Table.Td>
                <Button onClick={() => openUpdateModal(box)}>
                    Update
                </Button>
            </Table.Td>
            <Table.Td>{box.id}</Table.Td>
            <Table.Td>{box.length}</Table.Td>
            <Table.Td>{box.width}</Table.Td>
            <Table.Td>{box.height}</Table.Td>
            <Table.Td>{box.volume}</Table.Td>
            <Table.Td>
                <Button onClick={() => handleDelete(box.id)}>
                    Delete
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Button
                className="createBox"
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                Create
            </Button>
            {openModal &&
                <Modal
                    closeModal={setOpenModal}
                    title="Create Box"
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="length"
                            withAsterisk
                            mt="md"
                            key={form.key('length')}
                            {...form.getInputProps('length')}
                        />
                        <TextInput
                            label="width"
                            withAsterisk
                            mt="md"
                            key={form.key('width')}
                            {...form.getInputProps('width')}
                        />
                        <TextInput
                            label="height"
                            withAsterisk
                            mt="md"
                            key={form.key('height')}
                            {...form.getInputProps('height')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Create Box</Button>
                        </Group>
                    </form>
                </Modal>
            }

            {openModalTwo && updatedBox && (
                <Modal
                    closeModal={setOpenModalTwo}
                    title="Update Box"
                >
                    <form onSubmit={updateForm.onSubmit(handleUpdate)}>
                        <TextInput
                            label="length"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('length')}
                            {...updateForm.getInputProps('length')}
                        />
                        <TextInput
                            label="width"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('width')}
                            {...updateForm.getInputProps('width')}
                        />
                        <TextInput
                            label="height"
                            withAsterisk
                            mt="md"
                            key={updateForm.key('height')}
                            {...updateForm.getInputProps('height')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Update Box</Button>
                        </Group>
                    </form>
                </Modal>
            )}
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>update</Table.Th>
                        <Table.Th>id</Table.Th>
                        <Table.Th>length</Table.Th>
                        <Table.Th>width</Table.Th>
                        <Table.Th>height</Table.Th>
                        <Table.Th>volume</Table.Th>
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

export default BoxList