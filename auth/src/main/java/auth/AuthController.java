package auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin()
@RequestMapping("/api") // Base path for API endpoints
public class AuthController {

    @Autowired
    AuthService authentication;

    @PostMapping("/login")
    @ResponseBody
    public AuthModel login(@RequestBody AuthRequest request) {
        try {
            AuthModel memberID = authentication.authenticate(request.getUsername(), request.getPassword());
            if (memberID != null) {
                return memberID;
            } else {
                throw new RuntimeException("AuthModel is null");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error: ", e);
        }
    }

}
