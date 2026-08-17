package com.example.studentSpring.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.studentSpring.service.UserService;
import com.example.studentSpring.model.User;


@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }
    @PostMapping("/login")
public String loginUser(@RequestBody User user) {
    System.out.println("USERNAME: " + user.getUsername());
    System.out.println("PASSWORD: " + user.getPassword());

    return userService.loginUser(
            user.getUsername(),
            user.getPassword()
    );
}

}
