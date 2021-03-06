package services.app.codebookservice.authentication;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import services.app.codebookservice.model.CustomPrincipal;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class TokenAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public TokenAuthenticationFilter() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String userId = httpServletRequest.getHeader("userId");
        String email = httpServletRequest.getHeader("email");
        String roles = httpServletRequest.getHeader("roles");
        String token = httpServletRequest.getHeader("Auth");

        if (roles != null && token != null) {
            Set<SimpleGrantedAuthority> authorities = new HashSet<>();

            String[] roles_arr = roles.split("\\|");
            for (String role : roles_arr) {
                authorities.add(new SimpleGrantedAuthority(role));
            }
            CustomPrincipal cp = new CustomPrincipal(userId, email, roles, token);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(cp, null, authorities);
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }
}