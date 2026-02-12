package com.ascendra.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    private int matchScore;
    private List<String> skillGaps;
    private List<String> companyFitIssues;
    private List<String> recommendations;
    private String overallFeedback;
}
