import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import CreateRequest from "./pages/CreateRequest";
import MyRequests from "./pages/MyRequests";

import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

import "./App.css";


function ProtectedRoute({
    children,
    role
}) {

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user") || "null"
        );

    if (!token || !user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        role &&
        user.role !== role
    ) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* STUDENT */}

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute role="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/create-request"
                    element={
                        <ProtectedRoute role="student">
                            <CreateRequest />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/my-requests"
                    element={
                        <ProtectedRoute role="student">
                            <MyRequests />
                        </ProtectedRoute>
                    }
                />


                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* STAFF */}

                <Route
                    path="/staff"
                    element={
                        <ProtectedRoute role="staff">
                            <StaffDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* UNKNOWN ROUTES */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;