package com.ascendra.backend.service;

import com.ascendra.backend.payload.response.AnalysisResponse;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class ResumeAnalysisService {

    public String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    @Autowired
    private GeminiService geminiService;

    public AnalysisResponse analyzeApplication(String resumeText, String jobRole, List<String> companies) {
        return geminiService.analyzeResume(resumeText, jobRole, companies);
    }
}
