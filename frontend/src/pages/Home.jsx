import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg-light min-vh-100">

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container">

                    <Link
                        to="/"
                        className="navbar-brand fw-bold fs-4"
                    >
                        Smart Campus
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="mainNavbar"
                    >

                        <ul className="navbar-nav ms-auto align-items-lg-center">

                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link active"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/login"
                                    className="nav-link"
                                >
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item ms-lg-2">
                                <Link
                                    to="/register"
                                    className="btn btn-light text-primary fw-semibold px-4"
                                >
                                    Register
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>


            {/* HERO SECTION */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center py-5">

                        <div className="col-lg-7">

                            <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                                Cloud-Based Campus Management
                            </span>

                            <h1 className="display-4 fw-bold mb-4">
                                Smart Campus Service
                                <span className="text-primary">
                                    {" "}Management System
                                </span>
                            </h1>

                            <p className="lead text-secondary mb-4">
                                A centralized digital platform for students,
                                administrators, and campus support staff to
                                create, manage, assign, track, and resolve
                                campus service requests efficiently.
                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    to="/login"
                                    className="btn btn-primary btn-lg px-4"
                                >
                                    Login to Portal
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-outline-primary btn-lg px-4"
                                >
                                    Create Account
                                </Link>

                            </div>

                        </div>


                        <div className="col-lg-5 mt-5 mt-lg-0">

                            <div className="card border-0 shadow-lg">

                                <div className="card-body p-4">

                                    <div className="text-center mb-4">

                                        <div
                                            className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                                            style={{
                                                width: "80px",
                                                height: "80px"
                                            }}
                                        >
                                            <span className="fs-1">
                                                🏫
                                            </span>
                                        </div>

                                        <h3 className="fw-bold mt-3">
                                            Smart Campus
                                        </h3>

                                        <p className="text-muted mb-0">
                                            One platform for campus services
                                        </p>

                                    </div>


                                    <div className="row g-3">

                                        <div className="col-6">
                                            <div className="bg-light rounded p-3 text-center">
                                                <div className="fs-3">
                                                    🎓
                                                </div>
                                                <small className="fw-semibold">
                                                    Students
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="bg-light rounded p-3 text-center">
                                                <div className="fs-3">
                                                    👨‍💼
                                                </div>
                                                <small className="fw-semibold">
                                                    Admin
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="bg-light rounded p-3 text-center">
                                                <div className="fs-3">
                                                    🛠️
                                                </div>
                                                <small className="fw-semibold">
                                                    Support Staff
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="bg-light rounded p-3 text-center">
                                                <div className="fs-3">
                                                    ☁️
                                                </div>
                                                <small className="fw-semibold">
                                                    Cloud Ready
                                                </small>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="py-5 bg-white">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="text-primary fw-semibold">
                            PLATFORM FEATURES
                        </span>

                        <h2 className="fw-bold mt-2">
                            Everything in One Campus Portal
                        </h2>

                        <p className="text-muted">
                            Designed to simplify campus service management
                            through a centralized digital platform.
                        </p>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        📝
                                    </div>

                                    <h5 className="fw-bold">
                                        Service Requests
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Students can submit maintenance,
                                        infrastructure, IT, hostel, and
                                        other campus service requests.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        👨‍💼
                                    </div>

                                    <h5 className="fw-bold">
                                        Admin Management
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Administrators can monitor requests,
                                        assign staff, and manage service
                                        request statuses.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        🛠️
                                    </div>

                                    <h5 className="fw-bold">
                                        Staff Workflow
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Support staff can view assigned
                                        requests and update progress until
                                        completion.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        🔔
                                    </div>

                                    <h5 className="fw-bold">
                                        Notifications
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Users receive updates when requests
                                        are assigned or their status changes.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        📊
                                    </div>

                                    <h5 className="fw-bold">
                                        Dashboard Analytics
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Administrators can monitor request
                                        statistics through a centralized
                                        dashboard.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6 col-lg-4">

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <div className="fs-1 mb-3">
                                        🔐
                                    </div>

                                    <h5 className="fw-bold">
                                        Secure Authentication
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Role-based authentication protects
                                        student, administrator, and staff
                                        functionality.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* WORKFLOW */}
            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="text-primary fw-semibold">
                            HOW IT WORKS
                        </span>

                        <h2 className="fw-bold mt-2">
                            Simple Service Request Workflow
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}>
                                    1
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Submit
                                </h5>

                                <p className="text-muted">
                                    Student creates a service request.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}>
                                    2
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Assign
                                </h5>

                                <p className="text-muted">
                                    Admin assigns the request to staff.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}>
                                    3
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Process
                                </h5>

                                <p className="text-muted">
                                    Staff works on the service request.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center fw-bold fs-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}>
                                    4
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Resolve
                                </h5>

                                <p className="text-muted">
                                    Request is completed and tracked.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="py-5 bg-primary text-white">

                <div className="container text-center">

                    <h2 className="fw-bold">
                        Ready to use Smart Campus?
                    </h2>

                    <p className="lead mb-4">
                        Manage campus services from one centralized platform.
                    </p>

                    <Link
                        to="/login"
                        className="btn btn-light btn-lg text-primary fw-semibold px-5"
                    >
                        Access Portal
                    </Link>

                </div>

            </section>


            {/* FOOTER */}
            <footer className="bg-dark text-white py-4">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-md-6">

                            <h5 className="fw-bold mb-1">
                                Smart Campus
                            </h5>

                            <small className="text-secondary">
                                Cloud-Based Smart Campus Service Management System
                            </small>

                        </div>

                        <div className="col-md-6 text-md-end mt-3 mt-md-0">

                            <small className="text-secondary">
                                Student • Admin • Staff
                            </small>

                        </div>

                    </div>

                    <hr className="border-secondary" />

                    <p className="text-center text-secondary mb-0">
                        © 2026 Smart Campus Service Management System
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;