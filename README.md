# ☁️ Cloud-Based Smart Campus Service Management System

A professional full-stack cloud-ready web application for managing campus service requests through a centralized digital platform for **Students, Administrators, and Support Staff**.

---

## 📌 Project Overview

The **Cloud-Based Smart Campus Service Management System** digitizes the process of reporting, assigning, tracking, and resolving campus service issues.

Students can submit service requests and monitor their progress. Administrators can manage requests and assign them to support staff. Support staff can view assigned requests and update their status until the issue is resolved.

### 🔄 Request Workflow

**Student → Submit Request → Administrator Review → Staff Assignment → Staff Processing → Resolution → Student Notification**

---

## 🎯 Objectives

- Digitize campus service request management.
- Provide a centralized request management platform.
- Allow students to submit and track service requests.
- Allow administrators to monitor all requests.
- Allow administrators to assign requests to support staff.
- Allow support staff to process assigned requests.
- Provide request status tracking.
- Provide request history and notifications.
- Implement secure authentication.
- Implement role-based access control.
- Provide separate dashboards for different users.
- Build a responsive and cloud-ready full-stack application.

---

# ✨ Features

### 👨‍🎓 Student Portal

- Student registration and login
- Student dashboard
- Create service requests
- Select service category
- Enter request title and description
- Select priority
- Enter location
- View submitted requests
- Track request status
- View request history
- Receive notifications
- View resolved requests
- Secure logout

### 👨‍💼 Administrator Portal

- Administrator login
- Administrator dashboard
- View total requests
- View pending requests
- View assigned requests
- View in-progress requests
- View resolved requests
- View closed requests
- View support staff
- Assign requests to staff
- Update request status
- Filter requests
- Monitor complete service workflow

### 🧑‍🔧 Support Staff Portal

- Staff login
- Staff dashboard
- View assigned requests
- View request details
- View student information
- View priority and location
- Update request status
- Process service requests
- Mark requests as resolved
- Close completed requests

### 🔔 Notification System

Notifications are generated when request-related actions occur, including:

- Request assignment
- Status changes
- Request progress
- Request resolution

### 🔐 Security

- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Protected API routes
- Protected frontend routes
- Bearer token authentication
- Separate access for Student, Administrator, and Staff roles

---

# 🖥️ Application Screenshots

## 🏠 Home Page

![Smart Campus Home Page](screenshots/01-home.png)

## 🔐 Login Page

![Smart Campus Login](screenshots/02-login.png)

## 👨‍🎓 Student Dashboard

![Student Dashboard](screenshots/03-student-dashboard.png)

## 📋 My Service Requests

![My Service Requests](screenshots/04-my-requests.png)

## 📝 Create Service Request

![Create Service Request](screenshots/05-create-request.png)

## 🧑‍🔧 Support Staff Dashboard

![Support Staff Dashboard](screenshots/06-staff-dashboard.png)

## 👨‍💼 Administrator Dashboard

![Administrator Dashboard](screenshots/07-admin-dashboard.png)

---

# 🏗️ System Architecture

```text
┌───────────────────────────────────────────────────────┐
│                    REACT FRONTEND                     │
│                                                       │
│  Student Portal │ Admin Portal │ Staff Portal        │
└──────────────────────────┬────────────────────────────┘
                           │
                           │ Axios / REST API
                           ▼
┌───────────────────────────────────────────────────────┐
│                  NODE.JS + EXPRESS                    │
│                                                       │
│ Authentication │ Users │ Requests │ Notifications     │
│                 Authorization                         │
└──────────────────────────┬────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────┐
│                    SQLITE DATABASE                    │
│                                                       │
│ Users │ Requests │ Request Updates │ Notifications   │
└───────────────────────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| UI | Bootstrap 5, CSS3, HTML5 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| API | REST API |
| Database | SQLite, better-sqlite3 |
| Authentication | JWT |
| Password Security | bcryptjs |
| Configuration | dotenv |
| Development | Visual Studio Code, PowerShell |
| Version Control | Git, GitHub |

---

# 📂 Project Structure

```text
Cloud-Smart-Campus-Service-Management/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── requestRoutes.js
│   │
│   ├── .env
│   ├── database.js
│   ├── server.js
│   ├── createTestUsers.js
│   ├── smart_campus.db
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateRequest.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyRequests.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   └── StudentDashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── screenshots/
│   ├── 01-home.png
│   ├── 02-login.png
│   ├── 03-student-dashboard.png
│   ├── 04-my-requests.png
│   ├── 05-create-request.png
│   ├── 06-staff-dashboard.png
│   └── 07-admin-dashboard.png
│
└── README.md
```

---

# 🗄️ Database Design

The application uses SQLite to store user accounts, service requests, request history, and notifications.

### Users

```text
users
├── id
├── name
├── email
├── password
├── role
├── phone
├── department
└── created_at
```

### Service Requests

```text
service_requests
├── id
├── user_id
├── category
├── title
├── description
├── priority
├── status
├── assigned_to
├── location
├── image_url
├── created_at
└── updated_at
```

### Request Updates

```text
request_updates
├── id
├── request_id
├── updated_by
├── old_status
├── new_status
├── comment
└── created_at
```

### Notifications

```text
notifications
├── id
├── user_id
├── request_id
├── message
├── is_read
└── created_at
```

---

# 🔌 REST API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Users

```text
GET /api/users/profile
GET /api/users/staff
```

### Student

```text
POST /api/requests
GET /api/requests/my
GET /api/requests/notifications/my
GET /api/requests/:id/history
```

### Administrator

```text
GET /api/requests/admin/all
GET /api/requests/admin/dashboard
PUT /api/requests/:id/assign
PUT /api/requests/:id/status
```

### Support Staff

```text
GET /api/requests/staff/my
PUT /api/requests/:id/status
```

### Health Check

```text
GET /api/health
```

---

# 🔄 Application Workflow

```text
Student Login
      ↓
Student Dashboard
      ↓
Create Service Request
      ↓
Request Stored in SQLite
      ↓
Administrator Reviews Request
      ↓
Administrator Assigns Staff
      ↓
Staff Receives Request
      ↓
Staff Changes Status to In Progress
      ↓
Staff Resolves Request
      ↓
Student Receives Notification
      ↓
Student Views Updated Status
      ↓
Request Closed
```

---

# 📊 Request Statuses

| Status | Description |
|---|---|
| Pending | Request submitted by the student |
| Assigned | Request assigned to support staff |
| In Progress | Staff is working on the request |
| Resolved | Service issue has been resolved |
| Closed | Request lifecycle has been completed |

---

# 🚦 Priority Levels

| Priority | Description |
|---|---|
| Low | Non-urgent request |
| Medium | Normal service request |
| High | Urgent service requirement |
| Critical | Emergency-level service request |

---

# 👥 User Roles

| Role | Responsibilities |
|---|---|
| Student | Create requests, track requests, view history and notifications |
| Administrator | Monitor requests, assign staff, manage statuses and statistics |
| Support Staff | View assigned requests and update request progress |

---

# 🔑 Demo Accounts

### Student

```text
Email: reshmitha@student.com
Password: Student@123
Role: Student
```

### Administrator

```text
Email: admin@smartcampus.com
Password: Admin@123
Role: Administrator
```

### Support Staff

```text
Email: staff@smartcampus.com
Password: Staff@123
Role: Support Staff
```

> These accounts are intended for local project demonstration.

---

# ⚙️ Installation and Setup

## 1. Clone the Repository

```powershell
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd Cloud-Smart-Campus-Service-Management
```

## 2. Backend Setup

```powershell
cd "D:\Cloud-Smart-Campus-Service-Management\backend"
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=smart_campus_secret_key_2026
```

Start the backend:

```powershell
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 3. Frontend Setup

Open another PowerShell terminal:

```powershell
cd "D:\Cloud-Smart-Campus-Service-Management\frontend"
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 Frontend Routes

```text
/                       → Home
/login                  → Login
/register               → Registration
/student                → Student Dashboard
/student/create-request → Create Request
/student/my-requests    → My Requests
/admin                  → Administrator Dashboard
/staff                  → Staff Dashboard
```

---

# 🔐 Authentication Flow

```text
User Login
    ↓
Credentials Validated
    ↓
Password Verified Using bcrypt
    ↓
JWT Token Generated
    ↓
Token Stored by Frontend
    ↓
Protected API Request
    ↓
JWT Token Verified
    ↓
Role Authorization
    ↓
Authorized Dashboard
```

---

# 📈 Dashboard Modules

### Student Dashboard

- Total Requests
- Pending Requests
- Assigned Requests
- In Progress Requests
- Resolved Requests
- Notifications
- Campus Services
- Create Request
- My Requests

### Administrator Dashboard

- Total Requests
- Pending Requests
- Assigned Requests
- In Progress Requests
- Resolved Requests
- Closed Requests
- Support Staff Count
- Request Assignment
- Status Management
- Request Filtering

### Staff Dashboard

- Assigned Requests
- Pending Requests
- In Progress Requests
- Resolved Requests
- Request Details
- Status Management
- Request Refresh

---

# ☁️ Cloud Deployment

The application uses a separate frontend and backend architecture, making it suitable for cloud deployment.

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway

### Production Database

The development version uses SQLite. For production deployment, the database can be migrated to a managed database such as PostgreSQL or MySQL.

---

# 🔮 Future Enhancements

- Cloud database integration
- Email notifications
- Push notifications
- Real-time notifications
- Advanced analytics
- Search functionality
- Advanced filtering
- Request comments
- File and image uploads
- Staff performance analytics
- Department-wise analytics
- AI-based request classification
- Mobile application
- Cloud storage
- SLA monitoring
- Automated email alerts

---

# 📚 Learning Outcomes

This project demonstrates practical knowledge of:

- React.js
- Vite
- Bootstrap
- JavaScript
- Node.js
- Express.js
- REST APIs
- SQLite
- SQL
- CRUD operations
- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Axios
- React Router
- Protected routes
- Database management
- Request management
- Notification systems
- Dashboard development
- Full-stack architecture
- Git and GitHub
- Cloud-ready application design

---

# 🏆 Project Highlights

- ✅ Full-Stack Web Application
- ✅ React + Vite Frontend
- ✅ Node.js + Express Backend
- ✅ SQLite Database
- ✅ REST API Architecture
- ✅ JWT Authentication
- ✅ bcrypt Password Security
- ✅ Role-Based Access Control
- ✅ Student Portal
- ✅ Administrator Portal
- ✅ Support Staff Portal
- ✅ Service Request Management
- ✅ Request Assignment
- ✅ Request Status Tracking
- ✅ Request History
- ✅ Notification System
- ✅ Dashboard Analytics
- ✅ Responsive Bootstrap UI
- ✅ Cloud-Ready Architecture

---

# 📋 Project Information

| Category | Details |
|---|---|
| Project Name | Cloud-Based Smart Campus Service Management System |
| Project Type | Full-Stack Cloud Computing Project |
| Frontend | React + Vite + Bootstrap |
| Backend | Node.js + Express.js |
| Database | SQLite |
| Authentication | JWT + bcryptjs |
| API Architecture | REST API |
| Programming Language | JavaScript |
| Development Environment | Visual Studio Code |
| Version Control | Git + GitHub |
| Year | 2026 |

---

# 👩‍💻 Author

## Reshmitha Kukati

**AI & Data Science Student**

---

# 📌 GitHub Repository

**Repository:** `Cloud-Smart-Campus-Service-Management`

**GitHub Username:** `kukatireshmitha986-create`

---

# ⭐ Conclusion

The **Cloud-Based Smart Campus Service Management System** provides a centralized digital platform for managing campus service requests.

The system connects students, administrators, and support staff through a structured workflow that enables requests to be submitted, assigned, processed, tracked, and resolved.

The project demonstrates practical implementation of **React, Node.js, Express.js, SQLite, REST APIs, JWT authentication, role-based authorization, request management, notifications, dashboard analytics, and responsive UI design**.

The architecture is also designed to support future cloud deployment and additional features such as real-time notifications, cloud databases, analytics, AI-based request classification, and mobile applications.

---

## ⭐ Technologies

**React.js • Vite • Bootstrap • Node.js • Express.js • SQLite • JWT • bcryptjs • Axios • REST API • JavaScript • Git • GitHub**
