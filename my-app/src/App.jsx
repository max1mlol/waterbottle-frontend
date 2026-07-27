import '@mantine/core/styles.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import Home from "./Home.jsx";
import VendorList from "./VendorList.jsx";
import VendorDetail from "./VendorDetail.jsx";
import NotFound from "./NotFound.jsx";
import NavBar from "./NavBar.jsx";
import BottleList from "./BottleList.jsx";


export default function App() {
    return (
        <MantineProvider>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Vendor" element={<VendorList />} />
                    <Route path="/Vendor/:id" element={<VendorDetail />} />
                    <Route path="/Bottle" element={<BottleList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
        )
}