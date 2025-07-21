package com.healthhalo.demo.payload;

public class AuthResponse {
    private String token;
    private String id;
    private String name;
    private String email;

    public AuthResponse(String token, String id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Add getters and setters or use Lombok @Data
}
