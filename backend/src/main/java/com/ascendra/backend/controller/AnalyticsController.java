package com.ascendra.backend.controller;

import com.ascendra.backend.model.User;
import com.ascendra.backend.payload.response.FunnelDTO;
import com.ascendra.backend.payload.response.ResumePerformanceDTO;
import com.ascendra.backend.repository.UserRepository;
import com.ascendra.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    
    @Autowired
    AnalyticsService analyticsService;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping("/funnel")
    public FunnelDTO getFunnelStats() {
        User user = getCurrentUser();
        return analyticsService.getFunnelStats(user);
    }

    @GetMapping("/resume-performance")
    public List<ResumePerformanceDTO> getResumeStats() {
        User user = getCurrentUser();
        return analyticsService.getResumeStats(user);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + userDetails.getUsername()));
    }
}
