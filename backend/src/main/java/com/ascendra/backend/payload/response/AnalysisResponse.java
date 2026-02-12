package com.ascendra.backend.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnalysisResponse {
    @JsonProperty("matchScore")
    private int matchScore;
    
    @JsonProperty("skillGaps")
    private List<String> skillGaps;
    
    @JsonProperty("companyFitIssues")
    private List<String> companyFitIssues;
    
    @JsonProperty("recommendations")
    private List<String> recommendations;
    
    @JsonProperty("overallFeedback")
    private String overallFeedback;
}
