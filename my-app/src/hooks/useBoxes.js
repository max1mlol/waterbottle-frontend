// src/hooks/useVendors.js
import { useEffect, useState } from 'react';
import { createBox, deleteBox, getBoxes, updateBox } from '../api';

const PAGE_SIZE = 5;

export default function useBoxes() {
    const [boxes, setBoxes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [filters, setFilters] = useState({ filterBy: '', filterVal: '' });
    const [loading, setLoading] = useState(false);

    // Load the current page from the backend.
    async function refresh() {
        setLoading(true);
        try {
            const result = await getBoxes({
                page: page - 1,
                pageSize: PAGE_SIZE,
                sortBy,
                sortMode: order,
                filterBy: filters.filterBy,
                filterVal: filters.filterVal,
            });
            setBoxes(result.data);
            setTotalPages(Math.ceil(result.total / PAGE_SIZE));
        } finally {
            setLoading(false);
        }
    }

    // Reload whenever the page, sort, or filter changes.
    useEffect(() => {
        refresh();
        // oxlint may warn that refresh() is missing from this list — that's
        // expected. We want refresh to run when these *values* change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sortBy, order, filters]);

    function toggleSort(column) {
        if (sortBy === column) {
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(column);
            setOrder('ASC');
        }
        setPage(1);
    }

    // Create, update, delete: talk to the backend, then reload the list.
    // The server is the source of truth — never guess the list shape by hand.
    async function create(values) {
        await createBox(values);
        await refresh();
    }

    async function update(id, values) {
        await updateBox(id, values);
        await refresh();
    }

    async function remove(id) {
        await deleteBox(id);
        await refresh();
    }

    function clearFilter() {
        setFilters({ filterBy: '', filterVal: '' });
        setPage(1);
    }

    return {
        boxes,
        totalPages,
        page,
        setPage,
        loading,
        toggleSort,
        filters,
        setFilters,
        clearFilter,
        create,
        update,
        remove,
    };
}