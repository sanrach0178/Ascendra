package com.ascendra.backend.controller;

import com.ascendra.backend.model.SavedAnalysis;
import com.ascendra.backend.model.User;
import com.ascendra.backend.repository.SavedAnalysisRepository;
import com.ascendra.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SavedAnalysisController {

    @Autowired
    private SavedAnalysisRepository savedAnalysisRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveAnalysis(@RequestBody SavedAnalysis analysis) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: User not found."));
        analysis.setUser(user);
        SavedAnalysis saved = savedAnalysisRepository.save(analysis);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SavedAnalysis>> getHistory() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: User not found."));
        return ResponseEntity.ok(savedAnalysisRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnalysis(@PathVariable Long id) {
        savedAnalysisRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
