package com.healthhalo.demo.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.healthhalo.demo.dto.UserData;
import com.healthhalo.demo.filter.AuthFilter;
import com.healthhalo.demo.filter.JwtFilter;
import com.healthhalo.demo.response.AuthResponse;
import com.healthhalo.demo.service.JwtService;
import com.healthhalo.demo.service.UserService;
import com.healthhalo.demo.service.MyUserDetailsService;
import com.healthhalo.demo.service.UserPrincipal;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
public class AppConfiguration {

    private final String[] publicUrls = {
            "/api/user/create", "/v3/api-docs/**",
            "/swagger-ui.html", "/swagger-ui/**",
            "/webjars/**", "/actuator/**", "/api/auth/login"
    };

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ObjectMapper objectMapper;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("https://your-production-domain.com"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return myUserDetailsService;
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthFilter getAuthFilter(AuthenticationManager authenticationManager) {
        AuthFilter authFilter = new AuthFilter();
        authFilter.setAuthenticationManager(authenticationManager);
        authFilter.setFilterProcessesUrl("/api/auth/login");

        authFilter.setAuthenticationSuccessHandler((request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            UserData userData = userService.fetchDataByEmail(userPrincipal.getUsername());

            AuthResponse authResponse = new AuthResponse(
                    userData.getUsername(),
                    userData.getEmail(),
                    userData.getRole(),
                    jwtService.generateToken(userData)
            );

            response.setContentType("application/json");
            response.getWriter().write(objectMapper.writeValueAsString(authResponse));
        });

        authFilter.setAuthenticationFailureHandler((request, response, exception) -> {
         

        return authFilter;
    }
                
                
                ecurityFilterChain filterChain(Http
                        
                        rfConfigurer::disable)
                        rs -> cors.configurationSource
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(publicUrls).permitAll()
                    .anyRequest().authenticated())
            .userDetailsService(myUserDetailsService)
            .addFilterAt(getAuthFilter(manager), UsernamePasswordAuthenticationFilter.class)
            .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}