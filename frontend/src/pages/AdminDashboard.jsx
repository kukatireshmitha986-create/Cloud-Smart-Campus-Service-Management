import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function AdminDashboard() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [staff, setStaff] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        assigned: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("All");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const [requestsResponse, statsResponse, staffResponse] =
                await Promise.all([
                    axios.get(`${API}/api/requests/admin/all`, {
                        headers
                    }),
                    axios.get(`${API}/api/requests/admin/dashboard`, {
                        headers
                    }),
                    axios.get(`${API}/api/users/staff`, {
                        headers
                    })
                ]);

            setRequests(requestsResponse.data.requests || []);
            setStats(statsResponse.data.stats || {});
            setStaff(staffResponse.data.staff || []);

        } catch (err) {
            console.error("Admin dashboard error:", err);

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
                "Unable to load admin dashboard."
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

    const assignRequest = async (requestId, staffId) => {
        if (!staffId) return;

        try {
            setError("");
            setMessage("");

            await axios.put(
                `${API}/api/requests/${requestId}/assign`,
                {
                    staff_id: Number(staffId)
                },
                { headers }
            );

            setMessage(
                `Request #${requestId} assigned successfully.`
            );

            await loadDashboard();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to assign request."
            );
        }
    };

    const updateStatus = async (requestId, status) => {
        try {
            setError("");
            setMessage("");

            await axios.put(
                `${API}/api/requests/${requestId}/status`,
                { status },
                { headers }
            );

            setMessage(
                `Request #${requestId} updated to ${status}.`
            );

            await loadDashboard();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to update request status."
            );
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

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

    const filteredRequests =
        filter === "All"
            ? requests
            : requests.filter(
                (request) => request.status === filter
            );

    if (loading) {
        return (
            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">
                    Loading Admin Dashboard...
                </h5>

            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">

            {/* NAVBAR */}

            <nav className="navbar navbar-dark bg-primary shadow-sm">

                <div className="container-fluid px-4">

                    <Link
                        to="/admin"
                        className="navbar-brand fw-bold"
                    >
                        Smart Campus
                    </Link>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-md-block">
                            Administrator: {user.name || "Admin"}
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

            <div className="container-fluid px-4 py-4">

                {/* HEADER */}

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Admin Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            Monitor and manage campus service requests.
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary mt-3 mt-md-0"
                        onClick={loadDashboard}
                    >
                        🔄 Refresh Dashboard
                    </button>

                </div>


                {/* ALERTS */}

                {message && (
                    <div className="alert alert-success">
                        {message}

                        <button
                            className="btn-close float-end"
                            onClick={() => setMessage("")}
                        ></button>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}

                        <button
                            className="btn-close float-end"
                            onClick={() => setError("")}
                        ></button>
                    </div>
                )}


                {/* STATISTICS */}

                <div className="row g-3 mb-4">

                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Total Requests
                                </small>

                                <h2 className="fw-bold mt-2 mb-0">
                                    {stats.total || 0}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Pending
                                </small>

                                <h2 className="fw-bold text-warning mt-2 mb-0">
                                    {stats.pending || 0}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Assigned
                                </small>

                                <h2 className="fw-bold text-info mt-2 mb-0">
                                    {stats.assigned || 0}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    In Progress
                                </small>

                                <h2 className="fw-bold text-primary mt-2 mb-0">
                                    {stats.in_progress || 0}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Resolved
                                </small>

                                <h2 className="fw-bold text-success mt-2 mb-0">
                                    {stats.resolved || 0}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-4 col-xl-2">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Closed
                                </small>

                                <h2 className="fw-bold mt-2 mb-0">
                                    {stats.closed || 0}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* MANAGEMENT OVERVIEW */}

                <div className="row g-4 mb-4">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h5 className="fw-bold mb-1">
                                            Request Management
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Review, assign and track campus requests.
                                        </p>

                                    </div>

                                    <span className="badge bg-primary fs-6">
                                        {requests.length} Total
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    Support Staff
                                </h5>

                                <p className="text-muted">
                                    Registered campus support staff
                                </p>

                                <h2 className="fw-bold text-primary mb-0">
                                    {staff.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* REQUEST TABLE */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        {/* TABLE HEADER */}

                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Service Requests
                                </h4>

                                <p className="text-muted mb-0">
                                    Manage all student service requests.
                                </p>

                            </div>

                            <div className="mt-3 mt-md-0">

                                <select
                                    className="form-select"
                                    value={filter}
                                    onChange={(e) =>
                                        setFilter(e.target.value)
                                    }
                                >

                                    <option value="All">
                                        All Requests
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Assigned">
                                        Assigned
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Resolved">
                                        Resolved
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                </select>

                            </div>

                        </div>


                        {filteredRequests.length === 0 ? (

                            <div className="text-center py-5">

                                <div className="fs-1 mb-3">
                                    📭
                                </div>

                                <h5 className="text-muted">
                                    No requests found
                                </h5>

                                <p className="text-muted mb-0">
                                    There are no requests matching the
                                    selected filter.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Student</th>

                                            <th>Request</th>

                                            <th>Priority</th>

                                            <th>Status</th>

                                            <th>Assigned Staff</th>

                                            <th>Update</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredRequests.map(
                                            (request) => (

                                                <tr key={request.id}>

                                                    <td className="fw-bold">
                                                        #{request.id}
                                                    </td>


                                                    <td>

                                                        <div className="fw-semibold">
                                                            {request.student_name ||
                                                                request.name ||
                                                                "Student"}
                                                        </div>

                                                        {request.student_email && (
                                                            <small className="text-muted">
                                                                {
                                                                    request.student_email
                                                                }
                                                            </small>
                                                        )}

                                                    </td>


                                                    <td>

                                                        <div className="fw-semibold">
                                                            {request.title}
                                                        </div>

                                                        <small className="text-muted">
                                                            {
                                                                request.category
                                                            }
                                                        </small>

                                                        <br />

                                                        <small className="text-secondary">
                                                            {
                                                                request.location ||
                                                                "No location"
                                                            }
                                                        </small>

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`badge ${getPriorityClass(
                                                                request.priority
                                                            )}`}
                                                        >
                                                            {
                                                                request.priority
                                                            }
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


                                                    <td>

                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={
                                                                request.assigned_to ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                assignRequest(
                                                                    request.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="">
                                                                Assign Staff
                                                            </option>

                                                            {staff.map(
                                                                (person) => (

                                                                    <option
                                                                        key={
                                                                            person.id
                                                                        }
                                                                        value={
                                                                            person.id
                                                                        }
                                                                    >
                                                                        {
                                                                            person.name
                                                                        }
                                                                    </option>

                                                                )
                                                            )}

                                                        </select>

                                                    </td>


                                                    <td>

                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={
                                                                request.status
                                                            }
                                                            onChange={(e) =>
                                                                updateStatus(
                                                                    request.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="Pending">
                                                                Pending
                                                            </option>

                                                            <option value="Assigned">
                                                                Assigned
                                                            </option>

                                                            <option value="In Progress">
                                                                In Progress
                                                            </option>

                                                            <option value="Resolved">
                                                                Resolved
                                                            </option>

                                                            <option value="Closed">
                                                                Closed
                                                            </option>

                                                        </select>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ADMIN RESPONSIBILITIES */}

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-4">
                            Administrator Responsibilities
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-3">

                                <div className="bg-light rounded p-3 text-center">

                                    <div className="fs-2">
                                        📋
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Monitor
                                    </h6>

                                    <small className="text-muted">
                                        Monitor all campus requests
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3 text-center">

                                    <div className="fs-2">
                                        👨‍🔧
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Assign
                                    </h6>

                                    <small className="text-muted">
                                        Assign requests to support staff
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3 text-center">

                                    <div className="fs-2">
                                        📊
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Analyze
                                    </h6>

                                    <small className="text-muted">
                                        Track service request statistics
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3 text-center">

                                    <div className="fs-2">
                                        ✅
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Resolve
                                    </h6>

                                    <small className="text-muted">
                                        Monitor request completion
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* FOOTER */}

            <footer className="bg-dark text-white py-3 mt-4">

                <div className="container-fluid text-center">

                    <small className="text-secondary">
                        Cloud-Based Smart Campus Service Management System © 2026
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default AdminDashboard;