package com.ascendra.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumePerformanceDTO {
    private String version;
    private long totalApplications;
    private long interviews; // OA + Technical + HR
    private long offers;
    
    private double interviewRate;
    private double offerRate;
}
