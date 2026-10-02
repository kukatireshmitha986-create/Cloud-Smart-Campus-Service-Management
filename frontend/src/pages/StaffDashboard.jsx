import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function StaffDashboard() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const loadRequests = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/api/requests/staff/my`,
                { headers }
            );

            setRequests(response.data.requests || []);

        } catch (err) {
            console.error("Staff dashboard error:", err);

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
                "Unable to load assigned requests."
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

        loadRequests();
    }, []);

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
                `Request #${requestId} status updated to ${status}.`
            );

            await loadRequests();

        } catch (err) {
            console.error("Status update error:", err);

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

    const assignedPending = requests.filter(
        (request) =>
            request.status === "Pending" ||
            request.status === "Assigned"
    ).length;

    const inProgress = requests.filter(
        (request) => request.status === "In Progress"
    ).length;

    const completed = requests.filter(
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
                    Loading Staff Dashboard...
                </h5>

            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">

            {/* NAVBAR */}

            <nav className="navbar navbar-dark bg-primary shadow-sm">

                <div className="container">

                    <Link
                        to="/staff"
                        className="navbar-brand fw-bold"
                    >
                        Smart Campus
                    </Link>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-md-block">
                            Support Staff: {user.name || "Staff"}
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
                            Staff Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            Manage service requests assigned to you.
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary"
                        onClick={loadRequests}
                    >
                        Refresh
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

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            Assigned / Pending
                                        </p>

                                        <h2 className="fw-bold text-warning mb-0">
                                            {assignedPending}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        📋
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            In Progress
                                        </p>

                                        <h2 className="fw-bold text-primary mb-0">
                                            {inProgress}
                                        </h2>
                                    </div>

                                    <div className="fs-1">
                                        🔧
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p className="text-muted mb-1">
                                            Completed
                                        </p>

                                        <h2 className="fw-bold text-success mb-0">
                                            {completed}
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


                {/* ASSIGNED REQUESTS */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Assigned Service Requests
                                </h4>

                                <p className="text-muted mb-0">
                                    Requests currently assigned to your account.
                                </p>

                            </div>

                            <span className="badge bg-primary fs-6">
                                {requests.length} Requests
                            </span>

                        </div>


                        {requests.length === 0 ? (

                            <div className="text-center py-5">

                                <div className="fs-1 mb-3">
                                    📭
                                </div>

                                <h5 className="text-muted">
                                    No assigned requests
                                </h5>

                                <p className="text-muted mb-0">
                                    New requests assigned by the administrator
                                    will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Student</th>

                                            <th>Category</th>

                                            <th>Request</th>

                                            <th>Priority</th>

                                            <th>Status</th>

                                            <th>Location</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {requests.map((request) => (

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
                                                            {request.student_email}
                                                        </small>
                                                    )}

                                                </td>


                                                <td>
                                                    {request.category}
                                                </td>


                                                <td>

                                                    <div className="fw-semibold">
                                                        {request.title}
                                                    </div>

                                                    <small className="text-muted">
                                                        {request.description}
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


                                                <td>
                                                    {request.location ||
                                                        "Not specified"}
                                                </td>


                                                <td>

                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={request.status}
                                                        onChange={(e) =>
                                                            updateStatus(
                                                                request.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

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

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* WORKFLOW INFO */}

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-4">
                            Request Processing Workflow
                        </h5>

                        <div className="row text-center g-3">

                            <div className="col-md-3">

                                <div className="bg-light rounded p-3">

                                    <div className="fs-2">
                                        📥
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Assigned
                                    </h6>

                                    <small className="text-muted">
                                        Request received from administrator
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3">

                                    <div className="fs-2">
                                        🔧
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        In Progress
                                    </h6>

                                    <small className="text-muted">
                                        Staff is working on the issue
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3">

                                    <div className="fs-2">
                                        ✅
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Resolved
                                    </h6>

                                    <small className="text-muted">
                                        Service issue has been resolved
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="bg-light rounded p-3">

                                    <div className="fs-2">
                                        🔒
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Closed
                                    </h6>

                                    <small className="text-muted">
                                        Request lifecycle completed
                                    </small>

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

export default StaffDashboard;