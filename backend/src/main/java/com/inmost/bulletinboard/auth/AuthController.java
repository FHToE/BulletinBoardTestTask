package com.inmost.bulletinboard.auth;

import com.inmost.bulletinboard.exceptions.SingleMessageResponse;
import com.inmost.bulletinboard.exceptions.UserAlreadyRegisteredException;
import com.inmost.bulletinboard.exceptions.ValidationMessageCreator;
import com.inmost.bulletinboard.security.model.LoginRequest;
import com.inmost.bulletinboard.security.model.SignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        try {
            return ResponseEntity.ok(authService.register(signUpRequest));
        } catch (UserAlreadyRegisteredException ex) {
            return ResponseEntity.badRequest().body(new SingleMessageResponse(ex.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Refresh-token") String token) {
        try {
            return ResponseEntity.ok(authService.refreshToken(token));
        } catch (Exception ex) {
            return new ResponseEntity<>(new SingleMessageResponse(ex.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }
}
