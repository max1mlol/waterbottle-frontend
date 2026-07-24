import '@mantine/core/styles.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import Home from "./Home.jsx";
import VendorList from "./VendorList.jsx";
import VendorDetail from "./VendorDetail.jsx";

export default function App() {
    return (
        <MantineProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Vendor" element={<VendorList />} />
                    <Route path="/vendor/:id" element={<VendorDetail />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
        )
}