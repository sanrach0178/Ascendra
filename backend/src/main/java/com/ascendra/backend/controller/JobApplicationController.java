package com.ascendra.backend.controller;

import com.ascendra.backend.model.JobApplication;
import com.ascendra.backend.model.User;
import com.ascendra.backend.repository.JobApplicationRepository;
import com.ascendra.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    JobApplicationRepository jobApplicationRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<JobApplication> getAllApplications() {
        User user = getCurrentUser();
        return jobApplicationRepository.findByUser(user);
    }

    @PostMapping
    public JobApplication createApplication(@Valid @RequestBody JobApplication jobApplication) {
        User user = getCurrentUser();
        jobApplication.setUser(user);
        return jobApplicationRepository.save(jobApplication);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateApplication(@PathVariable Long id, @Valid @RequestBody JobApplication applicationDetails) {
        User user = getCurrentUser();
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id " + id));

        if (!application.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        application.setCompany(applicationDetails.getCompany());
        application.setRole(applicationDetails.getRole());
        application.setDateApplied(applicationDetails.getDateApplied());
        application.setResumeVersion(applicationDetails.getResumeVersion());
        application.setSource(applicationDetails.getSource());
        application.setCurrentStage(applicationDetails.getCurrentStage());
        application.setFinalOutcome(applicationDetails.getFinalOutcome());

        final JobApplication updatedApplication = jobApplicationRepository.save(application);
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id) {
        User user = getCurrentUser();
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id " + id));

        if (!application.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        jobApplicationRepository.delete(application);
        return ResponseEntity.ok().build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + userDetails.getUsername()));
    }
}
