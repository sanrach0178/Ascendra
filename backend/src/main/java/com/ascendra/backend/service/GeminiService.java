package com.ascendra.backend.service;

import com.ascendra.backend.payload.response.AnalysisResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=";

    public AnalysisResponse analyzeResume(String resumeText, String jobRole, List<String> companies) {
        RestTemplate restTemplate = new RestTemplate();
        String url = GEMINI_API_URL + geminiApiKey;

        // Construct the prompt
        String prompt = String.format("""
                You are an expert ATS (Applicant Tracking System) and Career Coach. 
                Analyze the following resume against the target role: '%s'.
                
                Also consider that the candidate is applying to these companies: %s.
                
                Resume Content:
                %s
                
                Provide a structured analysis in JSON format with the following fields:
                - matchScore (integer 0-100)
                - skillGaps (list of strings, formatted as "**Skill Name:** Brief explanation of why it is missing or needed")
                - companyFitIssues (list of strings, specific to the companies listed, formatted as "**Issue:** Brief explanation")
                - recommendations (list of strings, actionable advice formatted as "**Action:** Details")
                - overallFeedback (string, summary)
                
                Return ONLY the JSON. Do not include markdown formatting like ```json.
                """, jobRole, String.join(", ", companies), resumeText);

        int maxRetries = 5;
        int retryDelay = 3000; // 3 seconds base delay

        for (int i = 0; i <= maxRetries; i++) {
            try {
                // Request Body
                Map<String, Object> requestBody = new HashMap<>();
                
                Map<String, Object> contentPart = new HashMap<>();
                contentPart.put("text", prompt);
                
                Map<String, Object> content = new HashMap<>();
                content.put("parts", List.of(contentPart));
                
                requestBody.put("contents", List.of(content));

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

                ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    String responseBody = response.getBody();
                    logToDebugFile("Gemini Raw Response: " + responseBody);
                    return parseGeminiResponse(responseBody);
                } else {
                    logToDebugFile("Gemini Error: " + response.getStatusCode() + " - " + response.getBody());
                    throw new RuntimeException("Gemini API returned error: " + response.getStatusCode() + " Body: " + response.getBody());
                }

            } catch (org.springframework.web.client.HttpClientErrorException.TooManyRequests e) {
                String errorBody = e.getResponseBodyAsString();
                logToDebugFile("Rate limit hit (429). Body: " + errorBody + " | Attempt " + (i + 1) + " of " + (maxRetries + 1));
                if (i < maxRetries) {
                    try {
                        Thread.sleep(retryDelay);
                        retryDelay *= 2; // Exponential backoff
                        continue;
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("Interrupted during retry wait");
                    }
                }
                throw new RuntimeException("Gemini API Rate Limit Exceeded. Google says: " + errorBody);
            } catch (Exception e) {
                // Check if it's a 429 wrapped in another exception or just retry generic errors that might be transient?
                // For now, let's treat other exceptions as fatal unless we want to be very robust.
                // But RestTemplate throws HttpClientErrorException for 429 which we caught above? 
                // Wait, need to make sure we catch the specific exception or check e.getMessage().
                
                String msg = e.getMessage();
                if (msg != null && msg.contains("429")) {
                     logToDebugFile("Rate limit detection via message. Attempt " + (i + 1));
                     if (i < maxRetries) {
                        try {
                            Thread.sleep(retryDelay);
                            retryDelay *= 2;
                            continue;
                        } catch (InterruptedException ie) {
                             Thread.currentThread().interrupt();
                        }
                     }
                }

                logToDebugFile("Exception in analyzeResume: " + e.getMessage());
                e.printStackTrace();
                throw new RuntimeException("Failed to call Gemini API: " + e.getMessage());
            }
        }
        throw new RuntimeException("Failed to complete Gemini API request");
    }

    private AnalysisResponse parseGeminiResponse(String jsonResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonResponse);
            
            // Navigate to : candidates[0].content.parts[0].text
            JsonNode textNode = root.path("candidates").get(0).path("content").path("parts").get(0).path("text");
            if (textNode.isMissingNode()) {
                throw new RuntimeException("Gemini response is missing text content. Raw: " + jsonResponse);
            }
            
            String extractedJson = textNode.asText();
            logToDebugFile("Extracted Text: " + extractedJson);

            // Clean up Markdown if present
            extractedJson = extractedJson.trim();
            if (extractedJson.startsWith("```json")) {
                extractedJson = extractedJson.substring(7);
            }
            if (extractedJson.endsWith("```")) {
                extractedJson = extractedJson.substring(0, extractedJson.length() - 3);
            }
            extractedJson = extractedJson.trim();

            return mapper.readValue(extractedJson, AnalysisResponse.class);

        } catch (Exception e) {
            logToDebugFile("Parse Error: " + e.getMessage());
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage());
        }
    }

    private void logToDebugFile(String message) {
        try (java.io.BufferedWriter writer = new java.io.BufferedWriter(new java.io.FileWriter("gemini_debug.log", true))) {
            writer.write(java.time.LocalDateTime.now() + ": " + message);
            writer.newLine();
        } catch (java.io.IOException e) {
            System.err.println("Failed to write to debug log: " + e.getMessage());
        }
    }
}
