import {useEffect, useState} from "react";
import {Button, Group, Pagination, Loader, Table, TextInput, Paper} from "@mantine/core";
import useBoxes from "../hooks/useBoxes.js";
import BoxForm from "../components/BoxForm.jsx";

export default function BoxList(){
    const {
        boxes, totalPages, page, setPage, loading,
        toggleSort, filters, setFilters, clearFilter,
        create, update, remove,
    } = useBoxes();

    // null = no form open, 'create' = create mode, a vendor object = edit mode
    const [formState, setFormState] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const rows = boxes.map((box) => (
        <Table.Tr key={box.id}>
            <Table.Td>
                <Button onClick={() => setFormState(box)}>Update</Button>
            </Table.Td>
            <Table.Td>{box.id}</Table.Td>
            <Table.Td>{box.length}</Table.Td>
            <Table.Td>{box.width}</Table.Td>
            <Table.Td>{box.height}</Table.Td>
            <Table.Td>{box.volume}</Table.Td>
            <Table.Td>
                <Button onClick={() => remove(box.id)}>Delete</Button>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Group>
                <Button onClick={() => setFormState('create')}>Create Box</Button>
                <Button onClick={() => setFilterOpen(!filterOpen)}>Filter</Button>
                <Button onClick={clearFilter}>Clear</Button>
            </Group>

            {/* The filter is two plain inputs — no fake modal needed. */}
            {filterOpen && (
                <Paper shadow="xs" radius="xl" p="xl">
                    <Group>
                        <TextInput
                            label="filterBy"
                            value={filters.filterBy}
                            onChange={(e) => setFilters({ ...filters, filterBy: e.currentTarget.value })}
                        />
                        <TextInput
                            label="filterVal"
                            value={filters.filterVal}
                            onChange={(e) => setFilters({ ...filters, filterVal: e.currentTarget.value })}
                        />
                    </Group>
                </Paper>
            )}

            {formState === 'create' && (
                <BoxForm
                    title="Create Box"
                    closeModal={() => setFormState(null)}
                    onSubmit={create}
                />
            )}
            {formState && formState !== 'create' && (
                <BoxForm
                    title="Update Box"
                    initialValues={formState}
                    closeModal={() => setFormState(null)}
                    onSubmit={(values) => update(formState.id, values)}
                />
            )}

            {loading ? (
                <Loader mt="xl" />
            ) : (
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>update</Table.Th>
                            <Table.Th onClick={() => toggleSort('id')}>id</Table.Th>
                            <Table.Th onClick={() => toggleSort('length')}>length</Table.Th>
                            <Table.Th onClick={() => toggleSort('width')}>width</Table.Th>
                            <Table.Th onClick={() => toggleSort('height')}>height</Table.Th>
                            <Table.Th onClick={() => toggleSort('volume')}>volume</Table.Th>
                            <Table.Th>delete</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            )}

            <Pagination value={page} onChange={setPage} total={totalPages} color="gray" />
        </>
    );
}

