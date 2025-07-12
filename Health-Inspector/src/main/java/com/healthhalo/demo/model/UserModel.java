package com.healthhalo.demo.model;

import com.healthhalo.demo.dto.Role;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String email;
    private String password;
    private String fullname;
    private Role role;
}
