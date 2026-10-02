import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function MyRequests() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("All");

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
                `${API}/api/requests/my`,
                { headers }
            );

            setRequests(response.data.requests || []);

        } catch (err) {
            console.error("My requests error:", err);

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
                "Unable to load your requests."
            );

        } finally {
            setLoading(false);
        }
    };

    const viewHistory = async (request) => {
        try {
            setSelectedRequest(request);
            setHistory([]);
            setHistoryLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/api/requests/${request.id}/history`,
                { headers }
            );

            setHistory(response.data.history || []);

        } catch (err) {
            console.error("History error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load request history."
            );

        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        loadRequests();
    }, []);

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

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">
                    Loading Your Requests...
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
                        to="/student"
                        className="navbar-brand fw-bold"
                    >
                        Smart Campus
                    </Link>

                    <div className="d-flex align-items-center gap-2">

                        <Link
                            to="/student"
                            className="btn btn-light btn-sm"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/student/create-request"
                            className="btn btn-outline-light btn-sm"
                        >
                            + New Request
                        </Link>

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

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            My Service Requests
                        </h2>

                        <p className="text-muted mb-0">
                            Track and monitor all your campus service requests.
                        </p>

                    </div>

                    <button
                        className="btn btn-outline-primary mt-3 mt-md-0"
                        onClick={loadRequests}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* USER INFO */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h5 className="fw-bold mb-1">
                                    Welcome, {user.name || "Student"}
                                </h5>

                                <p className="text-muted mb-0">
                                    {user.email || "Student Account"}
                                </p>

                            </div>

                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <Link
                                    to="/student/create-request"
                                    className="btn btn-primary"
                                >
                                    Create New Request
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ERROR */}

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

                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Total Requests
                                </small>

                                <h2 className="fw-bold text-primary mt-2 mb-0">
                                    {totalRequests}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Pending / Assigned
                                </small>

                                <h2 className="fw-bold text-warning mt-2 mb-0">
                                    {pendingRequests}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    In Progress
                                </small>

                                <h2 className="fw-bold text-info mt-2 mb-0">
                                    {inProgressRequests}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Completed
                                </small>

                                <h2 className="fw-bold text-success mt-2 mb-0">
                                    {completedRequests}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* REQUEST TABLE */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Request History
                                </h4>

                                <p className="text-muted mb-0">
                                    View the current status and progress of your requests.
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
                                    No service requests found
                                </h5>

                                <p className="text-muted">
                                    Create your first campus service request.
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

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Request</th>

                                            <th>Category</th>

                                            <th>Priority</th>

                                            <th>Status</th>

                                            <th>Location</th>

                                            <th>Created</th>

                                            <th>Action</th>

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
                                                            {request.title}
                                                        </div>

                                                        <small className="text-muted">
                                                            {request.description
                                                                ? request.description.length > 50
                                                                    ? `${request.description.substring(
                                                                        0,
                                                                        50
                                                                    )}...`
                                                                    : request.description
                                                                : "No description"}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        <span className="badge bg-light text-dark border">
                                                            {request.category}
                                                        </span>
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

                                                        <small>
                                                            📍{" "}
                                                            {request.location ||
                                                                "Not specified"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small className="text-muted">
                                                            {formatDate(
                                                                request.created_at
                                                            )}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                viewHistory(
                                                                    request
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </button>

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


                {/* REQUEST DETAILS */}

                {selectedRequest && (

                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <span className="badge bg-primary mb-2">
                                        Request #{selectedRequest.id}
                                    </span>

                                    <h4 className="fw-bold">
                                        {selectedRequest.title}
                                    </h4>

                                </div>

                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() =>
                                        setSelectedRequest(null)
                                    }
                                >
                                    Close
                                </button>

                            </div>


                            <hr />


                            <div className="row g-4">

                                <div className="col-md-6">

                                    <h6 className="fw-bold">
                                        Request Information
                                    </h6>

                                    <p className="mb-2">
                                        <strong>Category:</strong>{" "}
                                        {selectedRequest.category}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Priority:</strong>{" "}

                                        <span
                                            className={`badge ${getPriorityClass(
                                                selectedRequest.priority
                                            )}`}
                                        >
                                            {selectedRequest.priority}
                                        </span>

                                    </p>

                                    <p className="mb-2">
                                        <strong>Status:</strong>{" "}

                                        <span
                                            className={`badge ${getStatusClass(
                                                selectedRequest.status
                                            )}`}
                                        >
                                            {selectedRequest.status}
                                        </span>

                                    </p>

                                    <p className="mb-2">
                                        <strong>Location:</strong>{" "}
                                        {selectedRequest.location ||
                                            "Not specified"}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Created:</strong>{" "}
                                        {formatDate(
                                            selectedRequest.created_at
                                        )}
                                    </p>

                                </div>


                                <div className="col-md-6">

                                    <h6 className="fw-bold">
                                        Description
                                    </h6>

                                    <div className="bg-light rounded p-3">
                                        {selectedRequest.description}
                                    </div>

                                </div>

                            </div>


                            {/* HISTORY */}

                            <div className="mt-4">

                                <h6 className="fw-bold mb-3">
                                    Request Progress
                                </h6>


                                {historyLoading ? (

                                    <div className="text-center py-3">

                                        <div className="spinner-border spinner-border-sm text-primary"></div>

                                        <span className="ms-2">
                                            Loading history...
                                        </span>

                                    </div>

                                ) : history.length === 0 ? (

                                    <div className="alert alert-light border">
                                        No status updates have been recorded yet.
                                    </div>

                                ) : (

                                    <div className="list-group">

                                        {history.map(
                                            (item, index) => (

                                                <div
                                                    className="list-group-item"
                                                    key={`${item.created_at}-${index}`}
                                                >

                                                    <div className="d-flex justify-content-between align-items-start">

                                                        <div>

                                                            <div className="fw-semibold">

                                                                {item.old_status ? (
                                                                    <>
                                                                        {item.old_status}
                                                                        {" → "}
                                                                        {item.new_status}
                                                                    </>
                                                                ) : (
                                                                    item.new_status
                                                                )}

                                                            </div>

                                                            {item.comment && (
                                                                <div className="text-muted small mt-1">
                                                                    {item.comment}
                                                                </div>
                                                            )}

                                                        </div>

                                                        <small className="text-muted">
                                                            {formatDate(
                                                                item.created_at
                                                            )}
                                                        </small>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* WORKFLOW */}

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-4">
                            Service Request Workflow
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-3">

                                <div className="text-center">

                                    <div className="fs-1">
                                        📝
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Submitted
                                    </h6>

                                    <small className="text-muted">
                                        Student creates a request
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="text-center">

                                    <div className="fs-1">
                                        👨‍💼
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Assigned
                                    </h6>

                                    <small className="text-muted">
                                        Admin assigns support staff
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="text-center">

                                    <div className="fs-1">
                                        🛠️
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        In Progress
                                    </h6>

                                    <small className="text-muted">
                                        Staff works on the issue
                                    </small>

                                </div>

                            </div>


                            <div className="col-md-3">

                                <div className="text-center">

                                    <div className="fs-1">
                                        ✅
                                    </div>

                                    <h6 className="fw-bold mt-2">
                                        Completed
                                    </h6>

                                    <small className="text-muted">
                                        Request is resolved or closed
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
                        Cloud-Based Smart Campus Service Management System © 2026
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default MyRequests;