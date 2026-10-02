const Database = require("better-sqlite3");

const db = new Database("smart_campus.db");

db.pragma("foreign_keys = ON");

// USERS TABLE
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student'
            CHECK(role IN ('student', 'admin', 'staff')),
        phone TEXT,
        department TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

// SERVICE REQUESTS TABLE
db.prepare(`
    CREATE TABLE IF NOT EXISTS service_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT NOT NULL DEFAULT 'Medium'
            CHECK(priority IN ('Low', 'Medium', 'High', 'Critical')),
        status TEXT NOT NULL DEFAULT 'Pending'
            CHECK(status IN (
                'Pending',
                'Assigned',
                'In Progress',
                'Resolved',
                'Closed'
            )),
        assigned_to INTEGER,
        location TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        FOREIGN KEY (assigned_to)
            REFERENCES users(id)
            ON DELETE SET NULL
    )
`).run();

// REQUEST UPDATES TABLE
db.prepare(`
    CREATE TABLE IF NOT EXISTS request_updates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER NOT NULL,
        updated_by INTEGER NOT NULL,
        old_status TEXT,
        new_status TEXT,
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (request_id)
            REFERENCES service_requests(id)
            ON DELETE CASCADE,

        FOREIGN KEY (updated_by)
            REFERENCES users(id)
            ON DELETE CASCADE
    )
`).run();

// NOTIFICATIONS TABLE
db.prepare(`
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        request_id INTEGER,
        message TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        FOREIGN KEY (request_id)
            REFERENCES service_requests(id)
            ON DELETE CASCADE
    )
`).run();

console.log("SQLite database connected successfully.");
console.log("All database tables are ready.");

module.exports = db;