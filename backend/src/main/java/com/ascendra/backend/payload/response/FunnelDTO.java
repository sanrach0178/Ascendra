package com.ascendra.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FunnelDTO {
    private long applied;
    private long onlineAssessment;
    private long technicalInterview;
    private long hrInterview;
    private long offer;
    
    // Conversion rates (percentages)
    private double appliedToOaRate;
    private double oaToTechnicalRate;
    private double technicalToHrRate;
    private double hrToOfferRate;
}
