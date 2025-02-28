const express = require("express");
const router = express.Router();
const HealthCheck = require("../models/healthCheck");

router.use("/healthz", (req, res, next) => {
    if (req.method !== "GET") {
        return res
            .status(405)
            .set({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "X-Content-Type-Options": "nosniff",
            })
            .end();
    }
    next();
});

router.get("/healthz", async (req, res) => {
    // Check for any request body, query parameters, or Content-Type header
    if (req.headers['content-length'] || 
        Object.keys(req.query).length > 0 || 
        req.headers['content-type']) {  // Add this line
        return res
            .status(400)
            .set({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "X-Content-Type-Options": "nosniff",
            })
            .end();
    }

    try {
        // Insert record into the health_check table
        await HealthCheck.create({});
        // Return 200 OK with headers
        res
            .status(200)
            .set({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "X-Content-Type-Options": "nosniff",
            })
            .end();
    } catch (error) {
        console.error("Database insert failed: ", error.message);
        // Return 503 Service Unavailable if DB operation fails
        res
            .status(503)
            .set({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "X-Content-Type-Options": "nosniff",
            })
            .end();
    }
});

module.exports = router;