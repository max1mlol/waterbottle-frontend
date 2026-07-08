import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import VendorList from "./VendorList.jsx";

export default function App() {
    return <MantineProvider>{
        <>
            <VendorList />
        </>
    }</MantineProvider>;
}
