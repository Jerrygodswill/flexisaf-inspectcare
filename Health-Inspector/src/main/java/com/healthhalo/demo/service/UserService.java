package com.healthhalo.demo.service;

import com.healthhalo.demo.dto.UserData;
import com.healthhalo.demo.model.User;
import com.healthhalo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserData fetchDataByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        UserData userData = new UserData();
        userData.setId(user.getId());
        userData.setFullName(user.getFullName()); // ensure `getFullName()` exists in User
        userData.setEmail(user.getEmail());

        return userData;
    }
}