// src/components/VendorForm.jsx
import {Button, Group, Pagination, Paper, Select, Table, TextInput} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import Modal from './Modal';

export default function BottleForm({ title, initialValues, closeModal, onSubmit, vendors }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            vendorId: initialValues?.vendorId ?? '',
            brand: initialValues?.brand ?? '',
            capacity: initialValues?.capacity ?? '',
            barcode: initialValues?.barcode ?? ''
        },
        validate: {
            vendorId: '',
            brand: hasLength({ min: 1, max: 10 }, 'Brand must be 1-10 characters long'),
            capacity: (value) => {return Number(value) > 0 ? null : "Capacity must be greater than 0"},
            barcode: hasLength({ min: 2, max: 100 }, 'Barcode must be 2-10 characters long'),
        },
    });

    return (
        <Modal closeModal={closeModal} title={title}>
            <form
                onSubmit={form.onSubmit((values) => {
                    onSubmit(values);
                    form.reset();
                    closeModal();
                })}
            >
                <Select
                    label="Vendor"
                    withAsterisk
                    data={
                        vendors.map(vendor => ({
                            value: vendor.id.toString(),
                            label: vendor.name,
                        }))
                    }
                    key={form.key('vendorId')}
                    {...form.getInputProps('vendorId')}
                />
                <TextInput
                    label="Brand"
                    withAsterisk
                    mt="md"
                    key={form.key('brand')}
                    {...form.getInputProps('brand')}
                />
                <TextInput
                    label="Capacity"
                    withAsterisk
                    mt="md"
                    key={form.key('capacity')}
                    {...form.getInputProps('capacity')}
                />
                <TextInput
                    label="Barcode"
                    withAsterisk
                    mt="md"
                    key={form.key('barcode')}
                    {...form.getInputProps('barcode')}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">{title}</Button>
                </Group>
            </form>
        </Modal>
    );
}