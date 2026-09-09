const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // maximum 5 requests
    message: {
        message: "Too many requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});


app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Photography Club Backend is running"
    });
});

// Contact Us API
app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
        const { email, message } = req.body;

        const cleanEmail = email?.trim();
        const cleanMessage = message?.trim();

        // Required fields
        if (!cleanEmail || !cleanMessage) {
            return res.status(400).json({
                message: "Email and message are required"
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }

        // Message length limit
        if (cleanMessage.length > 2000) {
            return res.status(400).json({
                message: "Message is too long"
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CLUB_EMAIL,
            replyTo: cleanEmail,
            subject: "New Contact Us Query",
            text: `
New query received from the Obiettivo website.

Visitor Email:
${cleanEmail}

Message:
${cleanMessage}
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error);

        res.status(500).json({
            message: "Failed to send message"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});