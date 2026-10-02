import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function StudentDashboard() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const [requestsResponse, notificationsResponse] =
                await Promise.all([
                    axios.get(`${API}/api/requests/my`, { headers }),
                    axios.get(`${API}/api/requests/notifications/my`, {
                        headers
                    })
                ]);

            setRequests(requestsResponse.data.requests || []);
            setNotifications(
                notificationsResponse.data.notifications || []
            );

        } catch (err) {
            console.error("Student dashboard error:", err);

            if (
                err.response?.status === 401 ||
                err.response?.status === 403
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.message ||
                "Unable to load dashboard."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        loadDashboard();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        (request) =>
            request.status === "Pending" ||
            request.status === "Assigned"
    ).length;

    const inProgressRequests = requests.filter(
        (request) => request.status === "In Progress"
    ).length;

    const completedRequests = requests.filter(
        (request) =>
            request.status === "Resolved" ||
            request.status === "Closed"
    ).length;

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark";

            case "Assigned":
                return "bg-info text-dark";

            case "In Progress":
                return "bg-primary";

            case "Resolved":
                return "bg-success";

            case "Closed":
                return "bg-dark";

            default:
                return "bg-secondary";
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "Critical":
                return "bg-danger";

            case "High":
                return "bg-warning text-dark";

            case "Medium":
                return "bg-info text-dark";

            case "Low":
                return "bg-success";

            default:
                return "bg-secondary";
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">
                    Loading Student Dashboard...
                </h5>

            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">

            {/* NAVBAR */}

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

                <div className="container">

                    <Link
                        to="/student"
                        className="navbar-brand fw-bold"
                    >
                        Smart Campus
                    </Link>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-md-block">
                            Welcome, {user.name || "Student"}
                        </span>

                        <button
                            className="btn btn-light btn-sm"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            {/* MAIN */}

            <div className="container py-4">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Student Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            Manage and track your campus service requests.
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary"
                        onClick={loadDashboard}
                    >
                        Refresh
                    </button>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}


                {/* QUICK ACTION */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h4 className="fw-bold">
                                    Need campus support?
                                </h4>

                                <p className="text-muted mb-md-0">
                                    Create a service request and track its
                                    progress from submission to resolution.
                                </p>

                            </div>

                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <Link
                                    to="/student/create-request"
                                    className="btn btn-primary px-4"
                                >
                                    + Create Request
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* STATISTICS */}

                <div className="row g-3 mb-4">

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            Total Requests
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {totalRequests}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        📋
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            Pending / Assigned
                                        </p>

                                        <h2 className="fw-bold text-warning mb-0">
                                            {pendingRequests}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        ⏳
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            In Progress
                                        </p>

                                        <h2 className="fw-bold text-primary mb-0">
                                            {inProgressRequests}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        🔧
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            Completed
                                        </p>

                                        <h2 className="fw-bold text-success mb-0">
                                            {completedRequests}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        ✅
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="row g-4">

                    {/* RECENT REQUESTS */}

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <h4 className="fw-bold mb-1">
                                            My Service Requests
                                        </h4>

                                        <p className="text-muted mb-0">
                                            Your latest campus service requests.
                                        </p>

                                    </div>

                                    <Link
                                        to="/student/my-requests"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View All
                                    </Link>

                                </div>


                                {requests.length === 0 ? (

                                    <div className="text-center py-5">

                                        <div className="fs-1 mb-3">
                                            📭
                                        </div>

                                        <h5 className="text-muted">
                                            No requests yet
                                        </h5>

                                        <p className="text-muted">
                                            Create your first campus service
                                            request.
                                        </p>

                                        <Link
                                            to="/student/create-request"
                                            className="btn btn-primary"
                                        >
                                            Create Request
                                        </Link>

                                    </div>

                                ) : (

                                    <div className="table-responsive">

                                        <table className="table align-middle">

                                            <thead>

                                                <tr>

                                                    <th>ID</th>

                                                    <th>Request</th>

                                                    <th>Priority</th>

                                                    <th>Status</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {requests
                                                    .slice(0, 5)
                                                    .map((request) => (

                                                        <tr key={request.id}>

                                                            <td className="fw-semibold">
                                                                #{request.id}
                                                            </td>

                                                            <td>

                                                                <div className="fw-semibold">
                                                                    {request.title}
                                                                </div>

                                                                <small className="text-muted">
                                                                    {request.category}
                                                                </small>

                                                            </td>

                                                            <td>

                                                                <span
                                                                    className={`badge ${getPriorityClass(
                                                                        request.priority
                                                                    )}`}
                                                                >
                                                                    {request.priority}
                                                                </span>

                                                            </td>

                                                            <td>

                                                                <span
                                                                    className={`badge ${getStatusClass(
                                                                        request.status
                                                                    )}`}
                                                                >
                                                                    {request.status}
                                                                </span>

                                                            </td>

                                                        </tr>

                                                    ))}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* NOTIFICATIONS */}

                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <h4 className="fw-bold mb-1">
                                            Notifications
                                        </h4>

                                        <p className="text-muted mb-0">
                                            Recent updates
                                        </p>

                                    </div>

                                    <span className="badge bg-primary">
                                        {notifications.length}
                                    </span>

                                </div>


                                {notifications.length === 0 ? (

                                    <div className="text-center py-4">

                                        <div className="fs-2 mb-2">
                                            🔔
                                        </div>

                                        <p className="text-muted mb-0">
                                            No notifications yet.
                                        </p>

                                    </div>

                                ) : (

                                    <div>

                                        {notifications
                                            .slice(0, 6)
                                            .map((notification, index) => (

                                                <div
                                                    key={
                                                        notification.id ||
                                                        index
                                                    }
                                                    className="border-bottom py-3"
                                                >

                                                    <div className="d-flex gap-2">

                                                        <span>
                                                            🔔
                                                        </span>

                                                        <div>

                                                            <p className="mb-1 small">
                                                                {notification.message}
                                                            </p>

                                                            {notification.created_at && (
                                                                <small className="text-muted">
                                                                    {new Date(
                                                                        notification.created_at
                                                                    ).toLocaleString()}
                                                                </small>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>


                {/* CAMPUS SERVICES */}

                <div className="mt-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <h4 className="fw-bold mb-4">
                                Campus Services
                            </h4>

                            <div className="row g-3">

                                <div className="col-6 col-md-3">

                                    <div className="bg-light rounded p-3 text-center">

                                        <div className="fs-2">
                                            🔧
                                        </div>

                                        <small className="fw-semibold">
                                            Maintenance
                                        </small>

                                    </div>

                                </div>


                                <div className="col-6 col-md-3">

                                    <div className="bg-light rounded p-3 text-center">

                                        <div className="fs-2">
                                            💻
                                        </div>

                                        <small className="fw-semibold">
                                            IT Support
                                        </small>

                                    </div>

                                </div>


                                <div className="col-6 col-md-3">

                                    <div className="bg-light rounded p-3 text-center">

                                        <div className="fs-2">
                                            🏠
                                        </div>

                                        <small className="fw-semibold">
                                            Hostel
                                        </small>

                                    </div>

                                </div>


                                <div className="col-6 col-md-3">

                                    <div className="bg-light rounded p-3 text-center">

                                        <div className="fs-2">
                                            🏫
                                        </div>

                                        <small className="fw-semibold">
                                            Infrastructure
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* FOOTER */}

            <footer className="bg-dark text-white py-3 mt-4">

                <div className="container text-center">

                    <small className="text-secondary">
                        Smart Campus Service Management System © 2026
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default StudentDashboard;