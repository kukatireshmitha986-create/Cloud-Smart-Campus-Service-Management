import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${API}/api/auth/login`,
                formData
            );

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "admin") {
                window.location.href = "/admin";
            } else if (user.role === "staff") {
                window.location.href = "/staff";
            } else {
                window.location.href = "/student";
            }

        } catch (err) {
            console.error("Login error:", err);

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
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
                        to="/register"
                        className="btn btn-light btn-sm"
                    >
                        Create Account
                    </Link>

                </div>

            </nav>


            {/* LOGIN SECTION */}

            <div className="container">

                <div className="row justify-content-center align-items-center min-vh-75 py-5">

                    <div className="col-md-7 col-lg-5">

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
                                🔐
                            </div>

                            <h2 className="fw-bold mt-3 mb-2">
                                Welcome Back
                            </h2>

                            <p className="text-muted">
                                Sign in to access your Smart Campus account.
                            </p>

                        </div>


                        {/* LOGIN CARD */}

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-md-5">

                                {error && (
                                    <div className="alert alert-danger">

                                        <strong>
                                            Login Failed
                                        </strong>

                                        <div className="mt-1">
                                            {error}
                                        </div>

                                    </div>
                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* EMAIL */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="email"
                                        />

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="current-password"
                                        />

                                    </div>


                                    {/* SUBMIT */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Signing In..."
                                            : "Sign In"}
                                    </button>

                                </form>


                                {/* REGISTER */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Don't have an account?
                                    </span>{" "}

                                    <Link
                                        to="/register"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Register here
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* DEMO ACCOUNTS */}

                        <div className="card border-0 shadow-sm mt-4">

                            <div className="card-body p-4">

                                <h6 className="fw-bold mb-3">
                                    Test Accounts
                                </h6>

                                <div className="table-responsive">

                                    <table className="table table-sm align-middle mb-0">

                                        <thead>

                                            <tr>
                                                <th>Role</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>

                                                <td>
                                                    <span className="badge bg-success">
                                                        Student
                                                    </span>
                                                </td>

                                                <td>
                                                    <small>
                                                        reshmitha@student.com
                                                    </small>
                                                </td>

                                                <td>
                                                    <small>
                                                        Student@123
                                                    </small>
                                                </td>

                                            </tr>


                                            <tr>

                                                <td>
                                                    <span className="badge bg-danger">
                                                        Admin
                                                    </span>
                                                </td>

                                                <td>
                                                    <small>
                                                        admin@smartcampus.com
                                                    </small>
                                                </td>

                                                <td>
                                                    <small>
                                                        Admin@123
                                                    </small>
                                                </td>

                                            </tr>


                                            <tr>

                                                <td>
                                                    <span className="badge bg-primary">
                                                        Staff
                                                    </span>
                                                </td>

                                                <td>
                                                    <small>
                                                        staff@smartcampus.com
                                                    </small>
                                                </td>

                                                <td>
                                                    <small>
                                                        Staff@123
                                                    </small>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>


                        {/* SECURITY INFO */}

                        <div className="text-center mt-4">

                            <small className="text-muted">
                                🔒 Your login credentials are securely
                                authenticated using JWT-based authentication.
                            </small>

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

export default Login;