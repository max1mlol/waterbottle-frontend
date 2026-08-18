import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createTheme, MantineProvider} from '@mantine/core';
import Home from "./Home.jsx";
import VendorList from "./VendorList.jsx";
import VendorDetail from "./VendorDetail.jsx";
import NotFound from "./NotFound.jsx";
import NavBar from "./NavBar.jsx";
import BottleList from "./BottleList.jsx";;
import BoxList from "./BoxList.jsx";
import {Notifications} from "@mantine/notifications";
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'gray',
});
export default function App() {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Vendor" element={<VendorList />} />
                    <Route path="/vendor/bottle/:id" element={<VendorDetail />} />
                    <Route path="/Bottle" element={<BottleList />} />
                    <Route path="/Box" element={<BoxList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Notifications />
        </MantineProvider>
        )
}