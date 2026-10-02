const express = require("express");

const db = require("../database");

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// ============================================================
// STUDENT - CREATE SERVICE REQUEST
// ============================================================

router.post(
    "/",
    authenticateToken,
    authorizeRoles("student"),
    (req, res) => {

        try {

            const {
                category,
                title,
                description,
                priority,
                location,
                image_url
            } = req.body;

            if (
                !category ||
                !title ||
                !description
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Category, title and description are required."
                });
            }

            const validPriorities = [
                "Low",
                "Medium",
                "High",
                "Critical"
            ];

            const selectedPriority =
                priority || "Medium";

            if (
                !validPriorities.includes(
                    selectedPriority
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid priority value."
                });
            }

            const result = db.prepare(`
                INSERT INTO service_requests
                (
                    user_id,
                    category,
                    title,
                    description,
                    priority,
                    status,
                    location,
                    image_url
                )
                VALUES (?, ?, ?, ?, ?, 'Pending', ?, ?)
            `).run(
                req.user.id,
                category,
                title,
                description,
                selectedPriority,
                location || null,
                image_url || null
            );

            res.status(201).json({
                success: true,
                message:
                    "Service request created successfully.",
                requestId:
                    result.lastInsertRowid
            });

        } catch (error) {

            console.error(
                "Create request error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while creating request."
            });
        }
    }
);


// ============================================================
// STUDENT - GET MY REQUESTS
// ============================================================

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("student"),
    (req, res) => {

        try {

            const requests = db.prepare(`
                SELECT
                    sr.*,
                    staff.name AS staff_name
                FROM service_requests sr
                LEFT JOIN users staff
                    ON sr.assigned_to = staff.id
                WHERE sr.user_id = ?
                ORDER BY sr.created_at DESC
            `).all(req.user.id);

            res.json({
                success: true,
                count: requests.length,
                requests
            });

        } catch (error) {

            console.error(
                "Student request loading error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading requests."
            });
        }
    }
);


// ============================================================
// ADMIN - GET ALL REQUESTS
// ============================================================

router.get(
    "/admin/all",
    authenticateToken,
    authorizeRoles("admin"),
    (req, res) => {

        try {

            const requests = db.prepare(`
                SELECT
                    sr.*,

                    student.name AS student_name,
                    student.email AS student_email,

                    staff.name AS staff_name,
                    staff.email AS staff_email

                FROM service_requests sr

                JOIN users student
                    ON sr.user_id = student.id

                LEFT JOIN users staff
                    ON sr.assigned_to = staff.id

                ORDER BY sr.created_at DESC
            `).all();

            res.json({
                success: true,
                count: requests.length,
                requests
            });

        } catch (error) {

            console.error(
                "Admin request loading error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading requests."
            });
        }
    }
);


// ============================================================
// ADMIN - GET DASHBOARD STATISTICS
// ============================================================

router.get(
    "/admin/dashboard",
    authenticateToken,
    authorizeRoles("admin"),
    (req, res) => {

        try {

            const total = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
            `).get().count;

            const pending = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
                WHERE status = 'Pending'
            `).get().count;

            const assigned = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
                WHERE status = 'Assigned'
            `).get().count;

            const inProgress = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
                WHERE status = 'In Progress'
            `).get().count;

            const resolved = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
                WHERE status = 'Resolved'
            `).get().count;

            const closed = db.prepare(`
                SELECT COUNT(*) AS count
                FROM service_requests
                WHERE status = 'Closed'
            `).get().count;

            const students = db.prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE role = 'student'
            `).get().count;

            const staff = db.prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE role = 'staff'
            `).get().count;

            res.json({
                success: true,

                statistics: {
                    total,
                    pending,
                    assigned,
                    inProgress,
                    resolved,
                    closed,
                    students,
                    staff
                }
            });

        } catch (error) {

            console.error(
                "Admin dashboard error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading dashboard."
            });
        }
    }
);


// ============================================================
// ADMIN - ASSIGN REQUEST TO STAFF
// ============================================================

router.put(
    "/:id/assign",
    authenticateToken,
    authorizeRoles("admin"),
    (req, res) => {

        try {

            const requestId =
                Number(req.params.id);

            const {
                staff_id
            } = req.body;

            if (!staff_id) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Staff ID is required."
                });
            }

            const request =
                db.prepare(`
                    SELECT *
                    FROM service_requests
                    WHERE id = ?
                `).get(requestId);

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Service request not found."
                });
            }

            const staff =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email
                    FROM users
                    WHERE id = ?
                    AND role = 'staff'
                `).get(staff_id);

            if (!staff) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Staff member not found."
                });
            }

            db.prepare(`
                UPDATE service_requests
                SET
                    assigned_to = ?,
                    status = 'Assigned',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(
                staff_id,
                requestId
            );

            db.prepare(`
                INSERT INTO request_updates
                (
                    request_id,
                    updated_by,
                    old_status,
                    new_status,
                    comment
                )
                VALUES (?, ?, ?, ?, ?)
            `).run(
                requestId,
                req.user.id,
                request.status,
                "Assigned",
                `Request assigned to ${staff.name}.`
            );

            db.prepare(`
                INSERT INTO notifications
                (
                    user_id,
                    request_id,
                    message
                )
                VALUES (?, ?, ?)
            `).run(
                staff_id,
                requestId,
                `A new service request has been assigned to you: ${request.title}`
            );

            db.prepare(`
                INSERT INTO notifications
                (
                    user_id,
                    request_id,
                    message
                )
                VALUES (?, ?, ?)
            `).run(
                request.user_id,
                requestId,
                `Your service request "${request.title}" has been assigned to support staff.`
            );

            res.json({
                success: true,
                message:
                    "Request assigned successfully."
            });

        } catch (error) {

            console.error(
                "Assign request error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while assigning request."
            });
        }
    }
);


// ============================================================
// STAFF - GET MY ASSIGNED REQUESTS
// IMPORTANT: THIS MUST COME BEFORE /:id/history
// ============================================================

router.get(
    "/staff/my",
    authenticateToken,
    authorizeRoles("staff"),
    (req, res) => {

        try {

            const requests = db.prepare(`
                SELECT
                    sr.*,

                    student.name AS student_name,
                    student.email AS student_email,

                    staff.name AS staff_name

                FROM service_requests sr

                JOIN users student
                    ON sr.user_id = student.id

                LEFT JOIN users staff
                    ON sr.assigned_to = staff.id

                WHERE sr.assigned_to = ?

                ORDER BY sr.created_at DESC
            `).all(req.user.id);

            res.json({
                success: true,
                count: requests.length,
                requests
            });

        } catch (error) {

            console.error(
                "Staff assigned requests error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading assigned requests."
            });
        }
    }
);


// ============================================================
// ADMIN / STAFF - UPDATE REQUEST STATUS
// ============================================================

router.put(
    "/:id/status",
    authenticateToken,
    authorizeRoles("admin", "staff"),
    (req, res) => {

        try {

            const requestId =
                Number(req.params.id);

            const {
                status,
                comment
            } = req.body;

            const validStatuses = [
                "Pending",
                "Assigned",
                "In Progress",
                "Resolved",
                "Closed"
            ];

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Status is required."
                });
            }

            if (
                !validStatuses.includes(status)
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid status."
                });
            }

            const request =
                db.prepare(`
                    SELECT *
                    FROM service_requests
                    WHERE id = ?
                `).get(requestId);

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Service request not found."
                });
            }

            // STAFF CAN UPDATE ONLY REQUESTS ASSIGNED TO THEM
            if (
                req.user.role === "staff" &&
                request.assigned_to !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        "This request is not assigned to you."
                });
            }

            const oldStatus =
                request.status;

            db.prepare(`
                UPDATE service_requests
                SET
                    status = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(
                status,
                requestId
            );

            db.prepare(`
                INSERT INTO request_updates
                (
                    request_id,
                    updated_by,
                    old_status,
                    new_status,
                    comment
                )
                VALUES (?, ?, ?, ?, ?)
            `).run(
                requestId,
                req.user.id,
                oldStatus,
                status,
                comment || null
            );

            db.prepare(`
                INSERT INTO notifications
                (
                    user_id,
                    request_id,
                    message
                )
                VALUES (?, ?, ?)
            `).run(
                request.user_id,
                requestId,
                `Your service request "${request.title}" status changed from ${oldStatus} to ${status}.`
            );

            res.json({
                success: true,
                message:
                    "Request status updated successfully."
            });

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while updating request status."
            });
        }
    }
);


// ============================================================
// REQUEST HISTORY
// ============================================================

router.get(
    "/:id/history",
    authenticateToken,
    (req, res) => {

        try {

            const requestId =
                Number(req.params.id);

            const request =
                db.prepare(`
                    SELECT *
                    FROM service_requests
                    WHERE id = ?
                `).get(requestId);

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Service request not found."
                });
            }

            // STUDENT CAN SEE ONLY THEIR OWN REQUEST
            if (
                req.user.role === "student" &&
                request.user_id !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        "You do not have permission to view this request."
                });
            }

            // STAFF CAN SEE ONLY ASSIGNED REQUEST
            if (
                req.user.role === "staff" &&
                request.assigned_to !== req.user.id
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        "This request is not assigned to you."
                });
            }

            const history = db.prepare(`
                SELECT
                    ru.*,
                    u.name AS updated_by_name,
                    u.role AS updated_by_role
                FROM request_updates ru

                JOIN users u
                    ON ru.updated_by = u.id

                WHERE ru.request_id = ?

                ORDER BY ru.created_at DESC
            `).all(requestId);

            res.json({
                success: true,
                request,
                history
            });

        } catch (error) {

            console.error(
                "History loading error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading request history."
            });
        }
    }
);


// ============================================================
// MY NOTIFICATIONS
// ============================================================

router.get(
    "/notifications/my",
    authenticateToken,
    (req, res) => {

        try {

            const notifications =
                db.prepare(`
                    SELECT
                        n.*,
                        sr.title AS request_title
                    FROM notifications n

                    LEFT JOIN service_requests sr
                        ON n.request_id = sr.id

                    WHERE n.user_id = ?

                    ORDER BY n.created_at DESC
                `).all(req.user.id);

            res.json({
                success: true,
                count: notifications.length,
                notifications
            });

        } catch (error) {

            console.error(
                "Notification loading error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading notifications."
            });
        }
    }
);


module.exports = router;