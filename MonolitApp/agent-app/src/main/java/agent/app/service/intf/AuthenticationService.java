package agent.app.service.intf;

import agent.app.authentication.JwtAuthenticationRequest;
import agent.app.dto.SignUpDTO;

public interface AuthenticationService {
    String login(JwtAuthenticationRequest jwtAuthenticationRequest);
    Integer signUp(SignUpDTO signUpDTO);
}
