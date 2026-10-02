import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function CreateRequest() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        description: "",
        priority: "Medium",
        location: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await axios.post(
                `${API}/api/requests`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccess(
                "Your service request has been submitted successfully."
            );

            setFormData({
                category: "",
                title: "",
                description: "",
                priority: "Medium",
                location: ""
            });

        } catch (err) {
            console.error("Create request error:", err);

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
                "Unable to create service request."
            );

        } finally {
            setLoading(false);
        }
    };

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

                    <div className="d-flex gap-2">

                        <Link
                            to="/student"
                            className="btn btn-light btn-sm"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/student/my-requests"
                            className="btn btn-outline-light btn-sm"
                        >
                            My Requests
                        </Link>

                    </div>

                </div>

            </nav>


            {/* MAIN */}

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        {/* HEADER */}

                        <div className="text-center mb-4">

                            <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                CAMPUS SERVICE PORTAL
                            </span>

                            <h2 className="fw-bold mt-3">
                                Create Service Request
                            </h2>

                            <p className="text-muted">
                                Submit a campus issue and provide enough
                                information for the support team to resolve it.
                            </p>

                        </div>


                        {/* FORM CARD */}

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-md-5">

                                {success && (
                                    <div className="alert alert-success">

                                        <div className="fw-bold mb-1">
                                            Request Submitted Successfully
                                        </div>

                                        <div>
                                            {success}
                                        </div>

                                        <div className="mt-3">

                                            <Link
                                                to="/student/my-requests"
                                                className="btn btn-success btn-sm"
                                            >
                                                View My Requests
                                            </Link>

                                        </div>

                                    </div>
                                )}


                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* CATEGORY */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Service Category
                                        </label>

                                        <select
                                            name="category"
                                            className="form-select"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select a service category
                                            </option>

                                            <option value="Maintenance">
                                                🔧 Maintenance
                                            </option>

                                            <option value="IT Support">
                                                💻 IT Support
                                            </option>

                                            <option value="Hostel">
                                                🏠 Hostel
                                            </option>

                                            <option value="Infrastructure">
                                                🏫 Infrastructure
                                            </option>

                                            <option value="Electrical">
                                                ⚡ Electrical
                                            </option>

                                            <option value="Plumbing">
                                                🚰 Plumbing
                                            </option>

                                            <option value="Cleanliness">
                                                🧹 Cleanliness
                                            </option>

                                            <option value="Other">
                                                📌 Other
                                            </option>

                                        </select>

                                    </div>


                                    {/* TITLE */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Request Title
                                        </label>

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Example: Classroom fan not working"
                                            maxLength="150"
                                            required
                                        />

                                        <small className="text-muted">
                                            Give your issue a short and clear title.
                                        </small>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Detailed Description
                                        </label>

                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="5"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the issue clearly, including any important details..."
                                            maxLength="1000"
                                            required
                                        ></textarea>

                                        <small className="text-muted">
                                            Provide enough information to help
                                            the support staff understand the issue.
                                        </small>

                                    </div>


                                    {/* PRIORITY + LOCATION */}

                                    <div className="row">

                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Priority
                                            </label>

                                            <select
                                                name="priority"
                                                className="form-select"
                                                value={formData.priority}
                                                onChange={handleChange}
                                            >

                                                <option value="Low">
                                                    Low
                                                </option>

                                                <option value="Medium">
                                                    Medium
                                                </option>

                                                <option value="High">
                                                    High
                                                </option>

                                                <option value="Critical">
                                                    Critical
                                                </option>

                                            </select>

                                            <small className="text-muted">
                                                Select the urgency of the issue.
                                            </small>

                                        </div>


                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Location
                                            </label>

                                            <input
                                                type="text"
                                                name="location"
                                                className="form-control"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Example: Block A - Room 204"
                                                maxLength="200"
                                                required
                                            />

                                            <small className="text-muted">
                                                Specify where the issue occurred.
                                            </small>

                                        </div>

                                    </div>


                                    {/* PRIORITY GUIDE */}

                                    <div className="bg-light rounded p-3 mb-4">

                                        <h6 className="fw-bold mb-3">
                                            Priority Guide
                                        </h6>

                                        <div className="row g-2">

                                            <div className="col-sm-6 col-lg-3">

                                                <span className="badge bg-success me-2">
                                                    Low
                                                </span>

                                                <small>
                                                    Non-urgent
                                                </small>

                                            </div>


                                            <div className="col-sm-6 col-lg-3">

                                                <span className="badge bg-info text-dark me-2">
                                                    Medium
                                                </span>

                                                <small>
                                                    Normal
                                                </small>

                                            </div>


                                            <div className="col-sm-6 col-lg-3">

                                                <span className="badge bg-warning text-dark me-2">
                                                    High
                                                </span>

                                                <small>
                                                    Urgent
                                                </small>

                                            </div>


                                            <div className="col-sm-6 col-lg-3">

                                                <span className="badge bg-danger me-2">
                                                    Critical
                                                </span>

                                                <small>
                                                    Emergency
                                                </small>

                                            </div>

                                        </div>

                                    </div>


                                    {/* BUTTONS */}

                                    <div className="d-flex flex-column flex-sm-row gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Submitting..."
                                                : "Submit Service Request"}
                                        </button>

                                        <Link
                                            to="/student"
                                            className="btn btn-outline-secondary px-4"
                                        >
                                            Cancel
                                        </Link>

                                    </div>

                                </form>

                            </div>

                        </div>


                        {/* INFORMATION */}

                        <div className="card border-0 shadow-sm mt-4">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    What happens after submission?
                                </h5>

                                <div className="row g-3 mt-1">

                                    <div className="col-md-3">

                                        <div className="text-center">

                                            <div className="fs-2">
                                                📝
                                            </div>

                                            <small className="fw-semibold">
                                                Request Submitted
                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-md-3">

                                        <div className="text-center">

                                            <div className="fs-2">
                                                👨‍💼
                                            </div>

                                            <small className="fw-semibold">
                                                Admin Reviews
                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-md-3">

                                        <div className="text-center">

                                            <div className="fs-2">
                                                🛠️
                                            </div>

                                            <small className="fw-semibold">
                                                Staff Resolves
                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-md-3">

                                        <div className="text-center">

                                            <div className="fs-2">
                                                ✅
                                            </div>

                                            <small className="fw-semibold">
                                                Request Completed
                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* FOOTER */}

            <footer className="bg-dark text-white py-3">

                <div className="container text-center">

                    <small className="text-secondary">
                        Smart Campus Service Management System © 2026
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default CreateRequest;