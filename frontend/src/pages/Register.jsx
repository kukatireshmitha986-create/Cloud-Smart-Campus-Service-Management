import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        department: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                `${API}/api/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    department: formData.department
                }
            );

            setSuccess(
                "Your student account has been created successfully."
            );

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                department: ""
            });

        } catch (err) {
            console.error("Registration error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to create your account."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light">

            {/* NAVBAR */}

            <nav className="navbar navbar-dark bg-primary shadow-sm">

                <div className="container">

                    <Link
                        to="/"
                        className="navbar-brand fw-bold"
                    >
                        Smart Campus
                    </Link>

                    <Link
                        to="/login"
                        className="btn btn-light btn-sm"
                    >
                        Sign In
                    </Link>

                </div>

            </nav>


            {/* MAIN */}

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        {/* HEADER */}

                        <div className="text-center mb-4">

                            <div
                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    fontSize: "30px"
                                }}
                            >
                                🎓
                            </div>

                            <h2 className="fw-bold mt-3 mb-2">
                                Create Your Account
                            </h2>

                            <p className="text-muted">
                                Register as a student to access Smart Campus services.
                            </p>

                        </div>


                        {/* FORM CARD */}

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-md-5">

                                {success && (
                                    <div className="alert alert-success">

                                        <h6 className="fw-bold">
                                            Registration Successful
                                        </h6>

                                        <p className="mb-3">
                                            {success}
                                        </p>

                                        <Link
                                            to="/login"
                                            className="btn btn-success btn-sm"
                                        >
                                            Continue to Login
                                        </Link>

                                    </div>
                                )}


                                {error && (
                                    <div className="alert alert-danger">

                                        <strong>
                                            Registration Failed
                                        </strong>

                                        <div className="mt-1">
                                            {error}
                                        </div>

                                    </div>
                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* PERSONAL INFORMATION */}

                                    <h5 className="fw-bold mb-3">
                                        Personal Information
                                    </h5>

                                    <div className="row">

                                        {/* NAME */}

                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                maxLength="100"
                                                autoComplete="name"
                                            />

                                        </div>


                                        {/* PHONE */}

                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                maxLength="15"
                                                autoComplete="tel"
                                            />

                                        </div>


                                        {/* EMAIL */}

                                        <div className="col-12 mb-4">

                                            <label className="form-label fw-semibold">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your college email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                autoComplete="email"
                                            />

                                        </div>


                                        {/* DEPARTMENT */}

                                        <div className="col-12 mb-4">

                                            <label className="form-label fw-semibold">
                                                Department
                                            </label>

                                            <select
                                                name="department"
                                                className="form-select"
                                                value={formData.department}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="">
                                                    Select your department
                                                </option>

                                                <option value="AI & DS">
                                                    Artificial Intelligence & Data Science
                                                </option>

                                                <option value="CSE">
                                                    Computer Science & Engineering
                                                </option>

                                                <option value="ECE">
                                                    Electronics & Communication Engineering
                                                </option>

                                                <option value="EEE">
                                                    Electrical & Electronics Engineering
                                                </option>

                                                <option value="IT">
                                                    Information Technology
                                                </option>

                                                <option value="Mechanical">
                                                    Mechanical Engineering
                                                </option>

                                                <option value="Civil">
                                                    Civil Engineering
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* ACCOUNT SECURITY */}

                                    <h5 className="fw-bold mb-3">
                                        Account Security
                                    </h5>

                                    <div className="row">

                                        {/* PASSWORD */}

                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Password
                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength="6"
                                                autoComplete="new-password"
                                            />

                                            <small className="text-muted">
                                                Minimum 6 characters.
                                            </small>

                                        </div>


                                        {/* CONFIRM PASSWORD */}

                                        <div className="col-md-6 mb-4">

                                            <label className="form-label fw-semibold">
                                                Confirm Password
                                            </label>

                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                className="form-control"
                                                placeholder="Re-enter your password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                minLength="6"
                                                autoComplete="new-password"
                                            />

                                        </div>

                                    </div>


                                    {/* ROLE INFORMATION */}

                                    <div className="alert alert-primary">

                                        <div className="fw-bold mb-1">
                                            Student Account
                                        </div>

                                        <small>
                                            New registrations are created as
                                            student accounts. Administrator
                                            and support staff accounts are
                                            managed separately by the system.
                                        </small>

                                    </div>


                                    {/* SUBMIT */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating Account..."
                                            : "Create Student Account"}
                                    </button>

                                </form>


                                {/* LOGIN LINK */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Already have an account?
                                    </span>{" "}

                                    <Link
                                        to="/login"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Sign in here
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* FEATURES */}

                        <div className="row g-3 mt-4">

                            <div className="col-md-4">

                                <div className="card border-0 shadow-sm h-100 text-center">

                                    <div className="card-body">

                                        <div className="fs-2">
                                            🔐
                                        </div>

                                        <h6 className="fw-bold mt-2">
                                            Secure Login
                                        </h6>

                                        <small className="text-muted">
                                            Protected authentication for your account.
                                        </small>

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-4">

                                <div className="card border-0 shadow-sm h-100 text-center">

                                    <div className="card-body">

                                        <div className="fs-2">
                                            📝
                                        </div>

                                        <h6 className="fw-bold mt-2">
                                            Service Requests
                                        </h6>

                                        <small className="text-muted">
                                            Report and track campus issues easily.
                                        </small>

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-4">

                                <div className="card border-0 shadow-sm h-100 text-center">

                                    <div className="card-body">

                                        <div className="fs-2">
                                            🔔
                                        </div>

                                        <h6 className="fw-bold mt-2">
                                            Notifications
                                        </h6>

                                        <small className="text-muted">
                                            Stay informed about request updates.
                                        </small>

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
                        Cloud-Based Smart Campus Service Management System © 2026
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default Register;