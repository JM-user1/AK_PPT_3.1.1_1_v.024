package com.jm.spring.springboot.service;


import com.jm.spring.springboot.entity.User;

import java.util.List;

public interface UserService {
    User findUserByName(String username);

    boolean updateUser(User user);

    User findUserById(Long userId);

    boolean saveUser(User user);

    boolean deleteUser(Long userId);

    List<User> allUsers();

    User getById(Long id);
}
