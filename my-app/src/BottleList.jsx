import { useState } from 'react';
import {Button, Group, Loader, Pagination, Paper, Select, Table, TextInput} from '@mantine/core';
import BottleForm from './components/BottleForm';
import useBottles from './hooks/useBottles';

export default function BottleList() {
    const {
        bottles, vendors, totalPages, page, setPage, loading,
        toggleSort, filters, setFilters, clearFilter,
        create, update, remove,
    } = useBottles();

    // null = no form open, 'create' = create mode, a bottle object = edit mode
    const [formState, setFormState] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const rows = bottles.map((bottle) => (
        <Table.Tr key={bottle.id}>
            <Table.Td>
                <Button onClick={() => setFormState(bottle)}>Update</Button>
            </Table.Td>
            <Table.Td>{bottle.id}</Table.Td>
            <Table.Td>{bottle.brand}</Table.Td>
            <Table.Td>{bottle.capacity}</Table.Td>
            <Table.Td>{bottle.barcode}</Table.Td>
            <Table.Td>{bottle.vendorId}</Table.Td>
            <Table.Td>{bottle.vendorName}</Table.Td>
            <Table.Td>
                <Button onClick={() => remove(bottle.id)}>Delete</Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Group>
                <Button onClick={() => setFormState('create')}>Create Bottle</Button>
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
                            onChange={(e) => setFilters({...filters, filterBy: e.currentTarget.value})}
                        />
                        <TextInput
                            label="filterVal"
                            value={filters.filterVal}
                            onChange={(e) => setFilters({...filters, filterVal: e.currentTarget.value})}
                        />
                    </Group>
                </Paper>
            )}

            {formState === 'create' && (
                <BottleForm
                    title="Create Bottle"
                    closeModal={() => setFormState(null)}
                    onSubmit={create}
                    vendors={vendors}
                />
            )}
            {formState && formState !== 'create' && (
                <BottleForm
                    title="Update Bottle"
                    initialValues={formState}
                    closeModal={() => setFormState(null)}
                    onSubmit={(values) => update(formState.id, values)}
                    vendors={vendors}
                />
            )}

            {loading ? (
                <Loader mt="xl"/>
            ) : (
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>update</Table.Th>
                            <Table.Th onClick={() => toggleSort('id')}>id</Table.Th>
                            <Table.Th onClick={() => toggleSort('brand')}>brand</Table.Th>
                            <Table.Th onClick={() => toggleSort('capacity')}>capacity</Table.Th>
                            <Table.Th onClick={() => toggleSort('barcode')}>barcode</Table.Th>
                            <Table.Th onClick={() => toggleSort('vendorId')}>vendorId</Table.Th>
                            <Table.Th onClick={() => toggleSort('vendorName')}>vendorName</Table.Th>
                            <Table.Th>delete</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            )}

            <Pagination value={page} onChange={setPage} total={totalPages} color="gray"/>
        </>
    );
}