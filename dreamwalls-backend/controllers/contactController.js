const nodemailer = require('nodemailer');

// Create transporter outside the function to reuse it
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (req, res) => {
    try {
        const { from, name, phone, subject, message } = req.body;

        // Verify transporter
        await transporter.verify();

        // Create email content
        const mailOptions = {
            from: 'shibbs075@gmail.com', // Always send from your email
            to: 'shibbs075@gmail.com',
            replyTo: from, // This allows you to reply directly to the sender
            subject: `New Contact Form Message: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${from}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <div style="margin-top: 20px;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
};

module.exports = { sendEmail }; 