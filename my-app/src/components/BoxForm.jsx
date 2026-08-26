// src/components/BoxForm.jsx
import {Button, Group, Pagination, Table, TextInput} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import Modal from './Modal';

export default function BoxForm({ title, initialValues, closeModal, onSubmit }) {
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

    return (
        <Modal closeModal={closeModal} title={title}>
            <form
                onSubmit={form.onSubmit((values) => {
                    onSubmit(values);
                    form.reset();
                })}
            >
                <TextInput
                    label="length"
                    withAsterisk
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
                    <Button type="submit">{title}</Button>
                </Group>
            </form>
        </Modal>
    );
}
