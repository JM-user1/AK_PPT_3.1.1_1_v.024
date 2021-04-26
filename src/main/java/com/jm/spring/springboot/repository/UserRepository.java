package com.jm.spring.springboot.repository;

import com.jm.spring.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.roles r WHERE  u.username = (:userName)")
    User findByUsername(@Param("userName") String name);
}
