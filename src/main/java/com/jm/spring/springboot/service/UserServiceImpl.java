package com.jm.spring.springboot.service;

import com.jm.spring.springboot.entity.Role;
import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.repository.RoleRepository;
import com.jm.spring.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @PersistenceContext(unitName = "entityManagerFactory")
    private  EntityManager em;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public User findUserById(Long userId) {
//      return   userRepository.getOne(userId);
        Optional<User> userFromDB = userRepository.findById(userId);
        return userFromDB.orElse(new User());
    }

    public User findUserByName(String name){
        return  userRepository.findByUsername(name);
    }

    public Role findRoleById(Long roleId){
        Optional<Role> roleFromDB = roleRepository.findById(roleId);
        return roleFromDB.orElse(new Role());
    }

    public List<User> usergtList(Long idMin) {
        return em.createQuery("SELECT u FROM User u WHERE u.id > :paramId", User.class)
                .setParameter("paramId", idMin).getResultList();
    }

    @Override
    public boolean saveUser(User user) {
        User userFromDB = userRepository.findByUsername(user.getUsername());
//        Set<Role> roleFromDB = user.getRoles();
        if (userFromDB != null) {
            return false;
        }
//        user.setRoles(Collections.singleton(role));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }


    public boolean updateUser(User user) {
        User userFromDB = userRepository.findByUsername(user.getUsername());
        if (userFromDB == null) {
            System.out.println("User not found");
            return false;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public List<Role> allRoles(){ return roleRepository.findAll();}

    public void editUser(Long id, User user) {
    User updatedUser = findUserById(id);
    updatedUser.setUsername(user.getEmail());
    updatedUser.setPassword(user.getPassword());
    userRepository.save(updatedUser);
    }

    @Override
    public User getById(Long id) {
        User user = findUserById(id);
        System.out.println("Имя Юзверя: "+ user.getUsername());
        return user;
    }



}
