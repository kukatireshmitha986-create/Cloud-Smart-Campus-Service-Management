const bcrypt = require("bcryptjs");
const db = require("./database");

async function createTestUsers() {
    try {
        const adminPassword = await bcrypt.hash("Admin@123", 10);
        const staffPassword = await bcrypt.hash("Staff@123", 10);

        // Delete old test accounts
        db.prepare(`
            DELETE FROM users
            WHERE email IN (
                'admin@smartcampus.com',
                'staff@smartcampus.com'
            )
        `).run();

        // Create Admin
        db.prepare(`
            INSERT INTO users
            (name, email, password, role, phone, department)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            "Campus Administrator",
            "admin@smartcampus.com",
            adminPassword,
            "admin",
            "9876543210",
            "Administration"
        );

        // Create Staff
        db.prepare(`
            INSERT INTO users
            (name, email, password, role, phone, department)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            "Campus Support Staff",
            "staff@smartcampus.com",
            staffPassword,
            "staff",
            "9876543211",
            "Maintenance"
        );

        console.log("");
        console.log("======================================");
        console.log("TEST USERS CREATED SUCCESSFULLY");
        console.log("======================================");
        console.log("");
        console.log("ADMIN");
        console.log("Email    : admin@smartcampus.com");
        console.log("Password : Admin@123");
        console.log("");
        console.log("STAFF");
        console.log("Email    : staff@smartcampus.com");
        console.log("Password : Staff@123");
        console.log("");
        console.log("======================================");

    } catch (error) {
        console.error("Error creating test users:", error);
    } finally {
        db.close();
    }
}

createTestUsers();