package agent.app.service.intf;

import agent.app.model.User;

import java.util.List;

public interface UserService {
    User findById(Long id);
    List<User> findAll();
    User findByEmail(String email);
    User save(User user);
}
