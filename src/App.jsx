import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Booking from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
export default function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Dashboard />} />

                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="account" element={<Account />} />
                        <Route path="booking" element={<Booking />} />
                        <Route path="cabins" element={<Cabins />} />

                        <Route path="settings" element={<Settings />} />
                        <Route path="users" element={<Users />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
