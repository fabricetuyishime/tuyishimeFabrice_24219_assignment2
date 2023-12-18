package com.submission;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/login")
public class AuthenticationFilter implements Filter {

    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code if needed
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (!email.isEmpty() && !password.isEmpty()) {
            if (password.equals("admin1234") && email.equals("scottmoses247@gmail.com")) {
                // Redirect to submission.html when password is "admin1234" & email is "student@auca.com"
                User user = new User();
                user.setEmail(email); 
                
                HttpSession session = httpRequest.getSession();
                session.setAttribute("user", user);

                httpResponse.sendRedirect("submission.html"); 
                return; // Return to prevent further processing
            }else {
            	httpResponse.sendRedirect("index.html"); 
                return; 
            }
        }

        // Continue the filter chain (if authentication fails)
        chain.doFilter(request, response);
    }

    public void destroy() {
        // Cleanup code if needed
    }
}
