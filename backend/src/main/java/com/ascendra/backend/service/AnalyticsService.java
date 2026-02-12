package com.ascendra.backend.service;

import com.ascendra.backend.model.ApplicationStage;
import com.ascendra.backend.model.JobApplication;
import com.ascendra.backend.model.User;
import com.ascendra.backend.payload.response.FunnelDTO;
import com.ascendra.backend.payload.response.ResumePerformanceDTO;
import com.ascendra.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    @Autowired
    JobApplicationRepository jobApplicationRepository;

    public FunnelDTO getFunnelStats(User user) {
        List<JobApplication> applications = jobApplicationRepository.findByUser(user);
        
        long applied = applications.size();
        
        long oa = applications.stream().filter(a -> 
            a.getCurrentStage() == ApplicationStage.ONLINE_ASSESSMENT || 
            a.getCurrentStage() == ApplicationStage.TECHNICAL_INTERVIEW || 
            a.getCurrentStage() == ApplicationStage.HR_INTERVIEW || 
            a.getCurrentStage() == ApplicationStage.OFFER
        ).count();
        
        long tech = applications.stream().filter(a -> 
            a.getCurrentStage() == ApplicationStage.TECHNICAL_INTERVIEW || 
            a.getCurrentStage() == ApplicationStage.HR_INTERVIEW || 
            a.getCurrentStage() == ApplicationStage.OFFER
        ).count();
        
        long hr = applications.stream().filter(a -> 
            a.getCurrentStage() == ApplicationStage.HR_INTERVIEW || 
            a.getCurrentStage() == ApplicationStage.OFFER
        ).count();
        
        long offer = applications.stream().filter(a -> 
            a.getCurrentStage() == ApplicationStage.OFFER
        ).count();
        
        FunnelDTO dto = new FunnelDTO();
        dto.setApplied(applied);
        dto.setOnlineAssessment(oa);
        dto.setTechnicalInterview(tech);
        dto.setHrInterview(hr);
        dto.setOffer(offer);
        
        dto.setAppliedToOaRate(applied > 0 ? (double) oa / applied * 100 : 0);
        dto.setOaToTechnicalRate(oa > 0 ? (double) tech / oa * 100 : 0);
        dto.setTechnicalToHrRate(tech > 0 ? (double) hr / tech * 100 : 0);
        dto.setHrToOfferRate(hr > 0 ? (double) offer / hr * 100 : 0);
        
        return dto;
    }

    public List<ResumePerformanceDTO> getResumeStats(User user) {
        List<JobApplication> applications = jobApplicationRepository.findByUser(user);
        
        Map<String, List<JobApplication>> grouped = applications.stream()
                .collect(Collectors.groupingBy(JobApplication::getResumeVersion));
        
        List<ResumePerformanceDTO> statsList = new ArrayList<>();
        
        grouped.forEach((version, apps) -> {
            long total = apps.size();
            long interviews = apps.stream().filter(a -> 
                a.getCurrentStage() == ApplicationStage.TECHNICAL_INTERVIEW || 
                a.getCurrentStage() == ApplicationStage.HR_INTERVIEW || 
                a.getCurrentStage() == ApplicationStage.OFFER // Assuming getting to Tech is "getting an interview"
            ).count();
            // Note: OA is often automated, so maybe not counted as "Interview" unless specified. 
            // The prompt says "shortlist/interview rate". Let's count OA as partial shortlist? 
            // Let's stick to Tech+ as "Interview".
            
            long offers = apps.stream().filter(a -> a.getCurrentStage() == ApplicationStage.OFFER).count();
            
            double interviewRate = total > 0 ? (double) interviews / total * 100 : 0;
            double offerRate = total > 0 ? (double) offers / total * 100 : 0;
            
            statsList.add(new ResumePerformanceDTO(version, total, interviews, offers, interviewRate, offerRate));
        });
        
        return statsList;
    }
}
