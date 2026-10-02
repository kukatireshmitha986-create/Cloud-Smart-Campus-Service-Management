const express = require("express");

const db = require("../database");

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// PROTECTED PROFILE
router.get(
    "/profile",
    authenticateToken,
    (req, res) => {

        res.json({
            success: true,
            message:
                "You have accessed a protected route.",
            user: req.user
        });

    }
);

// ADMIN ONLY - GET STAFF
router.get(
    "/staff",
    authenticateToken,
    authorizeRoles("admin"),
    (req, res) => {

        try {

            const staff = db.prepare(`
                SELECT
                    id,
                    name,
                    email,
                    phone,
                    department,
                    created_at
                FROM users
                WHERE role = 'staff'
                ORDER BY name
            `).all();

            res.json({
                success: true,
                count: staff.length,
                staff
            });

        } catch (error) {

            console.error(
                "Staff loading error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while loading staff."
            });
        }

    }
);

module.exports = router;