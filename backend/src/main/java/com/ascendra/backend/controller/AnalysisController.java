package com.ascendra.backend.controller;

import com.ascendra.backend.payload.response.AnalysisResponse;
import com.ascendra.backend.service.ResumeAnalysisService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analyze")
public class AnalysisController {

    @Autowired
    ResumeAnalysisService resumeAnalysisService;

    @PostMapping
    public ResponseEntity<?> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobRole") String jobRole,
            @RequestParam("companies") String companiesJson) {
        
        try {
            // Parse PDF
            String resumeText = resumeAnalysisService.extractTextFromPdf(file);
            
            // Parse Companies List
            ObjectMapper mapper = new ObjectMapper();
            List<String> companies = mapper.readValue(companiesJson, new TypeReference<List<String>>(){});

            // Analyze
            AnalysisResponse analysis = resumeAnalysisService.analyzeApplication(resumeText, jobRole, companies);
            
            return ResponseEntity.ok(analysis);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error processing request: " + e.getMessage());
        }
    }
}
