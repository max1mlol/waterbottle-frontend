// src/pages/BoxList.jsx
import { useState } from 'react';
import { Button, Group, Loader, Pagination, Paper, Table, TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import VendorForm from '../components/VendorForm';
import useVendors from '../hooks/useVendors';

export default function VendorList() {
    const {
        vendors, totalPages, page, setPage, loading,
        toggleSort, filters, setFilters, clearFilter,
        create, update, remove,
    } = useVendors();

    // null = no form open, 'create' = create mode, a vendor object = edit mode
    const [formState, setFormState] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const rows = vendors.map((vendor) => (
        <Table.Tr key={vendor.id}>
            <Table.Td>
                <Button onClick={() => setFormState(vendor)}>Update</Button>
            </Table.Td>
            <Table.Td><Link to={`/vendors/${vendor.id}/bottles`}>{vendor.id}</Link></Table.Td>
            <Table.Td>{vendor.name}</Table.Td>
            <Table.Td>{vendor.registrationNumber}</Table.Td>
            <Table.Td>{dayjs(vendor.contractSignedDate).format('YYYY-MM-DD')}</Table.Td>
            <Table.Td>{dayjs(vendor.contractEndDate).format('YYYY-MM-DD')}</Table.Td>
            <Table.Td>
                <Button onClick={() => remove(vendor.id)}>Delete</Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Group>
                <Button onClick={() => setFormState('create')}>Create Vendor</Button>
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
                <VendorForm
                    title="Create Vendor"
                    closeModal={() => setFormState(null)}
                    onSubmit={create}
                />
            )}
            {formState && formState !== 'create' && (
                <VendorForm
                    title="Update Vendor"
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
                            <Table.Th onClick={() => toggleSort('name')}>name</Table.Th>
                            <Table.Th onClick={() => toggleSort('registrationNumber')}>registrationNumber</Table.Th>
                            <Table.Th onClick={() => toggleSort('contractSignedDate')}>contractSignedDate</Table.Th>
                            <Table.Th onClick={() => toggleSort('contractEndDate')}>contractEndDate</Table.Th>
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