// src/components/VendorForm.jsx
import { Button, Group, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import Modal from './Modal';

export default function VendorForm({ title, initialValues, closeModal, onSubmit }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: initialValues?.name ?? '',
            // String(...) matters: the API sends registrationNumber as a number,
            // and hasLength checks .length, which numbers don't have.
            registrationNumber: String(initialValues?.registrationNumber ?? ''),
            contractSignedDate: initialValues?.contractSignedDate ?? '',
            contractEndDate: initialValues?.contractEndDate ?? '',
        },
        validate: {
            name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            registrationNumber: hasLength({ min: 2, max: 10 }, 'Registration Number must be 2-10 characters long'),
            contractSignedDate: hasLength({ min: 2, max: 100 }, 'Contract Signed Date must be 2-10 characters long'),
            contractEndDate: hasLength({ min: 2, max: 100 }, 'Contract End Date must be 2-10 characters long'),
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
                    key={form.key('contractEndDate')}
                    {...form.getInputProps('contractEndDate')}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">{title}</Button>
                </Group>
            </form>
        </Modal>
    );
}