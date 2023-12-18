package com.submission;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Properties;

@WebServlet("/submit")
public class SubmissionServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        // Obtain the user's email from the session
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            // Handle the case where the user object is not found in the session
            response.sendRedirect("index.html");
            return;
        }
        String userEmail = user.getEmail();

        // Send the confirmation email
        boolean emailSent = sendConfirmationEmail(userEmail);

        // Set a session attribute to indicate email success
        session.setAttribute("emailSent", emailSent);

        // After processing and sending the email, redirect to the confirmation page
        response.sendRedirect("confirmation.html");
    }

    private boolean sendConfirmationEmail(String userEmail) {
        // Configure my email server and credentials
        final String email = "iradukundam47@gmail.com"; 
        final String password = "abc@xyz";

        // Configure the SMTP properties for your email provider (Gmail)
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); 
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com"); 

        // Create a new mail session with the provided properties
        Session mailSession = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });

        // Create a new email message
        try {
            MimeMessage message = new MimeMessage(mailSession);
            message.setFrom(new InternetAddress(email));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userEmail));
            message.setSubject("Confirmation Email");
            message.setText("Dear User,\n\nYour registration is successful. Welcome to our platform!");

            // Send the email
            Transport.send(message);

            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }
}
