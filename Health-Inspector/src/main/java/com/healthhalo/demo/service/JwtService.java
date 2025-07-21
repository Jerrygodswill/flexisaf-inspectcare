package com.healthhalo.demo.service;

import com.healthhalo.demo.dto.UserData;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(UserData userData) {
        return Jwts.builder()
                .setSubject(userData.getEmail())
                .claim("id", userData.getId())
                .claim("name", userData.getFullName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 864_000_00)) // 1 day
                .signWith(secretKey)
                .compact();
    }
}