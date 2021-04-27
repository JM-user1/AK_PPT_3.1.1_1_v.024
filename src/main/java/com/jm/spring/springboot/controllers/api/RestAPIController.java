package com.jm.spring.springboot.controllers.api;

import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.repository.RoleRepository;
import com.jm.spring.springboot.repository.UserRepository;
import com.jm.spring.springboot.service.UserService;
import com.jm.spring.springboot.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPIController {
    private final UserService userServiceImpl;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public RestAPIController(UserServiceImpl userServiceImpl, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userServiceImpl = userServiceImpl;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> userList() {
        final List<User> users = userServiceImpl.allUsers();
        return users != null
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/users/{id}")
    public User user(@PathVariable Long id) {
        return userServiceImpl.findUserById(id);
    }

    @PostMapping(produces = "application/json", value = "/users")
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userServiceImpl.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(produces = "application/json", value = "/users/{id}")
    public void updateUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userServiceImpl.updateUser(user);
    }


    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userServiceImpl.deleteUser(id);
    }

}
