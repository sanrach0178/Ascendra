package com.ascendra.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class AnalysisRequest {
    @NotBlank
    private String jobRole;
    
    private List<String> companiesApplied;
}
